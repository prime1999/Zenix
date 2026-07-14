# Library Docs

Project-specific usage patterns for every third-party library used in Zent.

This file defines how libraries are used within this project, not how they work generally.

Before implementing any feature:

1. Check `AGENTS.md` for installed skills.
2. Check available MCP servers.
3. Read this file for Zent-specific rules.
4. Only then use general documentation.

Authority order:

```text
MCP Server
↓
AGENTS.md Skills
↓
library-docs.md
↓
General Documentation
```

Never rely solely on training knowledge for library APIs.

---

# AI Provider

The AI provider powers the core Zent experience.

Current provider:

* Gemini

Future providers may be added if they improve quality, cost, latency, or reliability.

The AI powers:

* Consultation Analysis
* Future Self Generation
* Roadmap Creation
* Lock-In Planning
* Weekly Reviews
* Progress Analysis
* Future Self Conversations
* Opportunity Analysis
* Reality Checks
* Roadmap Adjustments

---

## Initialization

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

export const gemini = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!,
);
```

---

## Structured Outputs

Whenever AI-generated data is stored in the database, the response must be structured.

Examples:

* Consultation results
* Future selves
* Roadmaps
* Reviews
* Progress analysis
* Opportunity reports

Never save raw AI text when structured data is expected.

---

## Consultation Analysis

The consultation is the foundation of the entire system.

Inputs:

* Current situation
* Desired future
* Existing skills
* Previous attempts
* Available resources
* Constraints
* Available time

Outputs:

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

This analysis becomes the user's baseline.

---

## Future Self Generation

The Future Self must always be:

* Realistic
* Evidence-based
* Achievable
* Grounded in the user's consultation

Future selves are not fantasy personas.

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

* Consultation Analysis
* Future Self
* User constraints
* Available time

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

Roadmaps are living systems and may evolve over time based on progress, failures, new opportunities, and changing circumstances.

---

## Zent Philosophy

Zent exists to help users become who they are capable of becoming.

The AI is not designed to maximize comfort.

The AI is designed to maximize growth.

The AI acts as:

* The user's future self
* A strategic mentor
* A reality checker
* An accountability partner

The AI should:

* Challenge excuses
* Question weak reasoning
* Reject unrealistic goals
* Push users toward meaningful action
* Encourage long-term thinking
* Focus on execution over motivation

The AI should never simply optimize for user happiness.

The AI should optimize for meaningful progress.

---

## Lock-In Mode

Lock-In is a focused execution phase.

Typical duration:

* 30 days
* 60 days
* 90 days

During Lock-In:

* The roadmap becomes more rigid
* Priorities are reduced
* Progress reviews become stricter
* The AI challenges distractions aggressively
* Users are encouraged to focus on one major objective

The goal of Lock-In is execution, not exploration.

Users should not start Lock-In until they commit to a clear objective.

---

## Opportunity Analysis

The AI evaluates every major goal for:

* Market demand
* Career opportunities
* Financial potential
* Real-world usefulness
* Long-term sustainability

The AI should explain:

* Why a path is valuable
* Where opportunities exist
* How skills translate into income
* Potential risks of the path

Achievement alone is not enough.

Users should understand how their chosen path connects to real-world outcomes.

---

## Financial Awareness

Whenever a user selects a future path, the AI must evaluate:

* Financial viability
* Career opportunities
* Real-world demand
* Monetization potential
* Economic risks

Example:

If a student wants to become a First Class graduate, the AI should also explain:

* How the degree creates value
* Career opportunities
* Income paths
* Entrepreneurial opportunities
* Industry relevance

The goal is not only achievement.

The goal is achievement that creates a meaningful life.

---

## Memory Rules

The AI should remember:

* Consultation data
* Future Self profile
* Roadmap history
* Lock-In history
* Weekly reviews
* Major milestones
* Repeated challenges
* Previous recommendations

The AI should use previous context when generating future recommendations.

Recommendations should become more personalized over time.

---

# Firebase

Firebase is the primary backend platform.

Used for:

* Authentication
* Firestore Database
* Storage
* Security Rules

---

## Authentication

Supported providers:

* Google

Protected routes:

```text
/dashboard
/consultation
/future-self
/roadmap
/lock-in
/reviews
/settings
```

Unauthenticated users must be redirected to login.

---

## Database Rules

Every query must be scoped to the current user.

Never access user-owned data without filtering.

Users should only have access to:

* Their profile
* Their consultations
* Their future selves
* Their roadmaps
* Their reviews
* Their lock-in sessions

---

# Zod

All AI outputs must be validated.

Use Zod for:

* Consultation outputs
* Future Self outputs
* Roadmaps
* Reviews
* Opportunity analysis
* Progress reports

Never trust AI responses without validation.

---

# React Hook Form

Used for:

* Consultation forms
* User profile forms
* Goal creation
* Lock-In setup
* Review forms

Preferred over manual form state.

---

# shadcn/ui

Primary UI system.

Before installing a UI dependency:

1. Check if shadcn already provides it.
2. Prefer shadcn over third-party UI libraries.

---

# Google Analytics

Used only for product analytics.

Purpose:

* Feature adoption
* User engagement
* Retention analysis
* Roadmap completion tracking
* Lock-In completion tracking
* User progression through onboarding

Not used for AI memory.

---

## Event Rules

All analytics events must be documented inside:

```text
code-standards.md
```

Never create undocumented events.

---

# Recharts

Used for:

* Progress tracking
* Roadmap progress
* Lock-In statistics
* Milestone completion
* Goal completion trends
* Weekly review analytics

No other charting library should be introduced without updating this file.

---

# Future Libraries

Do not add a library here until it is actually adopted.

When introducing a new library:

1. Add it to package.json
2. Add it to code-standards.md approved dependencies
3. Add usage patterns here

Only then is it considered part of Zent.

---

## Current Approved Libraries

* Gemini
* Firebase
* Zod
* React Hook Form
* shadcn/ui
* Recharts
* Tailwind CSS
* Lucide React

Everything else should wait until the feature requiring it is actually being built.
