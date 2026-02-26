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
ENV PORT=8080
EXPOSE 8080

# At runtime: sync DB schema then start the server
CMD ["sh", "-c", "npx prisma db push && npx react-router-serve ./build/server/index.js"]
