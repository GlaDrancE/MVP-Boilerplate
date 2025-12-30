# MVP Boiler Plate

Monorepo boilerplate with Express API and Next.js web app.

## Prerequisites

- Node.js >= 18
- pnpm (install: `npm install -g pnpm`)
- PostgreSQL database

## Quick Start

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Setup environment variables**
   
   Create `.env` in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   ACCESS_TOKEN_SECRET="your-secret-key-here"
   REFRESH_TOKEN_SECRET="your-refresh-secret-key-here"
   NODE_ENV="development"
   ```

3. **Setup database**
   ```bash
   cd packages/db
   pnpm prisma generate
   pnpm prisma migrate dev
   ```

4. **Run development servers**
   ```bash
   pnpm dev
   ```
   
   - API: http://localhost:8080
   - Web: http://localhost:3000

## Available Scripts

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Type check all packages

## Project Structure

```
├── apps/
│   ├── api/          # Express API server
│   └── web/          # Next.js web application
└── packages/
    ├── auth/         # Authentication utilities
    ├── db/           # Prisma database client
    ├── schema/       # Zod validation schemas
    ├── ui/           # Shared UI components
    └── common/       # Shared utilities
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **API**: Express.js
- **Web**: Next.js 16
- **Database**: PostgreSQL + Prisma
- **Auth**: JWT tokens
- **Validation**: Zod

