# Use Node 24 Alpine for smaller image size
FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV BACKEND_BASE_URL_DOMAIN=BACKEND_BASE_URL_DOMAIN
ENV NEXT_PUBLIC_NODE_ENV=NEXT_PUBLIC_NODE_ENV
ENV NEXT_PUBLIC_APP_URL=NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_USE_MOCK_API=NEXT_PUBLIC_USE_MOCK_API

# ENV NODE_OPTIONS="--max-old-space-size=1024"
# Build Next.js application
# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

ENV NEXT_TELEMETRY_DISABLED=1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# USER nextjs
ENV HOSTNAME="0.0.0.0"
EXPOSE 3300
CMD ["node", "server.js"]
