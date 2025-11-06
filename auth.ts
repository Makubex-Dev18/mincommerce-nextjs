import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { th } from "zod/locales";

async function logSessionAction(
  userId: string | undefined,
  action: 'login' | 'logout',
  provider?: string
): Promise<void> {
  // Validación estricta del userId
  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    console.error(`[SessionLog] Error: userId inválido para ${action}`, { userId })
    return
  }

  try {
    await prisma.sessionLog.create({
      data: {
        userId: userId,
        action: action,
        ...(provider && { provider }), // Solo incluir provider si existe
      }
    })
    console.log(`[SessionLog] ✓ ${action} registrado para userId: ${userId}${provider ? ` (${provider})` : ''}`)
  } catch (error) {
    // Log detallado del error sin interrumpir el flujo
    console.error(`[SessionLog] ✗ Error registrando ${action}:`, {
      userId,
      action,
      provider,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider
  ],
  events: {
    /**
     * Evento signOut: se ejecuta cuando el usuario cierra sesión
     * Con JWT strategy, el token contiene la información del usuario
     */
    async signOut(params) {
      // En JWT strategy, params contiene { token }
      // Necesitamos hacer type narrowing
      if (!('token' in params) || !params.token) {
        console.warn('[SessionLog] signOut event: token no disponible')
        return
      }

      const userId = params.token.sub

      if (!userId) {
        console.warn('[SessionLog] signOut event: token.sub no disponible')
        return
      }

      await logSessionAction(userId, 'logout')
    }
  },
  callbacks: {
    /**
     * Callback signIn: se ejecuta en cada intento de inicio de sesión
     * Registra tanto usuarios nuevos como existentes
     */
    async signIn({ user, account }) {
      // user.id está disponible tanto para usuarios nuevos como existentes
      const userId = user?.id
      const provider = account?.provider

      if (!userId) {
        console.error('[SessionLog] signIn callback: user.id no disponible', { user, account })
        // Permitir el login aunque falle el logging
        return true
      }
      await logSessionAction(userId, 'login', provider)
      return true
    },
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as string
      }
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        // Asignar role basado en el email
        token.role = user.email === "luisromanh@gmail.com" ? "admin" : "user"
      }
      return token
    },
  },
})

/*
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [GoogleProvider],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if(user?.id && user.id){
        await prisma.sessionLog.create({
          data: {
            userId: user.id,
            action: 'login',
            provider: account?.provider || 'unknown',
          }
        })
      }else{
        throw new Error('No hay user.id' );
      }

      } catch (error) {
        console.error('Error registrando login:', error)
      }
      return true
    },

    

    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.email === "luisromanh@gmail.com" ? "admin" : "user";
      }
      return token;
    },
  },
});
*/