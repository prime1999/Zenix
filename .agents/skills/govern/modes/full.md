# Govern Full

Run all audits.

1. Context Audit
2. Architecture Audit
3. UI Audit
4. Registry Audit
5. Database Audit
6. Route Audit
7. Standards Audit
8. Dependency Audit

---

# Database Audit

Compare:

context/database-schema.md

against:

- migrations
- schema
- table usage

Flag:

- undocumented tables
- undocumented columns
- missing relationships
- orphaned tables

---

# Route Audit

Compare:

project-overview.md

against actual routes.

Flag:

Documented but Missing

Implemented but Undocumented

---

# Code Standards Audit

Compare implementation against:

context/code-standards.md

Verify:

- naming
- folder structure
- imports
- types
- server actions
- hooks
- file organization

---

# Context Health Score

Calculate:

Documentation Coverage
Architecture Compliance
UI Compliance
Registry Coverage
Database Compliance
Route Compliance

---

# Output

## Overall Result

PASS
WARNING
FAIL

---

## Context Health Score

0-100

---

## Documentation Coverage

%

---

## Architecture Compliance

%

---

## UI Compliance

%

---

## Registry Coverage

%

---

## Database Compliance

%

---

## Route Compliance

%

---

## Violations

List all issues.

---

## Drift Detected

List implementation/documentation mismatches.

---

## Recommended Fixes

Ordered by severity.

LOW
MEDIUM
HIGH
CRITICAL

---

## Files Requiring Updates

context/project-overview.md

context/architecture.md

context/project-tracker.md

context/ui-registry.md

context/database-schema.md
