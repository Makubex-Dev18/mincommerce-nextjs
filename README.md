# Proyecto modulo 6 y 7: Min-Commerce Next.js

## Modulo 6

## Tecnologías Utilizadas

- **Next.js 15**:
- **TypeScript**:
- **Prisma**:
- **PostgreSQL (Neon)**:
- **Zod**:
- **shadcn/ui**:
- **Notyf**:
- **Zustand**:
- **Tailwind CSS**:
- **Vercel**:
-

## Funcionalidades y retos Implementadas

**Conexion (PostgreSQL en Neon), utilizando rutas API de Next.js para operaciones CRUD.**

**Ampliar el modelo Product incluyendo un campo stock y gestionar su actualización al momento de comprar.**

¨**#Implementar un nuevo modelo Order para registrar cada compra con sus productos, cantidades y fecha.**

**Construir una página de Checkout con formulario validado usando zod + react-hook-form, que cree una orden persistente.**

**Mostrar un Historial de Compras, recuperado desde la base de datos.**

## Modulo 7

**Implementar autenticación con NextAuth.js, incluyendo roles de usuario (admin y user) y protección de rutas.**

## Roles implementados y sus permisos

user y admin

## Rutas protegidas y su nivel de acceso

- /admin (solo para admin)
- /user (para user y admin)

## Instrucciones para probar como admin vs user

- Para probar como admin, iniciar sesión con las credenciales de admin.
- Para probar como user, iniciar sesión con cualquier otra cuenta registrada.

## Credenciales de demo (email admin configurado)

luisromanh@gmail.com
