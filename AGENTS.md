# AGENTS.md

# Zenix Development Rules

This file is the entry point for every AI agent working on the Zenix codebase.

Before implementing any feature, read the project context files.

---

# Required Reading Order

Every session must read:

```text
1. context/project-overview.md
2. context/architecture.md
3. context/code-standards.md
4. context/library-docs.md
5. context/ui-rules.md
6. context/ui-tokens.md
7. context/ui-registry.md
8. context/project-tracker.md
9. context/database-schema.md
```

If a file is missing, continue with the remaining files.

---

# Source of Truth Hierarchy

When instructions conflict:

```text
User Request
        ↓
AGENTS.md
        ↓
Project Context Files
        ↓
Library Documentation
        ↓
General Knowledge
```

Always follow the highest authority.

---

# Project Mission

Zenix is an AI-powered Personal Growth Operating System.

The goal is to help users bridge the gap between:

```text
Current Self
        ↓
Future Self
```

Every feature should support transformation, execution, accountability, or progress.

Before implementing anything ask:

> Does this help the user become the future version of themselves they committed to building?

If the answer is no, do not build it.

---

# Architecture Rules

Always follow:

```text
context/architecture.md
```

Never:

- Move business logic into pages
- Access the database directly from components
- Bypass the data layer
- Place AI logic outside `/ai`

Architecture boundaries are mandatory.

---

# Code Rules

Always follow:

```text
context/code-standards.md
```

Key rules:

- TypeScript strict mode
- No any
- Named exports only
- One component per file
- Server Components by default
- Async functions require error handling
- No speculative abstractions

---

# UI Rules

Always follow:

```text
context/ui-rules.md
context/ui-tokens.md
context/ui-registry.md
```

Before building a component:

1. Check ui-registry.md
2. Reuse existing patterns
3. Build only if necessary
4. Register the component

Never:

- Hardcode colors
- Hardcode typography values
- Introduce new design systems
- Create undocumented variants

---

# Database Rules

Always follow:

```text
context/database-schema.md
```

Rules:

- All user-owned data requires ownership checks
- All queries scoped to authenticated users
- All schema changes documented

---

# AI Rules

AI logic belongs only in:

```text
ai/
```

The AI should act as:

- Future Self
- Mentor
- Strategist
- Accountability Partner

The AI should prioritize:

- Truth
- Growth
- Accountability
- Long-term outcomes

The AI should not optimize for comfort.

---

# Documentation Rules

After completing any feature:

Update:

```text
context/project-tracker.md
```

If architecture changes:

Update:

```text
context/architecture.md
```

If schema changes:

Update:

```text
context/database-schema.md
```

If reusable UI is added:

Update:

```text
context/ui-registry.md
```

If design tokens change:

Update:

```text
context/ui-tokens.md
```

Documentation is part of the implementation.

A feature is not complete until documentation is updated.

---

# MCP Servers

Before using external tools:

1. Check available MCP servers
2. Use MCP servers when available
3. Use library documentation second
4. Use general documentation last

Priority:

```text
MCP Server
        ↓
Project Context
        ↓
Library Documentation
        ↓
General Documentation
```

---

# Build Philosophy

Build incrementally.

Complete:

```text
UI
    ↓
Data Layer
    ↓
Actions
    ↓
AI Logic
    ↓
Testing
```

before moving to the next feature.

Never build multiple roadmap items simultaneously.

---

# Progress Tracking

Current source of truth:

```text
context/project-tracker.md
```

Before starting work:

- Read current phase
- Read current feature
- Read current sprint

After finishing work:

- Mark completed tasks
- Update progress
- Record architectural decisions

---

# Definition of Done

A feature is complete only when:

- Requirements are implemented
- Types are correct
- Error states exist
- Loading states exist
- Accessibility is considered
- Documentation is updated
- Project tracker is updated

If any item is missing, the feature is not done.
