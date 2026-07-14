# Database Schema

## Status

This document evolves alongside implementation.

Only finalized tables should be documented here.

Do not add speculative tables.

Do not design future phases prematurely.

Schemas should be added only when the feature is being built and implemented.

---

# Design Principles

## Source of Truth

The database schema reflects the current implementation of the application.

If a table exists in production, it must exist in this document.

If a table does not exist in production, it should not exist in this document.

---

## Ownership

Every user-owned table must contain:

```sql
user_id
```

All user-owned queries must be scoped to:

```sql
user_id
```

---

## Standard Columns

Every table must contain:

```sql
id
created_at
updated_at
```

Unless there is a documented reason otherwise.

---

## Relationships

Relationships should remain simple.

Prefer:

```text
One-to-Many
```

before introducing:

```text
Many-to-Many
```

Avoid unnecessary join tables.

---

## AI Data

AI outputs should be stored in structured formats.

Prefer:

```sql
jsonb
```

for structured AI outputs.

Avoid storing large unstructured text when structure is available.

---

# Phase 1

## profiles

Purpose:

Stores user account information and onboarding status.

### Columns

| Column               | Type        |
| -------------------- | ----------- |
| id                   | uuid        |
| user_id              | uuid        |
| name                 | text        |
| email                | text        |
| onboarding_completed | boolean     |
| future_self_created  | boolean     |
| active_lock_in       | boolean     |
| created_at           | timestamptz |
| updated_at           | timestamptz |

### Notes

Created automatically after first successful authentication.

Default values:

```typescript
{
  onboarding_completed: false,
  future_self_created: false,
  active_lock_in: false,
}
```

---

# Future Tables

The following sections are placeholders only.

Schemas will be documented when implementation begins.

## Consultation

```text
Not Yet Implemented
```

Potential future tables:

```text
consultation_sessions
consultation_messages
```

---

## Identity Engine

```text
Not Yet Implemented
```

Potential future tables:

```text
identity_blueprints
```

---

## Vision Builder

```text
Not Yet Implemented
```

Potential future tables:

```text
vision_blueprints
```

---

## Future Self

```text
Not Yet Implemented
```

Potential future tables:

```text
future_selves
```

---

## Roadmaps

```text
Not Yet Implemented
```

Potential future tables:

```text
roadmaps
milestones
```

---

## Goals

```text
Not Yet Implemented
```

Potential future tables:

```text
goals
```

---

## Projects

```text
Not Yet Implemented
```

Potential future tables:

```text
projects
```

---

## Lock-In

```text
Not Yet Implemented
```

Potential future tables:

```text
lock_in_cycles
lock_in_sprints
```

---

# Row Level Security

Every user-owned table must enforce:

```sql
user_id = auth.uid()
```

No user should be able to access another user's data.

---

# Migration Rules

Before creating a new table:

1. Confirm the feature exists in build-plan.md
2. Confirm the architecture supports the feature
3. Create migration
4. Update this document
5. Update project-tracker.md

Database changes must always be reflected in:

```text
context/database-schema.md
```

---

# Invariants

- Every user-owned table includes `user_id`
- Every table includes timestamps
- Database schema follows implementation, not speculation
- AI outputs are stored in structured formats where possible
- All tables must be documented here
- RLS is required on all user-owned tables
- Features should not create tables before implementation begins
- Database changes must be reflected in this file immediately
