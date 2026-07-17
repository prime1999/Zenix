# Govern Architecture

Audit implementation against:

context/architecture.md
context/project-overview.md
context/build-plan.md

---

# Verify

## Folder Structure

Verify:

components/
actions/
data/
hooks/
ai/
lib/

follow architecture rules.

---

## State Management

Verify:

- Zustand usage follows architecture
- React Query usage follows architecture

Flag:

- Redux
- MobX
- undocumented state systems

---

## Dependency Audit

Flag:

- unapproved packages
- duplicate packages
- abandoned libraries

---

## Feature Alignment

Verify features belong to current phase.

Flag:

future-phase implementations.

---

## Service Boundaries

Verify:

UI
↓
Actions
↓
Data
↓
Database

separation remains intact.
