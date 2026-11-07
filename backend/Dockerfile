FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN DATABASE_URL=postgresql://build:build@localhost:5432/build npm ci
COPY tsconfig.json vitest.config.ts ./
COPY src ./src
COPY tests ./tests
RUN DATABASE_URL=postgresql://build:build@localhost:5432/build npm run build

FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN DATABASE_URL=postgresql://build:build@localhost:5432/build npm ci --omit=dev
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/dist ./dist
EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:4000/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["node", "dist/src/server.js"]