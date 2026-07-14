# UI Tokens

Design tokens for Zent.

This file defines how design tokens are managed throughout the project.

The purpose of this file is not to define Zent's visual identity. It exists to ensure all features consume the design system consistently.

---

# Design System Ownership

Global design decisions are controlled by the project owner.

This includes:

* Fonts
* Color palette
* Theme tokens
* Brand identity
* Spacing scale
* Animation system
* Motion language
* Iconography

The AI must not modify these systems unless explicitly instructed.

Feature implementation should consume the design system, not redefine it.

---

# Token Philosophy

All visual values should come from design tokens.

Never hardcode:

* Colors
* Font families
* Border radii
* Shadows
* Spacing values
* Animation durations

Use semantic tokens exposed by the design system.

Example:

```tsx
className="bg-background text-foreground border-border"
```

Never:

```tsx
className="bg-[#ffffff] text-[#000000]"
```

---

# Tailwind v4

Zent uses Tailwind CSS v4.

Theme tokens live inside:

```text
app/globals.css
```

using:

```css
@theme {
  /* tokens */
}
```

The AI should never create a `tailwind.config.ts` solely for theme colors or design tokens.

---

# Color System

Zent uses semantic color tokens.

Examples:

```text
background
foreground

primary
secondary
accent

success
warning
error
info

muted
border
card
popover
```

Additional tokens may be introduced by the project owner as the product evolves.

Components must always use semantic tokens instead of specific colors.

Example:

```tsx
bg-success
text-warning
border-error
```

Never:

```tsx
bg-green-500
text-red-500
```

---

## Future Self Message Types

These message types must use semantic styling tokens.

| Type | Token |
|--------|--------|
| Insight | info |
| Challenge | warning |
| Reality Check | error |
| Opportunity | success |
| Reflection | pending |
| Recommendation | primary |

The exact colors are defined by the design system.

Components should use semantic tokens only.

---

## Severity Tokens

| Severity | Color Token |
|-----------|------------|
| low | info |
| medium | warning |
| high | error |
| critical | error |

Severity styling must use semantic tokens.

Never hardcode colors.

---

## Progress State Tokens

| State | Token |
|---------|---------|
| not_started | pending |
| in_progress | info |
| blocked | error |
| completed | success |
| abandoned | warning |

All roadmap and goal progress indicators must use these semantic mappings.

---

# Required Status Tokens

The design system must support the following states:

| State     | Purpose                |
| --------- | ---------------------- |
| success   | completed actions      |
| warning   | cautionary states      |
| error     | failures               |
| info      | informational messages |
| pending   | awaiting action        |
| active    | currently selected     |
| completed | finished milestone     |
| locked    | unavailable content    |
| unlocked  | accessible content     |

The actual colors will be defined by the project owner.

The AI should only consume these semantic states.

---

# Typography

Typography is managed globally by the project owner.

The AI must:

* Use existing typography utilities
* Respect the established hierarchy
* Avoid introducing custom font systems

The AI should never:

* Import fonts
* Change font families
* Modify typography tokens

unless explicitly instructed.

---

# Spacing

Spacing follows the project's spacing scale.

Use Tailwind spacing utilities consistently.

Avoid arbitrary values:

```tsx
p-[13px]
m-[27px]
```

Prefer:

```tsx
p-4
p-6
gap-4
gap-6
```

unless a design requirement explicitly demands otherwise.

---

# Border Radius

Use radius tokens from the design system.

Expected semantic sizes:

```text
radius-sm
radius-md
radius-lg
radius-xl
radius-full
```

Do not hardcode radius values in components.

---

# Shadows

Use semantic shadow tokens.

Examples:

```text
shadow-sm
shadow-md
shadow-lg
```

The AI should not invent custom shadow systems.

---

# Motion

Animations should be subtle and purposeful.

Used for:

* Page transitions
* Modal interactions
* Progress updates
* Roadmap progression
* Future Self conversations
* Timeline updates
* Dashboard interactions

Avoid:

* Decorative animations
* Excessive motion
* Autoplay effects
* Animations without functional value

The project's motion language is controlled by the project owner.

---

# Charts

When visualizing progress:

* Use Recharts
* Consume design tokens
* Support future theme changes
* Use semantic color roles

Examples:

```text
success → completed milestones
warning → at-risk goals
info → progress trends
accent → primary roadmap data
```

Never hardcode chart colors.

---

# Accessibility

Every component must:

* Support keyboard navigation
* Provide visible focus states
* Meet WCAG contrast requirements
* Be usable without animations
* Support screen readers
* Use semantic HTML whenever possible

Accessibility is a core requirement.

---

# Dark Mode

The design system may support:

* Light mode
* Dark mode
* Future themes

The AI must not assume a specific theme.

All components should rely on semantic tokens rather than fixed colors.

---

# Component Consistency

All features should feel like part of the same product.

Components should:

* Reuse existing UI primitives
* Follow established patterns
* Maintain consistent spacing
* Maintain consistent interactions
* Maintain consistent visual hierarchy

Do not create a new pattern when an existing one already solves the problem.

---

# Invariants

* Never use raw Tailwind color classes
* Never hardcode hex colors in components
* Never redefine theme tokens inside feature code
* Never override owner-controlled design decisions
* Always consume semantic tokens
* Always support future theme changes
* Components must remain theme-agnostic
* Design system decisions belong to the project owner
* Feature code should never become the source of truth for design decisions
