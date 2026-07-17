---
name: govern
allowed-tools: Bash, Read, Grep, Glob, Write, Agent
argument-hint: [audit | align | enforce | sync]
description: "Run /govern to ensure the codebase follows the project's architecture, design system, UI rules, and context files. Audits implementation against context documentation, detects drift, reports violations, updates approved documentation, and can automatically fix safe governance issues."
---

## Output style (plain words, no dashes, no hyphens)

<!-- OUTPUT-STYLE:START -->

Write everything this skill produces, files and messages alike, in plain simple language.

Keep technical terms that carry real meaning.

Explain complex ideas in simple words.

Never use a dash or a hyphen as punctuation.

Write read only, not read-only.

Write short sentences.

Use commas and paragraphs instead.

Code, file paths, command flags, route names, and file names may keep hyphens.

Clear beats clever.

<!-- OUTPUT-STYLE:END -->

## What this skill does

`/govern` protects the project from drifting away from its documented rules.

It compares implementation against:

```text
context/project-overview.md
context/architecture.md
context/build-plan.md
context/database-schema.md
context/code-standards.md
context/ui-rules.md
context/ui-tokens.md
context/ui-registry.md
context/project-tracker.md
```

The goal is simple.

The codebase should remain aligned with the documented system.

This skill identifies:

- Architecture drift
- UI rule violations
- Design token violations
- Duplicate patterns
- Missing documentation
- Missing registry entries
- Missing context updates
- Inconsistent implementation
- Untracked architectural decisions

This skill acts as the governance layer of the project.

---

## Pick the mode

This is always the first step.

Before reading any mode instructions.

Look at what follows `/govern`.

### audit

Example:

```text
/govern audit
```

Run a complete governance audit.

---

### align

Example:

```text
/govern align
```

Find and automatically fix safe governance violations.

---

### enforce

Example:

```text
/govern enforce
```

Find violations and recommend corrections.

---

### sync

Example:

```text
/govern sync
```

Update approved documentation from implementation.

---

### No mode provided

Print exactly this and stop:

```text
Which governance action do you want to run? Type one:

• audit   compare implementation against all context files
• align   automatically fix safe governance violations
• enforce find violations and recommend corrections
• sync    update registry and tracker documentation
```

Wait for user input.

Do not continue until a mode is selected.

---

## Governance Sources Of Truth

Always treat these files as authoritative:

```text
context/project-overview.md
context/architecture.md
context/build-plan.md
context/database-schema.md
context/code-standards.md
context/ui-rules.md
context/ui-tokens.md
```

Implementation must follow them.

Not the other way around.

If implementation conflicts with documentation:

Assume implementation is wrong until proven otherwise.

---

## Governance Priority Order

When conflicts exist:

```text
1. project-overview.md
2. architecture.md
3. build-plan.md
4. database-schema.md
5. code-standards.md
6. ui-rules.md
7. ui-tokens.md
8. ui-registry.md
9. project-tracker.md
```

Higher priority files override lower priority files.

Example:

If architecture.md conflicts with project-tracker.md:

```text
architecture.md wins
```

Tracker must be updated.

Never the reverse.

---

# Mode: audit

## Purpose

Perform a complete governance review.

Read only mode.

No files are modified.

---

## Checks

### Architecture

Verify:

- Folder structure
- Route structure
- Service ownership
- State ownership
- Feature ownership
- Data ownership

Against:

```text
context/architecture.md
```

---

### Project Scope

Verify:

- Implemented features
- Missing features
- Unexpected features

Against:

```text
context/project-overview.md
context/build-plan.md
```

---

### UI Rules

Verify:

- Layout rules
- Accessibility rules
- Form rules
- Dashboard rules
- Loading states
- Empty states
- Component reuse

Against:

```text
context/ui-rules.md
```

---

### Design Tokens

Verify:

No hardcoded:

- Colors
- Typography values
- Radius values
- Shadow values

Against:

```text
context/ui-tokens.md
```

Examples:

Invalid:

```tsx
text-blue-500
bg-red-500
rounded-[12px]
text-[14px]
```

Valid:

```tsx
text - foreground;
bg - background;
border - border;
```

---

### Component Registry

Verify:

Every reusable component exists in:

```text
context/ui-registry.md
```

Detect:

- Missing entries
- Duplicate components
- Undocumented variants

---

### State Management

Verify consistency for:

- Zustand
- React Query
- Server Actions
- Supabase

Against architecture documentation.

---

### Documentation Drift

Verify implementation matches:

```text
project-overview.md
build-plan.md
project-tracker.md
```

Detect:

- Missing features
- Unexpected features
- Incomplete implementation

---

## Output

Create:

```text
docs/governance/audit-report.md
```

Format:

```text
## Governance Audit

Overall Status

PASS
WARNING
FAIL

Architecture

Findings

UI Rules

Findings

Design Tokens

Findings

Component Registry

Findings

Documentation

Findings

Recommended Actions
```

---

# Mode: enforce

## Purpose

Find governance violations.

Recommend corrections.

Never modify implementation.

---

## Output

Create:

```text
docs/governance/enforcement-report.md
```

Format:

```text
## Governance Violations

Severity

LOW
MEDIUM
HIGH
CRITICAL

File

Violation

Required Fix
```

---

# Mode: sync

## Purpose

Synchronize approved documentation with implementation.

---

## Allowed Updates

```text
context/ui-registry.md
context/project-tracker.md
```

---

## Detect

- New components
- New routes
- New pages
- New services
- New database entities

---

## Forbidden Updates

Never automatically modify:

```text
context/project-overview.md
context/architecture.md
context/build-plan.md
context/database-schema.md
context/code-standards.md
context/ui-rules.md
context/ui-tokens.md
```

These files require explicit approval.

---

## Output

Create:

```text
docs/governance/sync-report.md
```

Format:

```text
## Governance Sync

Added Components

Updated Registry

Updated Tracker

Manual Review Required
```

---

# Mode: align

## Purpose

Automatically fix safe governance violations.

---

## Allowed Changes

```text
Update ui-registry.md

Update project-tracker.md

Register reusable components

Normalize imports

Remove unused imports

Replace hardcoded styling
when documented semantic tokens exist

Apply documented UI patterns

Normalize naming conventions
```

---

## Forbidden Changes

Never automatically modify:

```text
Architecture

Database schema

Authentication flow

Route structure

API contracts

Business logic

Dependencies

Package versions

Project overview

Build plan
```

These require:

```text
/govern enforce
```

or

```text
/architect
```

---

## Approval Gate

Before modifying files:

Show proposed changes.

Example:

```text
Proposed Changes

1. Replace text-red-500 with text-error

2. Register DashboardCard in ui-registry.md

3. Update project-tracker.md current feature

Apply changes?

yes
no
```

Wait for approval.

Do not modify files until approved.

---

## Output

Create:

```text
docs/governance/alignment-report.md
```

Format:

```text
## Governance Alignment

Overall Status

Files Checked

Files Updated

Changes Applied

Violations Fixed

Remaining Violations

Manual Decisions Required
```

---

## Success Criteria

A governance run is complete when:

```text
Architecture matches documentation

UI follows ui-rules.md

Styling follows ui-tokens.md

Reusable components are registered

Project tracker reflects implementation

No undocumented patterns exist

No hardcoded design values exist
```

---

## Portability

Any Agent Skills client on macOS, Linux, or Windows.

Required tools:

```text
Read
Glob
Grep
Write
Bash
Agent
```

Subagents may be used for large audits.

The skill should prefer evidence from implementation.

Documentation remains the source of truth.

When in doubt:

Report the conflict.

Do not invent a decision.
