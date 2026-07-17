# Govern Context

Audit implementation against every file inside:

context/

---

# Verify

## Project Overview

Compare:

context/project-overview.md

against implementation.

Flag:

- undocumented features
- undocumented routes
- undocumented systems
- undocumented user flows

---

## Project Tracker

Compare:

context/project-tracker.md

against implementation.

Flag:

- completed features still unchecked
- tracker status outdated
- incorrect phase status

---

## Build Plan

Compare:

context/build-plan.md

against implementation.

Flag:

- out-of-order implementation
- skipped dependencies
- unfinished prerequisite work

---

## Library Docs

Verify implementation follows approved libraries.

Flag:

- undocumented libraries
- deprecated libraries
- conflicting libraries

---

## Context Drift

Identify:

Code Exists
↓
Not Documented

or

Documented
↓
Not Implemented

Output all drift.
