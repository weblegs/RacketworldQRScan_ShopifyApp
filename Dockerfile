FROM node:20-alpine
RUN apk add --no-cache openssl

EXPOSE 8080

WORKDIR /app

COPY package.json package-lock.json* ./

# Install ALL deps (including devDependencies) so vite is available for the build
RUN npm ci && npm cache clean --force

COPY . .

# Build the app
RUN npm run build

# Remove devDependencies after build to keep image lean
RUN npm prune --omit=dev

ENV NODE_ENV=production

CMD ["npm", "run", "docker-start"]
