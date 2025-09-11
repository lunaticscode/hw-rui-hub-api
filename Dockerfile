FROM node:20-alpine as builder
WORKDIR /app
COPY package.json pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build && pnpm store prune

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist-ncc ./
COPY .env .env
EXPOSE 8085
CMD ["NODE_ENV=production", "node", "index.js"]