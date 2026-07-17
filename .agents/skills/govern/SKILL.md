---
name: govern
allowed-tools: Bash, Read, Grep, Glob, Write, Agent
argument-hint: [audit | audit-strict | align | enforce | sync]
description: "Governance system for Zenix. Validates implementation against context files, detects drift, enforces architecture, UI rules, design tokens, and documentation consistency."
---

# What This Skill Does

/govern protects the project from drifting away from its documented architecture, design system, implementation standards, and roadmap.

The following files are the source of truth:

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

Implementation must follow documentation.

Documentation does not follow implementation.

If implementation conflicts with documentation:

```text
Assume implementation is wrong
until evidence proves otherwise.
```

---

# Governance Priority Order

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

Higher priority documents override lower priority documents.

---

# Evidence Rule

Every finding MUST contain:

```text
File
Line
Rule
Evidence
Recommended Fix
```

Example:

File:
components/login-form.tsx

Line:
82

Rule:
context/ui-tokens.md

Evidence:
Uses text-red-500.

Rule requires semantic tokens.

Recommended Fix:
Replace text-red-500 with text-error.

````

No evidence means no finding.

---

# Failure Rule

The audit is invalid if any finding is missing:

```text
File
Line
Rule
Evidence
Recommended Fix
````

Do not generate summaries.

Do not generate assumptions.

Do not generate recommendations without evidence.

Continue auditing until evidence exists.

---

# Forbidden Language

Never use:

```text
appears
likely
might be
possibly
expected
needs review
probably
seems
potentially
```

Use only:

```text
PASS
FAIL
UNKNOWN
```

UNKNOWN means evidence could not be found.

---

# Pick Mode

## audit

```text
/govern audit
```

Read only governance audit.

No files modified.

---

## audit-strict

```text
/govern audit-strict
```

Evidence based audit.

No assumptions.

No summaries.

No inferred violations.

Every finding requires evidence.

---

## enforce

```text
/govern enforce
```

Find violations.

Provide fixes.

Do not modify files.

---

## align

```text
/govern align
```

Fix safe governance violations.

Requires approval before changes.

---

## sync

```text
/govern sync
```

Synchronize approved documentation.

Only approved files may be updated.

---

## No Mode

Print:

Which governance action do you want to run?

audit
audit-strict
enforce
align
sync

Then stop.

Wait for input.

---

# Audit Execution

Step 1

Load:

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

Step 2

Scan implementation:

```text
app/**
components/**
actions/**
hooks/**
lib/**
data/**
ai/**
providers/**
stores/**
```

Step 3

Compare implementation against governance documents.

Step 4

Generate evidence.

Step 5

Generate report.

---

# Required Checks

## Architecture

Verify:

```text
Folder structure
Route structure
Service boundaries
Feature ownership
Data ownership
State ownership
```

Against:

```text
context/architecture.md
```

---

## UI Rules

Verify:

```text
Layout rules
Form rules
Accessibility
Loading states
Empty states
Component reuse
```

Against:

```text
context/ui-rules.md
```

---

## Design Tokens

Verify:

```text
No raw colors
No hardcoded typography
No hardcoded radius values
No hardcoded shadow values
```

Against:

```text
context/ui-tokens.md
```

Flag:

```text
text-red-500
bg-blue-500
rounded-[12px]
text-[14px]
```

---

## Component Registry

Verify every reusable component exists in:

```text
context/ui-registry.md
```

For every reusable component:

```text
Component exists
Registry entry exists
```

PASS or FAIL.

No assumptions.

---

## State Management

Verify:

```text
React Query
Zustand
Supabase
Server Actions
```

Against architecture.md.

---

## Documentation Drift

Verify:

```text
project-overview.md
build-plan.md
project-tracker.md
```

Match implementation.

---

# Audit Report Format

```text
## Governance Audit

Overall Status

PASS
WARNING
FAIL

Architecture

Status

PASS
FAIL
UNKNOWN

Findings

File:
Line:
Rule:
Evidence:
Recommended Fix:

UI Rules

Status

PASS
FAIL
UNKNOWN

Findings

File:
Line:
Rule:
Evidence:
Recommended Fix:

Design Tokens

Status

PASS
FAIL
UNKNOWN

Findings

File:
Line:
Rule:
Evidence:
Recommended Fix:

Component Registry

Status

PASS
FAIL
UNKNOWN

Findings

File:
Line:
Rule:
Evidence:
Recommended Fix:

Documentation

Status

PASS
FAIL
UNKNOWN

Findings

File:
Line:
Rule:
Evidence:
Recommended Fix:
```

---

# Align Mode

Allowed:

```text
Update ui-registry.md
Update project-tracker.md
Remove unused imports
Normalize imports
Replace documented token violations
Register reusable components
Apply existing UI patterns
```

Forbidden:

```text
Architecture changes
Database changes
Route changes
API changes
Dependencies
Authentication flow
Business logic
```

Before modifying files:

Show:

Proposed Changes

1.
2.
3.

Apply changes?

yes
no

Wait for approval.

---

# Sync Mode

May update:

```text
context/ui-registry.md
context/project-tracker.md
```

May not update:

```text
context/project-overview.md
context/architecture.md
context/build-plan.md
context/database-schema.md
context/code-standards.md
context/ui-rules.md
context/ui-tokens.md
```

These remain source of truth.

---

# Success Criteria

Governance passes when:

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

# Workflow

After every feature:

```text
/develop

/govern audit-strict

/govern align

/govern sync
```

Feature work is not complete until governance passes.
