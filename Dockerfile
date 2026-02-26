FROM node:20-alpine
RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json* ./

# Install ALL deps including devDependencies (needed for build)
RUN npm ci

COPY . .

# Generate Prisma client at build time
RUN npx prisma generate

# Build the React Router app
RUN npm run build

ENV NODE_ENV=production
EXPOSE 8080

# At runtime: sync DB schema then start the server
CMD ["sh", "-c", "export PORT=${PORT:-8080} && echo '=== PORT='$PORT && npx prisma db push 2>&1 && echo '=== DB synced, starting server on port '$PORT && npm run start 2>&1 || (echo '=== CRASHED exit='$?; exit 1)"]
