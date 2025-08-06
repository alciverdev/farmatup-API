FROM node:20-alpine
WORKDIR /app

# Instalar dependencias del sistema necesarias para Prisma
RUN apk add --no-cache openssl libc6-compat

# Copiar archivos de configuración
COPY package.json ./

# Instalar dependencias (sin ejecutar postinstall)
RUN npm install --ignore-scripts

# Copiar código fuente
COPY . .

# Generar cliente de Prisma
RUN npx prisma generate

# Construir la aplicación
RUN npm run build:node

# Crear usuario no root para seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs appuser

USER appuser

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start:node"]
