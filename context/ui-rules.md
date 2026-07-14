# UI Rules

Implementation rules for all user interfaces in Zenix.

This file defines how UI is built.

Visual values such as colors, spacing, typography scales, shadows, radii, and animations live in:

```text
ui-tokens.md
```

Reusable components live in:

```text
ui-registry.md
```

The AI must follow this file whenever building UI.

---

# Core Principles

Every screen should reinforce:

- Clarity
- Progress
- Accountability
- Focus
- Execution

Avoid interfaces that feel:

- Noisy
- Decorative
- Distracting

Zenix is a Personal Growth Operating System.

Not a social app.
Not a productivity toy.

---

# Design System Ownership

The visual identity is owned by the project.

The AI must not modify:

- Color palette
- Typography system
- Spacing scale
- Border radius scale
- Animation system
- Theme structure
- Icon system

Consume the design system.

Do not redefine it.

---

# Layout Rules

## Content Width

Use layout tokens.

Never hardcode widths.

---

## Spacing

Use spacing tokens only.

Never invent spacing values.

---

## Responsive Design

Every page must support:

- Mobile
- Tablet
- Desktop

Design mobile-first.

---

# Component Rules

## Reuse First

Before creating a component:

1. Check ui-registry.md
2. Reuse existing patterns
3. Extend existing components when appropriate

Do not create duplicate UI patterns.

---

## shadcn/ui

Use shadcn/ui whenever a matching primitive exists.

Examples:

- Button
- Card
- Input
- Select
- Dialog
- Dropdown Menu
- Tabs
- Sheet
- Tooltip

Avoid introducing UI libraries.

---

## Component Composition

Prefer composition over large monolithic components.

Bad:

```text
DashboardPage.tsx
  1000+ lines
```

Good:

```text
DashboardHeader.tsx
DashboardMetrics.tsx
DashboardGoals.tsx
DashboardActivity.tsx
```

---

# Typography Rules

Typography values come from ui-tokens.md.

Use semantic hierarchy:

- Page Title
- Section Title
- Card Title
- Body Text
- Secondary Text

Never hardcode font sizes.

---

# Card Rules

Cards are the primary content container.

Cards should:

- Group related information
- Be visually quiet
- Prioritize readability

Avoid decorative styling.

---

# Button Rules

Every action must have a clear hierarchy.

Priority:

1. Primary
2. Secondary
3. Ghost
4. Destructive

Never create custom button variants unless documented.

---

# Form Rules

Use:

- React Hook Form
- Zod validation

Every form must have:

- Labels
- Validation
- Error states
- Loading states
- Success states

Never rely on placeholders as labels.

---

# Loading States

Every async UI must include one of:

- Skeleton
- Spinner
- Progress state

Never leave users wondering if something is happening.

---

# Empty States

Every empty page requires:

- Explanation
- Context
- Next action

Examples:

- Create your first roadmap
- Complete consultation
- Start Lock-In

---

# Error States

Every error state must:

- Explain the issue
- Suggest next action
- Avoid technical language

Never expose raw errors.

---

# Dashboard Rules

Dashboards should answer:

1. Where am I?
2. What matters now?
3. What should I do next?

Everything else is secondary.

---

# Progress Visualization

Progress should be visible for:

- Consultation
- Goals
- Projects
- Roadmaps
- Lock-In

Use approved progress components only.

---

# Future Self UI

Future Self messages must be categorized:

```text
Insight
Challenge
Reality Check
Opportunity
Reflection
Recommendation
```

Each type must use:

- Consistent icon
- Consistent styling
- Consistent spacing

Document patterns in ui-registry.md.

---

# Lock-In UI

Lock-In screens should:

- Reduce distractions
- Increase focus
- Surface priorities
- Emphasize execution

The UI should communicate:

```text
Focus on the mission.
```

---

# Accessibility

Every UI must include:

- Keyboard navigation
- Proper labels
- Visible focus states
- Sufficient contrast

Accessibility is required.

---

# Animations

Animations should:

- Guide attention
- Improve clarity

Animations should not:

- Distract
- Delay interaction

Prefer subtle motion.

---

# Tailwind Rules

Use:

```text
Tailwind v4
```

Use semantic tokens only.

Never use:

```text
text-blue-500
bg-red-500
border-gray-200
```

Always use design tokens.

---

# Documentation Rules

When a reusable component is created:

1. Add it to ui-registry.md
2. Document variants
3. Document dependencies

UI work is not complete until the registry is updated.

---

# Do Nots

- Do not hardcode colors
- Do not hardcode typography values
- Do not create duplicate components
- Do not introduce new UI libraries
- Do not expose raw errors
- Do not prioritize aesthetics over clarity
- Do not create undocumented component variants
- Do not bypass ui-registry.md
- Do not bypass ui-tokens.md
