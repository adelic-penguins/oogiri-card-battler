# syntax=docker.io/docker/dockerfile:1

FROM node:24-alpine AS base

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=staging
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN npm init -y
RUN npm install json-server
RUN echo '{"client_ids":[]}' > db.json
RUN mkdir public
#COPY ./db.json .
USER nextjs

EXPOSE 3020

ENV PORT=3020

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["npx", "json-server", "db.json", "--port", "3020"]