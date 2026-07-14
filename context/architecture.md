# Architecture

## Stack

| Layer            | Tool                     | Purpose                                                              |
| ---------------- | ------------------------ | -------------------------------------------------------------------- |
| Framework        | Next.js 16 (App Router)  | Full-stack application                                               |
| Database         | Supabase PostgreSQL      | Primary database                                                     |
| Authentication   | Supabase Auth            | Email & Password + Google OAuth                                      |
| Storage          | Supabase Storage         | User assets and generated files                                      |
| Realtime         | Supabase Realtime        | Live updates                                                         |
| AI Model         | Gemini                   | Consultation, Future Self generation, coaching, and roadmap creation |
| Analytics        | Google Analytics         | Traffic and product usage analytics                                  |
| Styling          | Tailwind CSS + shadcn/ui | UI system                                                            |
| Language         | TypeScript (Strict)      | Entire codebase                                                      |
| Validation       | Zod                      | Runtime validation                                                   |
| State Management | TanStack Query + Zustand | Server and client state                                              |

---

# System Architecture

```text
User
  ↓
Middleware
  ↓
Auth Check
  ↓
Next.js App
  ↓
Supabase Auth
  ↓
Consultation Engine
  ↓
Identity Engine
  ↓
Vision Builder
  ↓
Future Self Engine
  ↓
Roadmap Engine
  ↓
Lock-In System
  ↓
Dashboard
```

---

# Folder Structure

```text
/
├── AGENTS.md
│
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── build-plan.md
│   ├── database-schema.md
│   ├── code-standards.md
│   ├── ui-rules.md
│   ├── ui-tokens.md
│   ├── ui-registry.md
│   └── project-tracker.md
│
├── app/
│   ├── auth/
│   │   ├── confirm/
│   │   ├── error/
│   │   ├── forgot-password/
│   │   ├── login/
│   │   ├── sign-up/
│   │   ├── sign-up-success/
│   │   └── update-password/
│   │
│   ├── protected/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │
│   │   ├── consultation/
│   │   │   └── page.tsx
│   │
│   │   ├── future-self/
│   │   │   └── page.tsx
│   │
│   │   ├── roadmap/
│   │   │   └── page.tsx
│   │
│   │   ├── goals/
│   │   │   └── page.tsx
│   │
│   │   ├── projects/
│   │   │   └── page.tsx
│   │
│   │   ├── lock-in/
│   │   │   └── page.tsx
│   │
│   │   └── profile/
│   │       └── page.tsx
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── ai/
│   ├── consultation/
│   ├── identity/
│   ├── vision/
│   ├── future-self/
│   ├── roadmap/
│   └── coaching/
│
├── actions/
│   ├── consultation.ts
│   ├── profile.ts
│   ├── roadmap.ts
│   └── goals.ts
│
├── data/
│   ├── profile.ts
│   ├── consultation.ts
│   ├── future-self.ts
│   ├── roadmap.ts
│   └── goals.ts
│
├── hooks/
│   ├── useProfile.ts
│   ├── useConsultation.ts
│   ├── useRoadmap.ts
│   └── useGoals.ts
│
├── components/
│   ├── ui/
│   ├── auth/
│   ├── consultation/
│   ├── dashboard/
│   ├── future-self/
│   ├── roadmap/
│   ├── goals/
│   ├── projects/
│   └── lock-in/
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   │
│   ├── gemini.ts
│   └── utils.ts
│
├── types/
│
└── middleware.ts
```

---

# System Boundaries

| Folder        | Owns                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `app/`        | Pages, layouts, and API routes only. No business logic.                                                      |
| `components/` | UI only. May consume data through React Query, Zustand, or props. Never communicates directly with Supabase. |
| `actions/`    | Server Actions and user-triggered mutations.                                                                 |
| `data/`       | Database access layer. Queries, inserts, updates, and deletes only.                                          |
| `ai/`         | AI workflows, prompt orchestration, and generation logic.                                                    |
| `hooks/`      | React Query hooks and client-side state integration.                                                         |
| `lib/`        | External services, SDK initialization, and shared utilities.                                                 |
| `types/`      | Shared TypeScript types across the application.                                                              |
| `context/`    | Project documentation and source of truth.                                                                   |

---

# Data Flow

## Authentication Flow

```text
User signs up or logs in
        ↓
Supabase Auth
        ↓
Create Profile Record
        ↓
Check onboarding_completed

false
        ↓
Consultation

true
        ↓
Dashboard
```

---

## Consultation Flow

```text
User starts consultation
        ↓
Server Action / API Route
        ↓
Consultation Engine
        ↓
Gemini
        ↓
Response Generated
        ↓
Store Response
        ↓
Next Question
```

---

## Future Self Generation Flow

```text
Consultation Complete
        ↓
Identity Engine
        ↓
Vision Builder
        ↓
Future Self Engine
        ↓
Future Self Profile
        ↓
Database
```

---

## Roadmap Generation Flow

```text
Future Self Created
        ↓
Roadmap Engine
        ↓
Milestones
        ↓
Goals
        ↓
Projects
        ↓
Database
```

---

## Lock-In Flow

```text
User starts Lock-In
        ↓
Roadmap Milestones
        ↓
Sprint Creation
        ↓
Progress Tracking
        ↓
Future Self Reviews
        ↓
Dashboard Updates
```

---

# AI Architecture

## Consultation Engine

Responsible for:

- User interview
- Dynamic questioning
- Context gathering
- Information collection

Output:

```text
Raw Consultation Data
```

---

## Identity Engine

Responsible for extracting:

- Values
- Interests
- Strengths
- Weaknesses
- Skills
- Motivations
- Life Priorities

Output:

```text
Identity Blueprint
```

---

## Vision Builder

Responsible for creating:

- 1-Year Vision
- 3-Year Vision
- 5-Year Vision
- Life Vision

Output:

```text
Vision Blueprint
```

---

## Future Self Engine

Responsible for generating:

- Future Self Persona
- Future Self Narrative
- Future Self Communication Style
- Future Self Advice Framework

Output:

```text
Future Self Profile
```

---

## Roadmap Engine

Responsible for creating:

- Milestones
- Goals
- Projects
- Habits
- Skill Development Paths

Output:

```text
Execution Roadmap
```

---

## Coach Engine

Responsible for:

- Guidance
- Accountability
- Decision support
- Progress reviews

Output:

```text
Coaching Responses
```

---

# Authentication

Provider:

```text
Supabase Auth
```

Methods:

```text
Email & Password
Google OAuth
```

Public Routes:

```text
/
/auth/login
/auth/sign-up
/auth/forgot-password
/auth/update-password
```

Protected Routes:

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

---

# Storage

Provider:

```text
Supabase Storage
```

Purpose:

```text
User avatars
Generated reports
Future exports
Application assets
```

---

# Project Documentation

The `context/` directory is the source of truth for the project.

```text
context/
├── project-overview.md
├── architecture.md
├── build-plan.md
├── database-schema.md
├── code-standards.md
├── ui-rules.md
├── ui-tokens.md
├── ui-registry.md
├── library-docs.md
└── project-tracker.md
```

All major architecture, product, database, and implementation decisions must be reflected in the appropriate context file.

---

# Invariants

- Components may consume data through Props, React Query, Zustand, or Context.
- Components must never communicate directly with Supabase.
- All database writes happen through Server Actions or API Routes.
- All database access must go through the `data/` layer.
- AI logic exists only inside `/ai`.
- Pages contain no business logic.
- Every query must be scoped to the authenticated user.
- Future Self generation cannot occur until Consultation is completed.
- Roadmaps cannot be generated until a Future Self exists.
- Lock-In cycles must be linked to roadmap milestones.
- Gemini outputs must be validated before persistence.
- Protected routes must always verify authentication.
- All AI outputs must be stored in structured formats before persistence.
- No feature should bypass the Consultation → Identity → Vision → Future Self flow.
- The Future Self remains the primary source of guidance throughout the application.
