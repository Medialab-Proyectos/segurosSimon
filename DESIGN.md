# Simon Mobility – Design Guidelines

This document defines the design principles, UX patterns, behavioral design strategies, and interaction standards used in the Simon application.

Claude Code must follow these guidelines when generating interfaces, features, or user flows.

---

# 1. Usability Standards

The product must follow internationally recognized usability standards.

Primary references:

- Nielsen’s 10 Usability Heuristics
- ISO 9241 Ergonomics of Human-System Interaction
- WCAG accessibility guidelines
- Mobile-first usability patterns

Key rules:

- Visibility of system status
- Match between system and real world
- User control and freedom
- Consistency and standards
- Error prevention
- Recognition over recall
- Flexibility and efficiency
- Minimalist design
- Error recovery
- Help and documentation

Interfaces should prioritize **clarity and simplicity**.

---

# 2. UX Laws

Design must respect the most important UX laws.

### Hick’s Law

Reduce decision complexity by limiting visible options.

### Fitts’s Law

Interactive elements must be large enough and easily reachable.

### Jakob’s Law

Users expect familiar patterns.

### Miller’s Law

Limit cognitive load by showing no more than 5–7 elements.

### Tesler’s Law

Complexity must be absorbed by the system.

### Peak-End Rule

Users remember the peak emotional moment and the final experience.

---

# 3. Ergonomics

Since the product is mobile-first, ergonomic considerations are critical.

### Thumb reach zones

Primary actions must be placed in reachable areas.

Best placement:

- bottom navigation
- central actions
- floating primary buttons

Avoid:

- small targets
- top-corner primary actions

### Interaction rules

Minimum tap target:

44px

Spacing between elements:

8–16px

---

# 4. Accessibility

The product must follow WCAG 2.1 accessibility standards.

Key principles:

### Perceivable

- sufficient color contrast
- readable typography
- clear iconography

### Operable

- buttons accessible with one hand
- simple navigation

### Understandable

- simple language
- predictable behavior

### Robust

- compatibility with screen readers

Minimum contrast ratio:

4.5:1

---

# 5. Behavioral Design Patterns

The product uses behavioral psychology to encourage engagement.

Key mechanisms:

### Nudging

Encourage beneficial actions through subtle design cues.

Examples:

- reminders to renew insurance
- expiration alerts

### Loss Aversion

Highlight what the user might lose.

Example:

"Your insurance expires tomorrow"

### Commitment Bias

Encourage users to commit to actions.

Example:

"Set a reminder to renew tomorrow"

### Social Proof (future)

Show behaviors adopted by other users.

---

# 6. Engagement Patterns

The application should motivate users to return.

Techniques include:

### Notifications

- expiration alerts
- renewal reminders
- service suggestions

### Progress indicators

Show completion progress during processes.

### Quick success moments

Allow users to accomplish tasks quickly.

---

# 7. Narrative Design (Hero Journey)

The product experience can follow narrative principles.

User journey stages:

1. Situation
2. Problem
3. Discovery
4. Solution
5. Achievement

Example:

User receives reminder → enters app → renews insurance → feels relief.

Interfaces should guide users toward successful outcomes.

---

# 8. Color Theory

Color must communicate meaning.

Primary brand color:

Green – security and trust.

Color roles:

Green → success, active policy  
Amber → expiring soon  
Red → expired or urgent action

Color should guide user attention toward important actions.

Avoid excessive color use.

---

# 9. Material Design 3 Patterns

The application should follow Material Design interaction patterns where appropriate.

Examples:

### Cards

Used for grouping information.

### Bottom navigation

Used for main navigation.

### Floating action buttons

Used for primary actions.

### Snackbars / Toasts

Used for feedback.

### Dialogs

Used for confirmations.

---

# 10. Microcopy

Microcopy must be:

- clear
- direct
- friendly

Guidelines:

Avoid technical language.

Examples:

Good:
"Your insurance expires in 3 days"

Bad:
"Policy expiration date approaching"

Use action-oriented language.

Example:

"Renew your insurance"

---

# 11. Microinteractions

Microinteractions improve usability and feedback.

Examples:

- button feedback animations
- loading indicators
- confirmation messages
- subtle success animations

Principles:

- fast
- lightweight
- meaningful

Avoid excessive animation.

---

# 12. Design Trends

The product should follow modern UI patterns.

Recommended trends:

- mobile-first interfaces
- card-based layouts
- clear typography
- minimal navigation
- contextual actions

Avoid:

- cluttered interfaces
- excessive menus
- complex forms

---

# 13. Emotional Experience

The app should communicate:

- safety
- confidence
- control

The user should feel that their vehicle and insurance are under control.

Design should reduce anxiety related to deadlines or documentation.

---

# 14. Performance UX

Fast interfaces are critical.

Targets:

Load time < 2 seconds.

Key actions must feel immediate.

Skeleton loaders should be used when data loads.

---

# 15. Claude Instructions

When generating UI or flows, Claude must:

1. Follow the UX laws
2. Respect accessibility guidelines
3. Use behavioral design patterns
4. Apply Material Design patterns
5. Keep flows simple (3–5 steps)
6. Use clear microcopy
7. Prioritize mobile ergonomics
