# Implementation Phases

This file is the execution checklist. Complete phases sequentially.

## Global Rule

Do not start a later phase because the current UI looks finished.

A phase is complete only when its acceptance criteria and QA
requirements pass.

------------------------------------------------------------------------

# PHASE 0 --- ARCHITECTURE FOUNDATION

## Goal

Establish the frontend-first architecture for `itsyourday.fun`.

### Tasks

-   [ ] Create GitHub repository
-   [ ] Connect Lovable to GitHub
-   [ ] Configure Antigravity workflow
-   [ ] Establish HTML/CSS/Vanilla JS frontend structure
-   [ ] Configure ES modules
-   [ ] Create global design system
-   [ ] Create responsive layout utilities
-   [ ] Create reusable navigation/footer components
-   [ ] Create template registry convention
-   [ ] Create mock template data
-   [ ] Create mock occasion data
-   [ ] Add `.env.example`
-   [ ] Add `.gitignore`
-   [ ] Add README.md
-   [ ] Add PLAN.md
-   [ ] Add PHASE.md

### Frontend-only rule

Do NOT add:

``` text
React
TypeScript
TanStack Query
Redux
Zustand
Axios
Supabase SDK
```

unless an explicit architecture decision later changes the frontend
stack.

### Environment

No secrets are required for the initial frontend-only phase.

------------------------------------------------------------------------

# PHASE 1 --- PUBLIC FRONTEND MVP

## Goal

Create a polished, responsive public website using mock/local data.

### 1. Homepage

-   [ ] Navbar
-   [ ] Brand: itsyourday.fun
-   [ ] Hero
-   [ ] Search bar
-   [ ] Trending occasions
-   [ ] Occasion categories
-   [ ] Featured templates
-   [ ] How It Works
-   [ ] Bottom CTA
-   [ ] Footer
-   [ ] Responsive mobile navigation

### 2. Templates

-   [ ] `/templates`
-   [ ] Search
-   [ ] Occasion filtering
-   [ ] Template grid
-   [ ] Featured state
-   [ ] Empty state
-   [ ] Hover states
-   [ ] Mobile layout

### 3. Template detail

-   [ ] `/templates/:templateId`
-   [ ] Preview
-   [ ] Metadata
-   [ ] Personalize CTA
-   [ ] Related templates
-   [ ] Invalid template state

### 4. Personalization

-   [ ] Recipient name
-   [ ] Sender name
-   [ ] Message
-   [ ] Optional photo UI
-   [ ] Live preview
-   [ ] Character limits
-   [ ] Client-side validation
-   [ ] Reset/edit controls

### 5. Wish renderer

-   [ ] Create `/wish/index.html`
-   [ ] Create common wish shell
-   [ ] Create template registry
-   [ ] Create template resolver
-   [ ] Load mock wish data
-   [ ] Render selected template
-   [ ] Handle invalid template
-   [ ] Handle missing fields

### 6. Initial template set

Start with 3--5 high-quality birthday templates.

Example:

``` text
birthday-01
birthday-02
birthday-03
birthday-04
birthday-05
```

Each template should contain its own visual design while consuming the
common wish data contract.

### 7. Create Custom

-   [ ] `/create-custom`
-   [ ] Occasion
-   [ ] Recipient
-   [ ] Relationship
-   [ ] Requirements
-   [ ] Preferred style
-   [ ] Reference/upload UI
-   [ ] Validation
-   [ ] Mock success state

No real submission.

### Phase 1 acceptance criteria

A user can:

``` text
Open site
→ Browse templates
→ Filter/search
→ Open template
→ Personalize
→ Preview
→ Render a wish experience
```

No backend is required.

------------------------------------------------------------------------

# PHASE 2 --- FRONTEND QA & POLISH

## Goal

Make the frontend release-quality before adding backend complexity.

### Tasks

-   [ ] Test 375px mobile
-   [ ] Test 768px tablet
-   [ ] Test 1024px desktop
-   [ ] Test 1440px desktop
-   [ ] Test Chrome
-   [ ] Test Safari
-   [ ] Test Android browser
-   [ ] Test iPhone Safari
-   [ ] Check keyboard navigation
-   [ ] Check semantic headings
-   [ ] Check form labels
-   [ ] Check image alt text
-   [ ] Check reduced motion
-   [ ] Check slow network behavior
-   [ ] Check broken/missing image behavior
-   [ ] Check invalid template behavior
-   [ ] Check no horizontal overflow
-   [ ] Optimize image sizes
-   [ ] Remove unused dependencies/assets
-   [ ] Remove duplicated CSS/JS
-   [ ] Run final frontend build

### Completion condition

The frontend works entirely without Supabase or another backend.

------------------------------------------------------------------------

# PHASE 3 --- SUPABASE BACKEND FOUNDATION

## Goal

Introduce persistent data without redesigning the approved frontend.

### Tasks

-   [ ] Create Supabase project
-   [ ] Configure environment variables
-   [ ] Establish migration strategy
-   [ ] Create `events`
-   [ ] Create `event_media`
-   [ ] Create `templates`
-   [ ] Create `occasions`
-   [ ] Create `custom_requests`
-   [ ] Create indexes
-   [ ] Add constraints
-   [ ] Configure RLS
-   [ ] Configure Storage
-   [ ] Create seed data
-   [ ] Replace mock template data
-   [ ] Replace mock occasion data

### Event fields

``` text
id
event_type
recipient_name
sender_name
relationship
message
event_date
template_id
slug
status
created_at
updated_at
```

Use generic `event_type`, not birthday-specific infrastructure.

### Storage

Bucket:

``` text
event-media
```

Requirements:

-   [ ] MIME validation
-   [ ] File-size limits
-   [ ] Upload-count limits
-   [ ] Safe object paths
-   [ ] Storage RLS
-   [ ] Do not trust filenames

### Public data

Only intentionally public fields may be exposed through a published
wish.

### Phase 3 acceptance

``` text
Create → Save → Retrieve
```

works using Supabase.

------------------------------------------------------------------------

# PHASE 4 --- REAL BIRTHDAY EXPERIENCE

## Goal

Turn the prototype into the first real shareable product.

### Tasks

-   [ ] Create event
-   [ ] Upload up to configured photo limit
-   [ ] Preview photos
-   [ ] Delete/reorder photos
-   [ ] Select template
-   [ ] Save event
-   [ ] Generate unpredictable unique slug
-   [ ] Prevent reserved slugs
-   [ ] Publish event
-   [ ] Generate public URL
-   [ ] Copy URL
-   [ ] Open public URL
-   [ ] Render correct template
-   [ ] Show recipient content
-   [ ] Show message
-   [ ] Show photos
-   [ ] Add replay
-   [ ] Add create-your-own CTA

### QA

-   [ ] Invalid slug
-   [ ] Missing event
-   [ ] Missing photo
-   [ ] Empty message
-   [ ] Duplicate slug
-   [ ] Refresh public page
-   [ ] Direct URL access
-   [ ] Slow network
-   [ ] Mobile interaction
-   [ ] Public/private field exposure

### Completion condition

**Create → Publish → Share → Open**

works reliably.

------------------------------------------------------------------------

# PHASE 5 --- BIRTHDAY V1

## Goal

Make the birthday product genuinely share-worthy.

### Tasks

-   [ ] 3--5 polished birthday templates
-   [ ] Template previews
-   [ ] Better animations
-   [ ] Better photo presentation
-   [ ] Optional music
-   [ ] Theme customization
-   [ ] WhatsApp sharing
-   [ ] Web Share API
-   [ ] Social preview metadata
-   [ ] Reduced-motion support
-   [ ] Performance optimization
-   [ ] Loading/error states

Do not chase template quantity.

------------------------------------------------------------------------

# PHASE 6 --- ACCOUNTS & DASHBOARD

## Goal

Create a persistent user account system.

### Tasks

-   [ ] Supabase Auth
-   [ ] Email login
-   [ ] Google login if appropriate
-   [ ] Session handling
-   [ ] User profile
-   [ ] Dashboard
-   [ ] My wishes
-   [ ] Edit
-   [ ] Duplicate
-   [ ] Delete
-   [ ] Archive
-   [ ] Preview
-   [ ] Share

### Security

-   [ ] Ownership RLS
-   [ ] Protected authenticated operations
-   [ ] No client-trusted user IDs
-   [ ] No custom password storage

------------------------------------------------------------------------

# PHASE 7 --- ASSISTED + CUSTOM

## Assisted creation

-   [ ] Create-it-for-me flow
-   [ ] Structured questionnaire
-   [ ] Desired emotion
-   [ ] Memories
-   [ ] Preferred style
-   [ ] Existing template selection
-   [ ] Preview
-   [ ] Initial rule-based generation

Do not require AI for the first implementation.

## Custom requests

-   [ ] Request Custom Design
-   [ ] Occasion
-   [ ] Recipient
-   [ ] Description
-   [ ] Desired style
-   [ ] Photos/videos
-   [ ] Reference links
-   [ ] Deadline
-   [ ] Optional budget
-   [ ] Request status

Statuses:

``` text
submitted
reviewing
quoted
accepted
in_progress
ready
completed
cancelled
```

Initial fulfillment may be manual.

------------------------------------------------------------------------

# PHASE 8 --- PAYMENTS

## Goal

Monetize validated usage.

### Tasks

-   [ ] Define free/premium entitlements
-   [ ] Select Razorpay for India-first launch
-   [ ] Create payment provider abstraction
-   [ ] Create secure order endpoint/Edge Function
-   [ ] Checkout
-   [ ] Webhook
-   [ ] Cryptographic signature verification
-   [ ] Idempotent webhook handling
-   [ ] Payment records
-   [ ] Entitlements
-   [ ] Premium template access
-   [ ] Custom design payment
-   [ ] Refund handling
-   [ ] Payment failure handling

### Critical rule

Never unlock a paid feature solely because browser JavaScript reports
success.

Payment state must be confirmed server-side.

Never store card data.

------------------------------------------------------------------------

# PHASE 9 --- MULTIPLE OCCASIONS

## Goal

Expand from birthday into the celebration platform.

### Occasions

-   [ ] Birthday
-   [ ] Anniversary
-   [ ] Wedding
-   [ ] Graduation
-   [ ] Congratulations
-   [ ] New Baby
-   [ ] Festival
-   [ ] Thank You
-   [ ] Love
-   [ ] Friendship
-   [ ] Good Luck
-   [ ] Get Well Soon
-   [ ] Just Because

### Tasks

-   [ ] Generic event creation
-   [ ] Occasion selector
-   [ ] Occasion-specific templates
-   [ ] Generic renderer
-   [ ] Occasion filtering
-   [ ] Occasion landing pages

------------------------------------------------------------------------

# PHASE 10 --- DIGITAL CARD MAKER

## Goal

Support digital cards in addition to interactive pages.

### Tasks

-   [ ] Card templates
-   [ ] Card editor
-   [ ] Typography controls
-   [ ] Image positioning
-   [ ] Image export
-   [ ] PDF export
-   [ ] Shareable card URL
-   [ ] Premium cards

------------------------------------------------------------------------

# PHASE 11 --- AI PERSONALIZATION

## Goal

Reduce creation friction.

### Tasks

-   [ ] Write-it-for-me
-   [ ] Website message generation
-   [ ] Card message generation
-   [ ] WhatsApp copy
-   [ ] Social caption
-   [ ] Tone selection
-   [ ] Secure AI Edge Function
-   [ ] Rate limiting
-   [ ] Usage tracking
-   [ ] Input/output validation

Never expose AI provider API keys in frontend code.

------------------------------------------------------------------------

# PHASE 12 --- TEMPLATE PLATFORM

## Goal

Turn templates into a scalable content system.

### Tasks

-   [ ] Template registry
-   [ ] Template metadata
-   [ ] Template versioning
-   [ ] Preview assets
-   [ ] Draft state
-   [ ] Review state
-   [ ] Published state
-   [ ] Deprecated state
-   [ ] Template analytics
-   [ ] Creator submission
-   [ ] Moderation
-   [ ] Revenue sharing

------------------------------------------------------------------------

# PHASE 13 --- ADVANCED PLATFORM

Only implement after validated demand.

Potential features:

-   [ ] Custom subdomains
-   [ ] Scheduled publishing
-   [ ] Video memories
-   [ ] Collaborative creation
-   [ ] Anniversary reminders
-   [ ] Event collections
-   [ ] Creator marketplace
-   [ ] Corporate/event plans
-   [ ] Digital/physical card partnerships
-   [ ] Optional gift integrations

------------------------------------------------------------------------

# Security Requirements

These apply to every relevant phase.

## Browser

Never expose:

``` text
Supabase service-role key
Payment secret
Webhook secret
AI provider API key
Database password
```

## Database

Use Supabase RLS.

Users must only access records they are authorized to access.

Published public wishes should expose only intentionally public fields.

## Storage

-   Restrict MIME types
-   Restrict file size
-   Restrict upload count
-   Use unpredictable paths
-   Apply Storage RLS
-   Do not trust filenames
-   Consider metadata stripping

## API / Edge Functions

-   Validate every input
-   Do not trust client prices
-   Do not trust client payment state
-   Rate-limit public creation
-   Rate-limit AI generation
-   Validate uploads
-   Sanitize/escape user content
-   Prevent XSS
-   Return safe error messages

## Payments

-   Server/Edge Function order creation
-   Hosted/provider checkout
-   Server-side verification
-   Verified webhooks
-   Idempotency
-   Server-side entitlement state
-   No card storage

------------------------------------------------------------------------

# Lovable Workflow

Use Lovable primarily for:

-   Frontend implementation
-   UI refinement
-   User flows
-   Component extraction
-   Later Supabase CRUD integration

During the frontend-only phase, instruct Lovable not to introduce
backend dependencies.

# Antigravity Workflow

Use Antigravity for:

-   Repository inspection
-   Architecture enforcement
-   Refactoring
-   Test creation
-   Security review
-   Performance work
-   Bug fixing
-   Removing duplicated code

## Rule

Before a major change:

1.  Read `README.md`
2.  Read `PLAN.md`
3.  Read `PHASE.md`
4.  Inspect the current repository
5.  Implement only the current phase
6.  Test
7.  Update documentation if architecture changed
8.  Commit to GitHub

Do not let tools independently redesign the architecture.

------------------------------------------------------------------------

# Definition of Done

A phase is complete only when:

-   Functionality works
-   Mobile works
-   Error states work
-   Accessibility basics are checked
-   Security requirements for that phase are applied
-   No secrets are exposed
-   Database migrations are reproducible when a database exists
-   Existing features still work
-   Template logic is reusable
-   GitHub contains the working version
-   Documentation reflects the current architecture

Never start the next phase simply because the UI looks finished.
