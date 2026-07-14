# UI Tokens

Design token standards for Zenix.

This file defines the semantic design language used throughout the platform.

The purpose of this file is not to define the visual identity itself.

The purpose is to define how design values are consumed consistently across the application.

Visual implementation details may evolve over time.

Components should rely on semantic tokens rather than raw values.

---

# Token Ownership

The design system is owned by the project.

The AI must consume tokens.

The AI must not redefine tokens.

The AI must not introduce new visual systems without explicit instruction.

Project owners control:

- Colors
- Typography
- Spacing
- Border Radius
- Shadows
- Motion
- Layout Scale
- Breakpoints
- Theme Variants

---

# Token Philosophy

All visual values originate from design tokens.

Components should never depend on:

- Hex values
- RGB values
- Raw spacing values
- Raw font sizes
- Raw shadows
- Raw radii

Use semantic tokens only.

Good:

```tsx
className = "bg-background text-foreground border-border";
```
