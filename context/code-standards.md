# Code Standards

Implementation rules and conventions for the entire Zenix codebase.

The AI agent must follow these rules in every session without exception.

These standards exist to prevent architectural drift, inconsistent implementations, and AI-generated technical debt.

---

# Engineering Mindset

The AI agent operates as a senior software engineer.

### Think Before Implementing

- Read all relevant context files before writing code
- Understand the feature before implementation
- Never make assumptions about business logic
- Verify requirements against project-overview.md and architecture.md

### Architecture First

Before implementing any feature:

- Read architecture.md
- Read build-plan.md
- Read database-schema.md
- Read ui-rules.md
- Read ui-tokens.md
- Read ui-registry.md
- Read library-docs.md
- Read project-tracker.md

Never implement code without understanding the current architecture.

### Scope Is Sacred

- Build only what the current feature requires
- Never implement future features proactively
- Never add functionality that was not requested
- Avoid speculative abstractions

### Build Incrementally

- Complete one feature before moving to the next
- Every feature must be testable
- Every feature must be reviewable
- UI first, logic second

### Prefer Simplicity

- Clear code over clever code
- Readability over abstraction
- Explicit over implicit
- Junior developers should understand every implementation

### Fail Gracefully

- Every async operation must handle failures
- Never allow one failure to crash unrelated systems
- User-facing errors must remain human-readable

---

# TypeScript

### Strict Mode

TypeScript strict mode is enabled.

### Rules

- Never use `any`
- Use `unknown` and narrow safely
- Explicitly type function parameters
- Explicitly type return values
- Prefer `type` over `interface`
- Use `interface` only when extension is required
- Prefer `const`
- Use `let` only when reassignment is necessary

### Async Functions

Every async function must:

```typescript
try {
  // logic
} catch (error) {
  console.error("[context]", error);
}
```

Never allow unhandled promise rejections.

---

# Next.js Conventions

### Framework

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui

### Server Components

All components are Server Components by default.

Only use:

```typescript
"use client";
```

when required for:

- useState
- useReducer
- useEffect
- Browser APIs
- Event listeners
- Client-only libraries

### Data Fetching

Server Components may fetch initial data.

Client Components may consume data through:

- TanStack Query
- Zustand
- Props

Client Components must never communicate directly with Supabase.

All database access must flow through:

```text
data/
```

### Server Actions

Server Actions belong in:

```text
actions/
```

Never define them inline.

---

# Database Layer

All database access belongs inside:

```text
data/
```

Examples:

```text
data/profile.ts
data/consultation.ts
data/future-self.ts
data/roadmap.ts
data/goals.ts
```

Rules:

- No Supabase queries inside components
- No Supabase queries inside hooks
- No Supabase queries inside pages
- No Supabase queries inside AI modules
- Server Actions call data functions
- API Routes call data functions

Flow:

```text
Component
    ↓
Server Action
    ↓
data/profile.ts
    ↓
Supabase
```

---

# TanStack Query

Use React Query for:

- Server state
- Cached database reads
- Revalidation
- Loading states

Rules:

- Query keys must be centralized
- Mutations should invalidate affected queries
- React Query handles server state
- Zustand handles client state

---

# Zustand

Use Zustand only for:

- UI state
- Wizard state
- Temporary session state
- Modal state
- Sidebar state

Do not store:

- Database records
- AI outputs
- Persistent user data

Those belong in Supabase.

---

# File & Folder Naming

### Folders

```text
kebab-case
```

Examples:

```text
future-self
roadmap-builder
mentor-chat
lock-in
```

### Components

```text
PascalCase.tsx
```

Examples:

```text
FutureSelfCard.tsx
RoadmapTimeline.tsx
MentorChat.tsx
```

### Utilities

```text
camelCase.ts
```

Examples:

```text
gemini.ts
roadmapGenerator.ts
futureSelfAnalysis.ts
```

### API Routes

Always:

```text
route.ts
```

### Server Actions

Examples:

```text
consultation.ts
futureSelf.ts
roadmap.ts
```

### Rules

- One component per file
- No barrel exports outside ui folder
- Named exports only

---

# Component Structure

Order:

```typescript
"use client";

// External imports

// Internal imports

// Types

type Props = {};

// Component

export function ComponentName({}: Props) {
  return null;
}
```

Rules:

- No default exports
- Props type directly above component
- No inline styles
- Tailwind only

---

# API Route Handlers

Pattern:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("[api/example]", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
```

Rules:

- Every route uses try/catch
- Validate request body
- Log errors
- Return success wrapper

Always:

```typescript
{
  success: boolean;
  data?: T;
  error?: string;
}
```

---

# Server Actions

Pattern:

```typescript
"use server";

export async function actionName() {
  try {
    return {
      success: true,
    };
  } catch (error) {
    console.error("[actions/example]", error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}
```

Rules:

- Always use try/catch
- Never throw
- Always return success wrapper
- Revalidate affected routes after mutations

---

# AI Architecture Rules

All AI functionality must exist inside:

```text
ai/
```

Examples:

```text
ai/consultation
ai/identity
ai/vision
ai/future-self
ai/roadmap
ai/coaching
```

Rules:

- Components never call Gemini directly
- Pages never call Gemini directly
- Database layer never calls Gemini
- AI modules return structured outputs
- All AI outputs must be validated before persistence

---

# AI Services

### Core Principle

AI exists to guide transformation.

AI should never optimize for comfort.

AI should optimize for long-term outcomes.

### Future Self Generation

The AI must:

- Use user consultation data
- Generate realistic future selves
- Avoid fantasy outcomes
- Consider available time, resources, and constraints

### Roadmap Generation

Roadmaps must:

- Be achievable
- Be evidence-based
- Connect directly to Future Self goals
- Include milestones and checkpoints

### Mentor System

The Mentor represents the user's Future Self.

The Mentor:

- Challenges limiting behavior
- Identifies avoidance patterns
- Encourages accountability
- Explains trade-offs honestly

The Mentor should not simply agree with the user.

---

# Database Rules

Every table must include:

```typescript
id;
created_at;
updated_at;
```

User-owned tables must include:

```typescript
user_id;
```

### Query Rules

Always filter by:

```typescript
user_id;
```

Never query user-owned data without ownership checks.

---

# Authentication Rules

### Public Routes

```text
/
/auth/login
/auth/sign-up
/auth/forgot-password
/auth/update-password
```

### Protected Routes

```text
/protected
/protected/consultation
/protected/future-self
/protected/roadmap
/protected/goals
/protected/projects
/protected/lock-in
/protected/profile
```

### First Login

Create profile record.

Default values:

```typescript
{
  onboarding_completed: false,
  future_self_created: false,
  active_lock_in: false,
}
```

### Redirect Rules

If onboarding not complete:

```text
/protected/consultation
```

Otherwise:

```text
/protected
```

---

# Error Handling

Rules:

- Never use empty catch blocks
- Never expose raw errors to users
- Log errors with context prefix

Example:

```typescript
console.error("[future-self]", error);
```

User-facing messages:

```text
Something went wrong.
Please try again.
```

---

# Environment Variables

Never hardcode:

- API Keys
- Secrets
- URLs
- IDs

Everything must come from:

```text
.env.local
```

---

# Imports

Always use:

```typescript
@/
```

Example:

```typescript
import { Button } from "@/components/ui/button";
```

Never use deeply nested relative imports.

---

# Comments

Allowed:

- Why a decision exists
- Non-obvious architectural choices

Not allowed:

- Explaining obvious code
- TODO comments
- Commenting every line

Code should explain itself.

---

# Dependencies

Before adding a package ask:

1. Does Next.js already solve this?
2. Does React already solve this?
3. Does shadcn/ui already solve this?
4. Is there a native browser solution?

Approved dependencies must be documented in architecture.md before installation.

No package should be added without a clear justification.

---

# Context Files

The context directory is the project's source of truth.

Before implementing any feature the AI must review:

- project-overview.md
- architecture.md
- build-plan.md
- database-schema.md
- code-standards.md
- ui-rules.md
- ui-tokens.md
- ui-registry.md
- library-docs.md
- project-tracker.md

If code conflicts with context files:

```text
Context files win.
```

---

# Future Self Principle

The Future Self is the primary intelligence layer of Zenix.

Every feature must support one of:

- Identity Discovery
- Future Self Creation
- Roadmap Generation
- Execution
- Accountability
- Reflection

Features that do not support this flow should not be implemented.
