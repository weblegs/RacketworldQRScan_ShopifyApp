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
CMD ["sh", "-c", "export PORT=${PORT:-8080} && echo '=== Starting on PORT: '$PORT && npx prisma db push 2>&1 && echo '=== DB ready, starting server ===' && ./node_modules/.bin/react-router-serve ./build/server/index.js 2>&1 || (echo '=== Server exited with code: '$?; exit 1)"]
