# Govern UI

Audit implementation against:

context/ui-rules.md
context/ui-tokens.md
context/ui-registry.md

---

# Verify

## Token Usage

Flag:

- hex colors
- rgb colors
- hsl colors
- text-blue-500
- bg-red-500
- border-gray-200

Verify semantic tokens only.

---

## Components

Verify:

- reusable components use approved patterns
- shadcn components used where appropriate

Flag:

- duplicate UI patterns
- unnecessary custom primitives

---

## Accessibility

Verify:

- labels
- focus states
- keyboard navigation
- aria attributes

---

## Empty States

Verify:

- every empty page has an empty state

---

## Loading States

Verify:

- loading state exists
- async operations provide feedback

---

## Error States

Verify:

- user-friendly messages
- no raw errors exposed

---

## Future Self Messages

Verify approved categories:

Insight
Challenge
Reality Check
Opportunity
Reflection
Recommendation

Flag undocumented variants.
