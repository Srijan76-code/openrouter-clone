# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/primary-backend/package.json ./apps/primary-backend/
COPY packages/db/package.json ./packages/db/
COPY packages/types/package.json ./packages/types/
COPY packages/config/package.json ./packages/config/
COPY packages/utils/package.json ./packages/utils/
RUN npm ci --workspace=apps/primary-backend

# ---- Build ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/primary-backend/node_modules ./apps/primary-backend/node_modules
COPY . .
RUN npm run build --workspace=apps/primary-backend

# ---- Production ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/apps/primary-backend/dist ./dist
COPY --from=build /app/apps/primary-backend/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 4000
CMD ["node", "dist/app.js"]
