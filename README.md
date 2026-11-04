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

1. Copy `.env.example` to `.env` and replace the example database password and JWT secrets.
2. Start local MongoDB and Redis:

   ```sh
   docker compose up -d
   ```

   MongoDB is exposed on `127.0.0.1:27018` by default to avoid conflicts with an existing
   local MongoDB service. Set `MONGO_PORT` in `.env` to use a different host port.

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

Set production-only values in the deployment environment; do not commit secrets. Set
`API_IMAGE`, `WEB_IMAGE`, database credentials, JWT secrets, and public URLs before running:

```sh
docker compose -f docker-compose.prod.yml up -d
```

The production Compose file binds application ports to localhost. Put a TLS-terminating reverse
proxy in front of the services for public access.