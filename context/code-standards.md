# Code Standards

Implementation rules and conventions for the entire Zent codebase.

The AI agent must follow these rules in every session without exception.

These standards exist to prevent architectural drift, inconsistent implementations, and AI-generated technical debt.

---

# Engineering Mindset

The AI agent operates as a senior software engineer.

### Think Before Implementing

* Read all relevant context files before writing code
* Understand the feature before implementation
* Never make assumptions about business logic
* Verify requirements against project-overview.md and architecture.md

### Scope Is Sacred

* Build only what the current feature requires
* Never implement future features proactively
* Never add functionality that was not requested
* Avoid speculative abstractions

### Build Incrementally

* Complete one feature before moving to the next
* Every feature must be testable
* Every feature must be reviewable
* UI first, logic second

### Prefer Simplicity

* Clear code over clever code
* Readability over abstraction
* Explicit over implicit
* Junior developers should understand every implementation

### Fail Gracefully

* Every async operation must handle failures
* Never allow one failure to crash unrelated systems
* User-facing errors must remain human-readable

---

# TypeScript

### Strict Mode

TypeScript strict mode is enabled.

### Rules

* Never use `any`
* Use `unknown` and narrow safely
* Explicitly type function parameters
* Explicitly type return values
* Prefer `type` over `interface`
* Use `interface` only when extension is required
* Prefer `const`
* Use `let` only when reassignment is necessary

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

* Next.js App Router
* React 19
* TypeScript
* Tailwind CSS
* shadcn/ui

### Server Components

All components are Server Components by default.

Only use:

```typescript
"use client";
```

when required for:

* useState
* useReducer
* useEffect
* Browser APIs
* Event listeners
* Client-only libraries

### Data Fetching

* Fetch data in Server Components
* Never fetch directly inside Client Components
* Route Handlers should remain thin
* Business logic belongs outside route handlers

### Server Actions

Server Actions belong in:

```text
actions/
```

Never define them inline.

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

* One component per file
* No barrel exports outside ui folder
* Named exports only

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

* No default exports
* Props type directly above component
* No inline styles
* Tailwind only

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

* Every route uses try/catch
* Validate request body
* Log errors
* Return success wrapper

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

* Always use try/catch
* Never throw
* Always return success wrapper
* Revalidate affected routes after mutations

---

# AI Services

### Core Principle

AI exists to guide transformation.

AI should never optimize for comfort.

AI should optimize for long-term outcomes.

### Future Self Generation

The AI must:

* Use user consultation data
* Generate realistic future selves
* Avoid fantasy outcomes
* Consider available time, resources, and constraints

### Roadmap Generation

Roadmaps must:

* Be achievable
* Be evidence-based
* Connect directly to Future Self goals
* Include milestones and checkpoints

### Mentor System

The Mentor represents the user's future self.

The Mentor:

* Challenges limiting behavior
* Identifies avoidance patterns
* Encourages accountability
* Explains trade-offs honestly

The Mentor should not simply agree with the user.

---

# Database Rules

Every table must include:

```typescript
id
created_at
updated_at
```

User-owned tables must include:

```typescript
user_id
```

### Query Rules

Always filter by:

```typescript
user_id
```

Never query user-owned data without ownership checks.

---

# Authentication Rules

### Protected Routes

All application routes require authentication except:

```text
/
/login
```

### First Login

On first login:

Create profile record.

Default values:

```typescript
{
  onboarding_completed: false,
  future_self_created: false,
}
```

### Redirect Rules

If onboarding not complete:

```text
/consultation
```

Otherwise:

```text
/dashboard
```

---

# Error Handling

Rules:

* Never use empty catch blocks
* Never expose raw errors to users
* Log errors with context prefix

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

* API Keys
* Secrets
* URLs
* IDs

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

* Why a decision exists
* Non-obvious architectural choices

Not allowed:

* Explaining obvious code
* TODO comments
* Commenting every line

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
