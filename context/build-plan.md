# Phase 1 — Core Identity Layer

## Feature 01 — Authentication & Entry System

### Purpose

Allow users to create an account and enter the Zenix ecosystem.

This feature serves as the gateway to the Future Self experience.

Before a user can complete a consultation, create their Future Self, generate roadmaps, or receive guidance, they must create an account and initialize their profile.

---

## User Flow

```text
Authentication Page
↓
Create Account / Login
↓
Profile Initialized
↓
Check Onboarding Status

If onboarding completed:
    → Dashboard

If onboarding not completed:
    → Consultation
```

---

## Authentication Page

### Layout

Single-screen experience.

The page combines:

```text
• Zenix Branding
• Future Self Messaging
• Authentication Form
```

---

### Hero Messaging

Display rotating typing animations explaining the concept of Zenix.

Examples:

```text
Your future self already knows what works.

Build the person you want to become.

Get guidance from the version of you that already succeeded.

Turn goals into systems.

The future version of you is waiting.
```

Typing effect loops continuously while the authentication form remains visible.

---

### Authentication Methods

#### Email & Password

```text
Create Account
Login
Forgot Password
```

#### Google OAuth

```text
Continue with Google
```

---

### Loading States

```text
Creating your account...
Signing you in...
Preparing your profile...
Redirecting...
```

---

## Core Logic

### Authentication Providers

Supported:

```text
Email & Password
Google OAuth
```

Future providers:

```text
Apple
GitHub
```

---

### Session Management

Requirements:

```text
Persistent login
Automatic session recovery
Secure logout
Protected routes
```

---

## User Initialization

When a user signs in for the first time:

Create:

```text
profiles
```

record.

Default values:

```typescript
{
  onboarding_completed: false,
  future_self_created: false,
  active_lock_in: false,
  current_phase: "consultation"
}
```

---

## Routing Logic

### First-Time Users

Check:

```typescript
profiles.onboarding_completed;
```

If:

```typescript
false;
```

Redirect:

```text
/consultation
```

---

### Returning Users

If:

```typescript
true;
```

Redirect:

```text
/dashboard
```

---

## Protected Routes

```text
/consultation

/dashboard

/future-self

/roadmap

/goals

/projects

/coaches

/reflections

/lock-in

/profile

/settings
```

Unauthenticated users:

```text
→ /auth
```

---

## Database

### Profiles Table

```typescript
profiles {
  id: uuid
  user_id: uuid

  name: string
  email: string
  avatar_url: string

  onboarding_completed: boolean

  future_self_created: boolean

  active_lock_in: boolean

  current_phase: string

  created_at: timestamp
  updated_at: timestamp
}
```

---

## MVP Decisions

### Email Verification

For the MVP:

```text
Email verification is not required.
```

Flow:

```text
Email Signup
↓
Account Created
↓
Auto Login
↓
Consultation
```

This reduces onboarding friction and improves activation rates.

Email verification can be introduced in a later phase.

---

## Out of Scope

This feature does not include:

```text
Future Self Creation
Vision Building
Roadmaps
Goals
Projects
Coaching
Reflections
Lock-In System
```

These belong to subsequent Core Identity Layer features.

---

## Success Criteria

- User can create an account with Email & Password.
- User can authenticate with Google.
- User profile is automatically initialized.
- User session persists across visits.
- Protected routes require authentication.
- New users are redirected to Consultation.
- Returning users are redirected to Dashboard.
- Authentication page communicates the Future Self concept through animated messaging.
- User state is initialized and ready for onboarding.

```

```
