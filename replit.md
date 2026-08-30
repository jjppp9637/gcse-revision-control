# Revision Control

Revision Control is a personal GCSE revision planner that prioritizes review sessions, tracks confidence, and organizes the student's curriculum.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env for the assistant: `ANTHROPIC_API_KEY` — configured through workspace secrets

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/revision-control/src/pages/` — Today, Browse All, This Week, and not-found screens
- `artifacts/revision-control/src/components/` — shared shell and revision UI
- `artifacts/revision-control/src/lib/revision.ts` — client-side queue, date, and review scheduling helpers
- `artifacts/api-server/src/routes/revision.ts` — persisted curriculum state API
- `artifacts/api-server/src/routes/assistant.ts` — Anthropic-powered revision assistant API
- `lib/db/src/schema/revision-state.ts` — Postgres singleton state table
- `lib/api-spec/openapi.yaml` — source of truth for generated API hooks and schemas
- `artifacts/revision-control/src/index.css` — visual theme and responsive styling

## Architecture decisions

- The full curriculum is stored as one JSONB singleton so users can freely edit subjects, groups, and subtopics without a migration for each curriculum change.
- The client owns optimistic editing state and debounced persistence through the generated API hooks.
- The Today queue follows spaced repetition: never-revised learnt topics first, then overdue topics ordered by days overdue.
- Calendar dates are treated as local calendar days and are displayed dynamically rather than hard-coded.

## Product

- Today's Plan presents three prioritized topics with confidence ratings and completion feedback.
- Browse All supports expanding the curriculum map and adding, renaming, and deleting subjects, groups, and subtopics.
- This Week distributes the current queue across five upcoming weekdays and supports print-friendly output.
- The revision assistant receives the current plan as context and answers GCSE revision questions.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
