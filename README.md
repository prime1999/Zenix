# Zenix

AI-powered Personal Growth Operating System.

Zenix helps users bridge the gap between who they are today and who they want to become.

Unlike traditional productivity tools that focus on tasks, habits, and motivation, Zenix focuses on transformation.

Users begin with a guided consultation that helps the system understand:

- Who they are
- What they want
- Their strengths and weaknesses
- Their goals and ambitions
- Their constraints and responsibilities

Using this information, Zenix creates:

- Identity Blueprint
- Vision Blueprint
- Future Self Profile
- Personalized Roadmap
- Execution System

The platform then acts as an AI Chief of Staff that helps users stay aligned with their future through accountability, guidance, reviews, and focused execution.

---

# Core Philosophy

## Future Self First

Everything in Zenix revolves around the user's Future Self.

Every roadmap, recommendation, and coaching interaction exists to help the user become the future version of themselves they committed to building.

---

## Reality Before Planning

Plans should be grounded in reality.

Recommendations must consider:

- Time
- Skills
- Resources
- Responsibilities
- Constraints
- Opportunities

---

## Growth Over Comfort

The AI prioritizes:

- Truth
- Growth
- Accountability
- Long-term outcomes

The AI is not designed to simply agree with the user.

---

## Execution Over Motivation

Motivation is temporary.

Execution creates results.

Zenix focuses on:

- Milestones
- Goals
- Projects
- Reviews
- Accountability
- Consistent action

---

# Core User Journey

```text
Consultation
        ↓
Identity Blueprint
        ↓
Vision Blueprint
        ↓
Future Self Profile
        ↓
Roadmap Generation
        ↓
Execution
        ↓
Lock-In
        ↓
Continuous Growth
```

---

# Features

## Consultation System

Guided onboarding experience that gathers context about:

- Identity
- Goals
- Motivations
- Skills
- Resources
- Constraints

Output:

```text
Identity Blueprint
```

---

## Vision Builder

Helps users define:

- 1-Year Vision
- 3-Year Vision
- 5-Year Vision
- Long-Term Vision

Output:

```text
Vision Blueprint
```

---

## Future Self Engine

Generates:

- Future Identity
- Future Narrative
- Future Communication Style
- Future Advice Framework

Output:

```text
Future Self Profile
```

---

## Roadmap Engine

Creates personalized:

- Milestones
- Goals
- Projects
- Habits
- Skill Paths

Output:

```text
Execution Roadmap
```

---

## Coaching System

The AI acts as:

- Future Self
- Mentor
- Strategist
- Accountability Partner

Responsibilities:

- Guidance
- Reviews
- Accountability
- Decision Support
- Progress Analysis

---

## Lock-In System

Focused execution periods designed to maximize progress.

Supported durations:

- 30 Days
- 60 Days
- 90 Days

Lock-In helps users:

- Reduce distractions
- Increase focus
- Build momentum
- Execute consistently

---

# Tech Stack

| Layer            | Technology               |
| ---------------- | ------------------------ |
| Framework        | Next.js 16               |
| Language         | TypeScript               |
| Database         | Supabase PostgreSQL      |
| Authentication   | Supabase Auth            |
| Storage          | Supabase Storage         |
| Realtime         | Supabase Realtime        |
| AI               | Gemini                   |
| State Management | TanStack Query + Zustand |
| Validation       | Zod                      |
| Styling          | Tailwind CSS v4          |
| UI Components    | shadcn/ui                |
| Analytics        | Google Analytics         |

---

# Project Structure

```text
/
├── AGENTS.md
│
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── code-standards.md
│   ├── database-schema.md
│   ├── library-docs.md
│   ├── ui-rules.md
│   ├── ui-tokens.md
│   ├── ui-registry.md
│   ├── project-tracker.md
│   └── build-plan.md
│
├── app/
├── actions/
├── ai/
├── components/
├── data/
├── hooks/
├── lib/
├── types/
└── middleware.ts
```

---

# Development Principles

- Components are UI only
- Database access lives in `data/`
- Mutations live in `actions/`
- AI logic lives in `ai/`
- Shared hooks live in `hooks/`
- Pages contain no business logic
- Server Components by default
- TypeScript strict mode
- Design system driven development

---

# Documentation

Project documentation lives inside:

```text
context/
```

These files are the source of truth for the project.

Before implementing any feature, review:

```text
project-overview.md
architecture.md
code-standards.md
library-docs.md
ui-rules.md
ui-tokens.md
ui-registry.md
project-tracker.md
database-schema.md
```

---

# MVP Scope

Included:

- Authentication
- User Profile
- Consultation System
- Identity Blueprint
- Vision Builder
- Future Self Generation
- Roadmap Generation
- Goals
- Projects
- Coaching System
- Lock-In
- Dashboard
- Progress Tracking

Excluded:

- Mobile Apps
- Community Features
- Team Collaboration
- Marketplace
- Payments
- Subscription Management

---

# Target Users

Zenix is designed for:

- Students
- Developers
- Founders
- Professionals
- Career Switchers
- Self-Learners

People who are serious about long-term growth and transformation.

---

# Guiding Question

Every feature should answer:

> Does this help the user become the future version of themselves they committed to building?

If the answer is no, it does not belong in Zenix.
