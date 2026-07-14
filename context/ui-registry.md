# UI Registry

The UI Registry is the source of truth for all reusable UI patterns in Zenix.

Every component built in the application must be documented here.

The goal is visual consistency, predictable implementation, and prevention of duplicate component patterns.

---

# Purpose

Before creating a new component:

1. Read this file.
2. Check if a similar component already exists.
3. Reuse existing patterns whenever possible.
4. Only introduce a new pattern if no suitable pattern exists.

After creating a component:

1. Add it to this registry.
2. Document its location.
3. Document its purpose.
4. Document important styling decisions.
5. Document variants if they exist.

This file should always reflect the current UI system.

---

# Registry Structure

Each component entry should follow this format:

```md
## Component Name

Path:
components/path/ComponentName.tsx

Purpose:
Short description.

Variants:

- Variant A
- Variant B

Dependencies:

- Button
- Card

Notes:
Important implementation details.
```

---

# Layout Components

_Components will be added as they are built._

---

# Navigation Components

_Components will be added as they are built._

---

# Dashboard Components

_Components will be added as they are built._

---

# Consultation Components

_Components will be added as they are built._

---

# Future Self Components

_Components will be added as they are built._

---

# Roadmap Components

_Components will be added as they are built._

---

# Goal Components

_Components will be added as they are built._

---

# Project Components

_Components will be added as they are built._

---

# Lock-In Components

_Components will be added as they are built._

---

# Profile Components

_Components will be added as they are built._

---

# Shared UI Components

_Components will be added as they are built._

---

# Component Rules

## Reuse Before Create

If a component already exists:

- Reuse it
- Extend it if necessary
- Do not create duplicate patterns

---

## Styling Rules

Every component must:

- Follow ui-rules.md
- Use tokens from ui-tokens.md
- Use Tailwind classes only
- Use shadcn/ui primitives where appropriate

---

## Documentation Rules

Every component entry must include:

- Component name
- File path
- Purpose
- Variants
- Dependencies
- Notes

---

## Registry Maintenance

Whenever a component is:

- Created
- Modified significantly
- Replaced
- Deprecated

This file must be updated.

The UI Registry should always represent the actual state of the codebase.

---

# Deprecated Components

_Any retired components should be moved here instead of being deleted from the registry._

---

# Future Patterns

Document approved UI patterns here before they become widely used.

Examples:

- Multi-step wizard pattern
- Dashboard card pattern
- Empty state pattern
- Timeline pattern
- Progress tracker pattern

These patterns should only be added after they have been implemented and approved.
