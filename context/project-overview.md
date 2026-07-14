# Project Overview

## About the Project

Zent is an AI-powered Personal Engineering OS designed to help people become the future version of themselves they aspire to be.

Unlike productivity apps that focus on tasks, habits, or motivation, Zent focuses on personal transformation.

Every user begins with a deep consultation process where the AI learns:

* Who the user is today
* What they want to become
* Why they want it
* What they have already tried
* What has worked and failed
* Their constraints, responsibilities, and resources
* Their current skills and knowledge

Using this information, Zent creates a Future Self Blueprint — a realistic and achievable representation of the person the user can become.

Before finalizing that future, Zent evaluates whether the chosen path actually leads to the outcomes the user wants. The system identifies blind spots, hidden risks, missed opportunities, and real-world implications of the path.

The AI then generates a personalized roadmap that guides the user from their current state to their desired future.

As the user progresses, reflects, learns, succeeds, and struggles, the roadmap continuously evolves to remain realistic, effective, and aligned with the user's long-term vision.

The AI mentor acts as the user's future self.

Its purpose is not to maximize comfort or motivation.

Its purpose is to help the user become the person they committed to becoming.

---

## The Problem It Solves

Most people know they want a better future but struggle with:

* Knowing what path to follow
* Understanding the real-world implications of their goals
* Turning ambitions into actionable plans
* Staying consistent over long periods
* Measuring meaningful progress
* Identifying what is actually holding them back
* Connecting learning to real-world opportunities
* Understanding how their chosen path creates value and financial stability

Most productivity tools manage tasks.

Most educational platforms teach skills.

Most AI assistants answer questions.

Zent helps users design and build the future they actually want.

---

## Core Philosophy

### Future Self First

The user's future self is the center of the system.

Everything exists to move the user toward that future.

---

### Truth Over Comfort

The AI prioritizes truth, growth, accountability, and long-term outcomes over temporary comfort.

The AI does not exist to agree with the user.

The AI exists to help the user achieve meaningful transformation.

---

### Understanding Before Planning

Before creating a roadmap, Zent seeks to understand:

* The user's motivations
* Their circumstances
* Their challenges
* Their desired outcomes

The system plans based on reality, not assumptions.

---

### Future Validation

Not every goal automatically leads to the life a user wants.

The AI analyzes:

* Career opportunities
* Financial opportunities
* Lifestyle implications
* Risks and trade-offs
* Real-world applications

The system helps users understand what their chosen future actually looks like before committing to it.

---

### Progress Through Execution

Learning alone is not enough.

Users must apply knowledge through projects, milestones, and real-world action.

---

### Roadmaps Are Living Systems

Roadmaps evolve based on:

* Performance
* Reflection data
* Available time
* Skill growth
* Real-world outcomes
* New opportunities

The objective remains consistent.

The strategy evolves.

---

## Pages

```text
/                     → Landing page
/login                → Authentication

/onboarding           → Consultation experience

/dashboard            → Personal command center

/future-self          → Future Self Blueprint

/roadmap              → Personalized roadmap
/roadmap/[id]         → Roadmap details

/goals                → Goals overview

/projects             → Projects overview
/projects/[id]        → Project details

/skills               → Skill development

/opportunities        → Future opportunity analysis

/mentor               → AI mentor chat

/reflections          → Reflection history

/lock-in              → Active Lock-In phase

/profile              → User profile and settings
```

---

## Navigation

Primary Navigation

```text
Dashboard
Roadmap
Projects
Skills
Mentor
Profile
```

Future Self, Opportunity Analysis, and Lock-In are accessible through the Dashboard and Roadmap experiences.

The application uses a persistent sidebar navigation.
The sidebar reinforces the user's transformation journey and serves as the primary navigation system throughout the platform.

---

## Core User Flow

### Landing Page

* Hero section
* Product philosophy
* How Zent works
* Who Zent is for
* Features
* Call to action

Logged-in users:

* Redirect to dashboard

Logged-out users:

* Redirect to login

---

### Consultation Phase

After account creation, the user enters a structured consultation with the AI.

The consultation explores:

### Current State

* Current skills
* Education
* Career status
* Lifestyle
* Resources
* Existing commitments

### Desired Future

* Career goals
* Personal goals
* Financial goals
* Lifestyle aspirations
* Legacy and impact goals

### Previous Attempts

* What has been tried before
* What succeeded
* What failed
* Common obstacles
* Patterns of inconsistency

### Constraints

* Available time
* Financial situation
* Responsibilities
* Environment

The objective is to fully understand the user before designing a transformation plan.

---

### Future Self Creation

The AI creates a Future Self Blueprint.

The blueprint contains:

* Future identity
* Skills
* Knowledge
* Lifestyle
* Habits
* Professional achievements
* Financial position
* Personal characteristics

This becomes the user's long-term destination.

---

### Future Validation & Opportunity Analysis

Before finalizing the future self, the AI evaluates:

* Feasibility
* Career outcomes
* Financial outcomes
* Real-world opportunities
* Risks
* Blind spots
* Alternative paths

Example:

A student wanting a First Class degree will also learn:

* How that degree creates opportunities
* How to convert knowledge into value
* Industry opportunities
* Income opportunities
* Entrepreneurship opportunities
* Practical applications of the field

The AI ensures users understand not just how to achieve a future but what that future actually creates.

---

### Roadmap Generation

The roadmap is built using:

```text
Current Self
↓
Future Self
↓
Gap Analysis
↓
Roadmap
```

Roadmaps include:

* Phases
* Milestones
* Skills
* Projects
* Reflection checkpoints

Roadmaps are personalized and continuously updated.

---

### Goal System

Goals exist inside the roadmap.

Goals contain:

* Milestones
* Success criteria
* Progress indicators

Goals support the roadmap.

The roadmap supports the future self.

---

### Project System

Projects are execution vehicles.

Projects can be linked to:

* Goals
* Skills
* Roadmap phases

Projects contain:

* Milestones
* Tasks
* Deliverables
* Progress tracking

---

### Skill Development

Users can:

* Track skills
* Measure proficiency
* Identify skill gaps
* Connect skills to roadmap phases

The AI recommends skills based on Future Self requirements.

---

### Reflection System

Users complete:

* Daily reflections
* Weekly reviews
* Monthly reviews

Reflection data helps the AI:

* Detect bottlenecks
* Identify avoidance patterns
* Improve recommendations
* Update the roadmap

---

### AI Mentor

The AI mentor is the user's future self.

Responsibilities:

* Strategic guidance
* Accountability
* Opportunity awareness
* Roadmap adjustments
* Reflection analysis
* Project guidance
* Skill recommendations

The mentor challenges decisions that move the user away from the future they committed to building.

The mentor prioritizes long-term outcomes over temporary emotions.

---

### Lock-In Phase

Lock-In is a focused execution period.

Duration:

* 30 Days
* 60 Days
* 90 Days

During Lock-In:

* One primary objective is prioritized
* Accountability increases
* Progress is monitored closely
* Distractions are minimized
* Daily execution becomes the focus

Lock-In exists to create significant progress toward major milestones.

---

### Dashboard

The dashboard serves as the user's command center.

Sections:

* Future Self Snapshot
* Current Roadmap Progress
* Active Goals
* Active Projects
* Skill Growth
* Opportunity Insights
* Mentor Guidance
* Recent Activity
* Lock-In Progress

---

## Data Architecture

### User Identity

```text
users
profiles
```

Stores:

* User information
* Preferences
* Consultation status

---

### Consultation System

```text
consultations
consultation_messages
consultation_insights
```

Stores onboarding conversations and extracted insights.

---

### Future Self System

```text
future_self_profiles
future_self_traits
future_self_opportunities
future_self_risks
```

Stores Future Self Blueprints and opportunity analysis.

---

### Roadmap System

```text
roadmaps
roadmap_phases
roadmap_milestones
```

Stores transformation plans.

---

### Goals

```text
goals
goal_milestones
```

Stores measurable outcomes.

---

### Projects

```text
projects
project_milestones
project_tasks
```

Tracks execution.

---

### Skills

```text
skills
user_skills
```

Tracks capability growth.

---

### Reflections

```text
reflections
reflection_reviews
```

Stores self-assessments and lessons.

---

### Mentor Memory

```text
mentor_conversations
mentor_memories
```

Stores long-term mentor context.

---

### Lock-In System

```text
lock_ins
lock_in_progress
```

Tracks focused commitment periods.

---

## Features In Scope (MVP)

* Authentication
* AI consultation onboarding
* Future Self Blueprint generation
* Opportunity analysis
* Personalized roadmap generation
* Goal management
* Project management
* Skill tracking
* AI mentor chat
* Reflection system
* Lock-In mode
* Progress dashboard
* Roadmap evolution system

---

## Features Out of Scope (MVP)

* Community features
* Team collaboration
* Mobile apps
* Institutional plans
* Social networking
* Payments and subscriptions
* Multi-language support

---

## Target User

A person who is serious about growth, achievement, and long-term transformation.

Examples:

* Students
* Developers
* Founders
* Professionals
* Career switchers
* Self-directed learners

Zent is not designed for people looking for motivation alone.

Zent is designed for people committed to becoming who they say they want to become.

---

## Success Criteria

* Users complete consultation in under 15 minutes
* Future Self Blueprints feel accurate and realistic
* Opportunity analysis provides meaningful insights
* Roadmaps feel actionable and achievable
* AI guidance remains useful over long periods
* Reflection data improves roadmap quality
* Projects contribute directly to growth
* Lock-In phases produce measurable outcomes
* Users gain clarity about what to do next
* Users make measurable progress toward their Future Self

---

## Guiding Principle

Every feature should answer:

"Does this help the user become the future version of themselves they committed to building?"
