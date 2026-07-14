# Library Docs

Project-specific usage patterns for every third-party library used in Zenix.

This file defines how libraries are used within this project, not how they work generally.

Before implementing any feature:

1. Read `project-overview.md`
2. Read `architecture.md`
3. Read `code-standards.md`
4. Read `library-docs.md`
5. Consult official documentation when necessary

Authority Order:

```text
project-overview.md
↓
architecture.md
↓
code-standards.md
↓
library-docs.md
↓
Official Documentation
```

Never rely solely on training knowledge for library APIs.

---

# Gemini

Gemini powers the core Zenix experience.

Used for:

- Consultation Analysis
- Identity Extraction
- Vision Building
- Future Self Generation
- Roadmap Creation
- Coaching
- Lock-In Reviews
- Progress Analysis
- Opportunity Analysis
- Future Self Conversations

---

## Initialization

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

export const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
```

---

## Structured Outputs

Whenever AI-generated data is persisted, responses must be converted into structured objects.

Examples:

- Consultation Analysis
- Identity Blueprints
- Vision Blueprints
- Future Self Profiles
- Roadmaps
- Coaching Reports
- Progress Reviews

Never store raw AI text when structured data is expected.

---

## Consultation Analysis

Inputs:

- Current situation
- Goals
- Skills
- Constraints
- Resources
- Available time
- Previous attempts

Output:

```typescript
type ConsultationAnalysis = {
  currentState: string;
  desiredOutcome: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  obstacles: string[];
  risks: string[];
  recommendedDirection: string;
};
```

---

## Identity Extraction

Output:

```typescript
type IdentityBlueprint = {
  values: string[];
  interests: string[];
  strengths: string[];
  weaknesses: string[];
  skills: string[];
  motivations: string[];
  priorities: string[];
};
```

---

## Vision Builder

Output:

```typescript
type VisionBlueprint = {
  oneYearVision: string;
  threeYearVision: string;
  fiveYearVision: string;
  lifeVision: string;
};
```

---

## Future Self Generation

Future selves must always be:

- Realistic
- Evidence-based
- Achievable
- Grounded in consultation data

Output:

```typescript
type FutureSelf = {
  identity: string;
  achievements: string[];
  skills: string[];
  mindset: string[];
  lifestyle: string[];
  financialPosition: string;
  timeline: string;
};
```

---

## Roadmap Generation

Roadmaps are generated using:

- Consultation Analysis
- Identity Blueprint
- Vision Blueprint
- Future Self Profile
- User Constraints

Output:

```typescript
type Roadmap = {
  title: string;
  phases: Phase[];
};

type Phase = {
  name: string;
  goal: string;
  milestones: string[];
  actions: string[];
};
```

Roadmaps are living systems and may evolve based on progress and changing circumstances.

---

## Coaching

The Coach represents the user's Future Self.

The Coach should:

- Challenge excuses
- Identify avoidance patterns
- Encourage accountability
- Explain trade-offs honestly
- Focus on execution

The Coach should not simply agree with the user.

---

## Opportunity Analysis

The AI evaluates:

- Market demand
- Career opportunities
- Financial potential
- Real-world usefulness
- Long-term sustainability

Outputs should explain:

- Why the path is valuable
- Income opportunities
- Career opportunities
- Risks and trade-offs

---

## Financial Awareness

Whenever a future path is recommended, the AI should evaluate:

- Financial viability
- Career potential
- Market demand
- Monetization opportunities
- Economic risks

The goal is meaningful achievement combined with real-world value.

---

# Supabase

Supabase is the primary backend platform.

Used for:

- Authentication
- PostgreSQL Database
- Storage
- Realtime Features

---

## Authentication

Supported Providers:

- Email & Password
- Google OAuth

Authentication state should always be managed through the project's Supabase helpers.

---

## Database

All database access must occur through:

```text
data/
```

Never query Supabase directly inside:

```text
components/
```

Never bypass user ownership checks.

Every user-owned query must be scoped to:

```typescript
user_id;
```

---

## Storage

Used for:

- User avatars
- Future exports
- Generated reports
- User-uploaded assets

Storage access should be handled through Server Actions or API Routes.

---

## Realtime

Used only when a feature genuinely requires live updates.

Examples:

- Lock-In progress updates
- Coaching sessions
- Future collaborative features

Avoid adding Realtime complexity unnecessarily.

---

# Zod

All external and AI-generated data must be validated.

Use Zod for:

- Form validation
- API validation
- AI output validation
- Environment validation

Never trust AI responses without validation.

---

# TanStack Query

Used for:

- Server state
- Data caching
- Data synchronization
- Optimistic updates

Rules:

- Query keys must be centralized
- Avoid duplicate queries
- Use React Query for server state only

Do not use React Query for UI state.

---

# Zustand

Used for:

- Client-side state
- UI preferences
- Temporary workflow state
- Multi-step flow state

Rules:

- Keep stores small
- Separate stores by domain
- Do not duplicate server state already managed by React Query

---

# React Hook Form

Used for:

- Consultation Forms
- Profile Forms
- Goal Forms
- Roadmap Configuration
- Lock-In Setup

Preferred over manual form state.

Combine with:

```typescript
zodResolver();
```

for validation.

---

# shadcn/ui

Primary UI system.

Before introducing a UI dependency:

1. Check shadcn/ui first
2. Prefer composition over custom implementations
3. Use project design tokens from `ui-tokens.md`

No additional UI libraries should be introduced without justification.

---

# Tailwind CSS

Primary styling solution.

Rules:

- Use design tokens from `ui-tokens.md`
- Avoid arbitrary values where possible
- Prefer reusable component patterns
- Keep utility usage readable

---

# Lucide React

Primary icon library.

Rules:

- Use Lucide icons consistently across the application
- Avoid mixing multiple icon systems

---

# Recharts

Used for:

- Progress Analytics
- Goal Tracking
- Lock-In Statistics
- Roadmap Completion
- Milestone Tracking

No additional charting library should be introduced without updating this document.

---

# Google Analytics

Used only for product analytics.

Purpose:

- User acquisition
- User engagement
- Feature adoption
- Retention analysis
- Onboarding completion
- Roadmap completion
- Lock-In completion

Not used for AI memory or user personalization.

---

## Event Rules

All analytics events must be documented before implementation.

Events should have:

```typescript
{
  event: string;
  properties?: Record<string, unknown>;
}
```

Avoid creating undocumented analytics events.

---

# Future Libraries

Do not add a library here until it is actually adopted.

When introducing a new library:

1. Install it
2. Document it in `architecture.md`
3. Document usage patterns here
4. Update implementation rules if required

Only then is it considered part of Zenix.

---

# Current Approved Libraries

- Gemini
- Supabase
- Zod
- TanStack Query
- Zustand
- React Hook Form
- shadcn/ui
- Tailwind CSS
- Lucide React
- Recharts
- Google Analytics
