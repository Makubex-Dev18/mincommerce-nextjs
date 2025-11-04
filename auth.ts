import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session:{strategy:"jwt"},
  providers: [
    GoogleProvider
  ],
  callbacks: {
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.sub && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role=user.email==="luisromanh@gmail.com" ? "admin" : "user"
      }
      return token;
    },
  },
})



//este corre sin la actualizacion en bd
/*
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
         // Asignar role basado en el email
        token.role = user.email === "luisromanh@gmail.com" ? "admin" : "user"
      }
      return token;
    },
  },
});
*/