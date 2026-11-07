# SBS Portal

Monorepo for the SBS Portal web application and API.

## Repository layout

- `backend/` — Express API
- `frontend/` — Next.js website and administration UI
- `packages/` — shared TypeScript, lint, and configuration packages
- `docker/` — service configuration for local and production deployments
- `docs/` — architecture, API, database, deployment, and user documentation
- `scripts/` — local setup, seed, backup, restore, and deployment helpers

## Prerequisites

- Node.js 20 or later
- pnpm 9
- Docker with the Compose plugin

## Getting started

1. Copy `.env.example` to `.env` and `backend/.env.example` to `backend/.env`. Add your Neon
   PostgreSQL URL and replace the example JWT secrets in the backend environment.
2. Start Redis:

   ```sh
   docker compose up -d
   ```

3. Install workspace dependencies:

   ```sh
   pnpm install
   ```

4. Start the API and web app:

   ```sh
   pnpm dev
   ```

The API and frontend packages must define their own `dev`, `build`, `lint`, `test`, and
`typecheck` scripts as appropriate. These commands are added in the backend and frontend setup
stages.

## Useful commands

```sh
pnpm build
pnpm lint
pnpm test
pnpm typecheck
pnpm format
docker compose down
```

`docker compose down` preserves named database volumes. Use `docker compose down -v` only when
you intentionally want to delete local database data.

## Production

This production setup uses Docker Compose on a Linux server with Docker installed. Configure
`backend/.env` with the Neon `DATABASE_URL`, `CLIENT_URL` (the public website origin), and distinct
random `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` values of at least 32 characters. Keep that
file private and do not commit it.

Set the public URLs in the root `.env` before building. `NEXT_PUBLIC_API_URL` must be reachable
from users' browsers and include `/api/v1`; `NEXT_PUBLIC_SITE_URL` must be the public website URL.
These values are embedded into the frontend at image build time. The root `.env.example` has
localhost values for local development; replace them with your actual HTTPS URLs for production.

Create/update the Neon schema once from the backend directory, with `DATABASE_URL` configured in
`backend/.env`:

```sh
cd backend
npm run db:push
cd ..
```

Only run `db:push` against a new/empty database or after reviewing schema changes and backing up
existing data. Build and start the production stack from the repository root:

```sh
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml ps
```

The API health endpoint is `/health`. The Compose file binds web and API ports to localhost. Put
a TLS-terminating reverse proxy in front of the services, route the public API hostname to port
`4000` and the website hostname to port `3000`, and ensure `CLIENT_URL`,
`NEXT_PUBLIC_API_URL`, and `NEXT_PUBLIC_SITE_URL` match those domains. The optional `API_IMAGE`
and `WEB_IMAGE` values can override the default locally built image tags when pulling from a
container registry.
