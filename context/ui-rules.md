# UI Rules

Concise rules for building Zent UI.

These rules exist to keep the experience consistent across the entire product while allowing the visual identity to evolve.

Zent is not a productivity app.

Zent is a Future Self Operating System.

Every screen should reinforce clarity, action, accountability, and progress.

---

# Typography

Typography configuration is handled globally by the application.

The AI should never:

* Import fonts
* Configure fonts
* Modify font loading
* Change root typography settings
* Add font-related dependencies

Font configuration lives in:

```text
app/layout.tsx
globals.css
```

The AI should assume typography has already been configured.

When building UI:

* Use semantic typography classes and tokens
* Follow the typography hierarchy defined in this file
* Never introduce a new font without explicit instruction

Typography decisions are owned by the project, not individual features.

---

# Design System Ownership

The project's visual identity is owned by the project owner.

The AI must treat the design system as an existing dependency, not something to redesign.

The AI must not modify or redefine:

* Fonts
* Color palette
* Theme tokens
* Brand identity
* Global spacing system
* Animation system
* Shadows
* Border radius scale
* Icon system
* Existing component styling patterns

These decisions are maintained by the project owner and may evolve independently of feature development.

Unless explicitly instructed, the AI should:

* Use existing design tokens
* Use existing UI components
* Follow established styling patterns
* Respect current theme configuration

The AI should not:

* Introduce new design systems
* Replace existing colors
* Add new typography systems
* Add new animation frameworks
* Modify global theme files
* Change branding decisions

Feature implementation should consume the design system, not redefine it.

---

# Layout

* Page max-width: 1440px
* Center content horizontally
* Main content padding: 32px
* Section gap: 24px
* Header height: 64px
* Responsive on mobile, tablet, and desktop

Use breathing room generously.

Zent should feel calm and focused, never crowded.

---

# Navigation

Primary navigation:

```text
Dashboard
Future Self
Roadmap
Lock-In
Reviews
Profile
```

Navigation should remain simple and predictable.

Avoid deep nesting.

Users should always know:

* where they are
* what they are working on
* what comes next

---

# Cards

Most content should live inside cards.

```css
background: var(--color-card);
border: 1px solid var(--color-border);
border-radius: 16px;
padding: 24px;
```

Cards should separate information without overwhelming the user.

Avoid decorative card designs.

---

# Typography Hierarchy

## Page Heading

```css
font-size: 32px;
font-weight: 700;
```

Used for:

* Dashboard title
* Roadmap title
* Lock-In title

---

## Section Heading

```css
font-size: 18px;
font-weight: 600;
```

Used for:

* Card titles
* Dashboard sections
* Review sections

---

## Body Text

```css
font-size: 14px;
font-weight: 400;
```

---

## Secondary Text

```css
font-size: 12px;
font-weight: 400;
```

Used for:

* timestamps
* labels
* helper text
* metadata

---

# Buttons

## Primary Button

Used for important actions:

* Continue
* Start Consultation
* Generate Future Self
* Begin Lock-In
* Save Roadmap

```css
background: var(--color-primary);
color: var(--color-primary-foreground);
border-radius: 8px;
```

---

## Secondary Button

Used for lower-priority actions.

```css
background: transparent;
border: 1px solid var(--color-border);
```

---

# Inputs

```css
background: var(--color-background);
border: 1px solid var(--color-border);
border-radius: 8px;
```

Inputs should prioritize readability.

Never hide important information behind animations.

---

# Status Colors

All status colors must use semantic tokens.

```css
--color-success
--color-success-foreground

--color-warning
--color-warning-foreground

--color-error
--color-error-foreground

--color-info
--color-info-foreground

--color-pending
--color-pending-foreground

--color-complete
--color-complete-foreground
```

---

## Success

Used for:

* Completed milestones
* Finished roadmap phases
* Successful reviews
* Completed Lock-In periods

---

## Warning

Used for:

* Falling behind schedule
* Missed milestones
* Reduced consistency

---

## Error

Used for:

* Failed actions
* Invalid operations
* Critical blockers

---

## Info

Used for:

* Insights
* Recommendations
* Educational content
* AI observations

---

## Pending

Used for:

* Waiting for user action
* Incomplete steps
* Upcoming milestones

---

## Complete

Used for:

* Achieved outcomes
* Finished goals
* Major accomplishments

---

# Progress States

Every roadmap item must have one of these states:

```text
not_started
in_progress
blocked
completed
abandoned
```

Never invent new progress states without updating this file.

---

# Progress Indicators

Progress indicators are used for:

* Roadmap completion
* Lock-In completion
* Goal completion
* Consultation completion
* Weekly consistency

Color meaning:

```text
Success → Completed
Info → Active Progress
Warning → Behind Target
Error → Critical Drift
```

---

# Future Self Messages

Future Self responses may be categorized as:

```text
Insight
Challenge
Reality Check
Opportunity
Reflection
Recommendation
```

Each type should have:

* Unique icon
* Unique visual treatment
* Consistent styling

---

# Severity Levels

Used for accountability systems.

```text
low
medium
high
critical
```

Examples:

Low

* missed one task

Medium

* missed several tasks

High

* roadmap significantly off track

Critical

* current actions directly conflict with stated goals

---

# Lock-In Mode

Lock-In Mode is a focused execution state.

When active:

* Reduce distractions
* Prioritize today's actions
* Highlight deadlines
* Surface accountability messages
* Emphasize progress and consistency

The UI should communicate:

```text
I have work to do.
```

Not:

```text
I am browsing an app.
```

Lock-In screens should feel more focused than normal application screens.

---

# Empty States

Every page that can be empty must have an empty state.

Include:

* concise explanation
* optional illustration or icon
* clear next action

Examples:

* Start Consultation
* Create First Roadmap
* Begin Lock-In
* Complete First Review

---

# AI Philosophy in UI

The interface should reinforce Zent's philosophy.

The AI is not:

* a cheerleader
* a passive assistant
* a motivational quote generator

The AI is:

* a strategist
* a mentor
* a future self
* a reality checker

UI copy should prioritize:

* honesty
* clarity
* accountability
* progress

Over:

* hype
* empty motivation
* exaggerated promises

---

# Tailwind

This project uses Tailwind v4.

Tokens live in:

```text
globals.css
```

Never define colors in:

```text
tailwind.config.ts
```

Use semantic tokens instead of hardcoded colors.

---

# Do Nots

* Never use hardcoded brand colors in components
* Never use Tailwind default colors directly
* Never use gradient card backgrounds
* Never expose raw error messages
* Never use decorative UI that distracts from execution
* Never create new status types without updating this file
* Never create new progress states without updating this file
* Never prioritize aesthetics over clarity
* Never make accountability messages easy to ignore
