<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`.
Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# Project Rules

## Stack

* Next.js 16.2.9 App Router
* React 19
* TypeScript strict mode
* Tailwind CSS v4

## Code Style

* Prefer Server Components by default.
* Use Client Components only when browser APIs or interactivity are required.
* Use Server Actions instead of API routes when possible.
* Avoid `any`.
* Prefer Zod for validation.
* Prefer shadcn/ui for component styling.
* Prefer lucide-react for icons.

## Architecture

* Keep business logic outside React components.
* Reuse existing UI components before creating new ones.
* Follow existing folder structure.
* Do not introduce new dependencies without justification.

## Quality Checks

Before completing any task:

1. Run type checking.
2. Run linting.
3. Check for hydration issues.
4. Verify App Router conventions.

## Documentation

When modifying architecture:

* Update README.md.
* Update AGENTS.md if project conventions change.
