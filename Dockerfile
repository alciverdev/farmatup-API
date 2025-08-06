FROM node:20-alpine as base
WORKDIR /app

# Instalar dependencias del sistema necesarias para Prisma
RUN apk add --no-cache openssl libc6-compat

# Etapa de dependencias
FROM base as deps
COPY package.json ./
RUN npm install --only=production

# Etapa de construcción
FROM base as builder
COPY package.json ./
RUN npm install
COPY . .

# Generar cliente de Prisma
RUN npx prisma generate

# Construir la aplicación
RUN npm run build:node

# Etapa de producción
FROM base as production
ENV NODE_ENV=production

# Copiar dependencias de producción
COPY --from=deps /app/node_modules ./node_modules

# Copiar archivos necesarios
COPY package.json ./
COPY prisma ./prisma
COPY --from=builder /app/dist ./dist

# Generar cliente de Prisma en producción
RUN npx prisma generate

# Crear usuario no root para seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs appuser
USER appuser

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start:node"]
