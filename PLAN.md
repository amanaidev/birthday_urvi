# Product & Engineering Plan

## Product

**Product name:** itsyourday.fun

**Positioning:** A playful platform for creating and sharing
personalized digital wishes and celebration experiences.

## Vision

Start with a beautiful, lightweight birthday-wish experience and expand
into a broader celebration platform.

Long-term capabilities:

-   Interactive wish pages
-   Multiple wish templates
-   Personalized digital cards
-   Multiple occasions
-   Assisted creation
-   Custom-designed experiences
-   Premium templates
-   AI-assisted personalization
-   Optional digital/physical products

Potential occasions:

-   Birthday
-   Anniversary
-   Love
-   Friendship
-   Wedding
-   Graduation
-   Congratulations
-   New Baby
-   Festivals
-   Thank You
-   Good Luck
-   Get Well Soon
-   Just Because

Do not begin as a marketplace, delivery company, or gift-commerce
platform.

------------------------------------------------------------------------

# Architecture Direction

## Phase 1 Architecture

The first implementation is **frontend-only**.

### Frontend

-   HTML5
-   CSS3
-   Vanilla JavaScript
-   ES Modules
-   Responsive CSS
-   Web APIs where useful

No React is required for the initial frontend.

Do not add:

-   TypeScript
-   TanStack Query
-   Redux
-   Zustand
-   Axios
-   Supabase SDK
-   Backend frameworks

unless a later architectural decision explicitly justifies them.

### Why

The first version is primarily a visual, content-driven product. A
lightweight frontend makes the design and template system easier to
iterate and keeps the MVP dependency-light.

## Backend

Added in a separate phase:

-   Supabase PostgreSQL
-   Supabase Storage
-   Supabase RLS
-   Supabase Auth later
-   Supabase Edge Functions for privileged operations

## Payments

Added after product validation.

India-first candidate:

-   Razorpay

Payment operations requiring secrets or verification must run
server-side/inside Edge Functions.

Never unlock paid functionality solely from a browser payment-success
callback.

------------------------------------------------------------------------

# Template Architecture

Templates are the core product asset.

The system must support many visually different templates without
duplicating the entire application.

## Common Template Contract

Every template should be able to receive:

``` text
recipientName
senderName
message
occasion
templateId
photos
music
theme/config
```

Optional fields may be introduced later.

## Rendering Model

``` text
Wish URL
   ↓
Wish Data
   ↓
Template Resolver
   ↓
Template Registry
   ↓
Selected Template
   ↓
Template Renderer
```

A template can have a completely different visual design while using the
same underlying wish data.

Examples:

``` text
birthday-01 → colorful balloons + cake
birthday-02 → elegant floral card
birthday-03 → animated typography
birthday-04 → photo memory experience
birthday-05 → playful interactive experience
```

Avoid creating:

``` text
birthday-01.html
birthday-02.html
birthday-03.html
```

as separate application pages.

Use one wish-page shell and reusable template modules.

------------------------------------------------------------------------

# Phase 0 --- Foundation

## Objective

Create a clean repository and lock the frontend-first architecture.

### Deliverables

-   GitHub repository
-   Frontend project structure
-   Responsive base styles
-   Component conventions
-   Template registry convention
-   Mock data
-   README.md
-   PLAN.md
-   PHASE.md
-   `.env.example`
-   `.gitignore`

### Important

Do not introduce Supabase into the frontend-only implementation merely
because the eventual product will use it.

The frontend should work with local/mock data.

------------------------------------------------------------------------

# Phase 1 --- Frontend MVP

## Objective

Build a polished public website for discovering and previewing wishes.

### Homepage

Create the `itsyourday.fun` landing page with:

-   Navbar
-   Hero section
-   Template search
-   Trending occasions
-   Occasion category navigation
-   Featured templates
-   How It Works
-   Create Custom CTA
-   Footer

Visual direction:

-   Playful graphic aesthetic
-   White base
-   Pastel pink/blue/mint/peach accents
-   Rounded cards
-   Greeting-card illustrations
-   Strong dark-navy typography
-   Soft decorative shapes
-   Mobile-first responsiveness

### Template Catalogue

Route:

``` text
/templates
```

Features:

-   Search
-   Occasion filtering
-   Template cards
-   Featured templates
-   Responsive grid
-   Empty state

Use local mock data.

### Template Detail

Route:

``` text
/templates/:templateId
```

Show:

-   Template preview
-   Template name
-   Occasion
-   Description
-   Personalize button
-   Related templates

### Personalization Prototype

Allow:

-   Recipient name
-   Sender name
-   Custom message
-   Optional photo preview

Show a live preview using local browser state.

No database persistence yet.

### Public Wish Prototype

Route:

``` text
/wish/
```

The wish renderer should be capable of loading mock wish data and
resolving a template through the template registry.

The URL mechanism may be simulated locally during this phase.

### Create Custom

Route:

``` text
/create-custom
```

Frontend-only form:

-   Occasion
-   Recipient
-   Relationship
-   Requirements
-   Preferred style
-   Optional reference/upload UI

Submission should use a mock success state.

Do not send data to a server.

------------------------------------------------------------------------

# Phase 2 --- Backend Foundation

## Objective

Replace mock data with secure persistent storage without redesigning the
frontend.

### Supabase

Introduce:

-   PostgreSQL
-   Storage
-   RLS
-   Migration strategy

Core entities:

``` text
events
event_media
templates
occasions
custom_requests
```

Users/accounts are introduced later unless required by the chosen
creation flow.

### Event model

Use a generic event abstraction.

Minimum conceptual fields:

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

Do not create birthday-specific database infrastructure.

### Storage

Use Supabase Storage for user media.

Rules:

-   Validate MIME type
-   Limit file size
-   Limit number of files
-   Use safe/unpredictable object paths
-   Apply Storage RLS
-   Do not trust client filenames
-   Consider metadata stripping/image processing before public serving

### Public Wish

The backend should support:

``` text
Create → Save → Publish → Share → Open
```

Public pages should expose only intentionally public event data.

------------------------------------------------------------------------

# Phase 3 --- Birthday Product

## Objective

Turn the frontend prototype into the first real product.

### Initial birthday templates

Start with approximately 3--5 excellent templates.

Do not optimize for template count.

Each template should have:

-   Preview asset
-   Template metadata
-   Renderer
-   Styles
-   Mobile layout
-   Accessibility considerations

### Experience

Support:

-   Intro
-   Interaction
-   Reveal
-   Message
-   Photos
-   Celebration
-   Replay
-   Create-your-own CTA

### Sharing

Add:

-   Copy link
-   Web Share API
-   WhatsApp sharing
-   Social preview metadata

### Performance

Optimize:

-   Images
-   Lazy loading
-   Animation cost
-   Mobile network performance
-   Reduced-motion behavior

------------------------------------------------------------------------

# Phase 4 --- Accounts & Dashboard

## Objective

Create a persistent user product.

Add:

-   Supabase Auth
-   Email login
-   Google login if appropriate
-   User profile
-   Dashboard
-   My wishes/events
-   Edit
-   Duplicate
-   Delete
-   Archive
-   Preview
-   Share

Ownership relationships:

``` text
user
  ↓
events
  ↓
event_media
```

RLS must enforce ownership.

------------------------------------------------------------------------

# Phase 5 --- Assisted Creation & Custom Requests

## Assisted Creation

CTA:

**Create it for me ✨**

Collect:

-   Occasion
-   Recipient
-   Relationship
-   Desired emotion
-   Important memories
-   Preferred style

Initially use structured logic and existing templates rather than
requiring an AI API.

Generate an experience using an existing template.

## Custom Design

CTA:

**Request a Custom Design 🎨**

Collect:

-   Occasion
-   Recipient
-   Description
-   Desired style
-   Photos/videos
-   Reference links
-   Deadline
-   Optional budget

Store in:

``` text
custom_requests
```

Initial fulfillment can be manual.

This provides a potential service revenue stream before sophisticated
automation exists.

------------------------------------------------------------------------

# Phase 6 --- Monetization

Only introduce payments after the free product demonstrates real usage.

## Possible products

### Free

-   Basic templates
-   Limited media
-   Platform branding

### Premium

-   Premium templates
-   More media
-   Music
-   Advanced customization
-   No branding

### Custom Design

Manual, higher-priced service.

## Payment architecture

``` text
Browser
   ↓
Create checkout request
   ↓
Secure Edge Function
   ↓
Payment provider
   ↓
Webhook
   ↓
Verify signature
   ↓
Update payment state
   ↓
Unlock entitlement
```

Maintain:

``` text
orders
payments
entitlements
```

Never store card information.

Never trust:

-   Client-provided price
-   Client-provided payment status
-   Client-only success callbacks

------------------------------------------------------------------------

# Phase 7 --- Multiple Occasions

Replace birthday-only creation with:

**What are you celebrating?**

Support:

-   Birthday
-   Anniversary
-   Wedding
-   Graduation
-   Congratulations
-   New Baby
-   Festival
-   Thank You
-   Love
-   Friendship
-   Good Luck
-   Get Well Soon
-   Just Because

Templates should be associated with one or more occasions.

The renderer remains generic:

``` text
Event → Template → Renderer
```

------------------------------------------------------------------------

# Phase 8 --- Digital Card Maker

Allow users to create digital cards.

Flow:

``` text
Occasion
→ Card Template
→ Message
→ Photos
→ Customization
→ Export / Share
```

Output:

-   Shareable card
-   Image export
-   PDF export
-   Printable card later

------------------------------------------------------------------------

# Phase 9 --- AI Personalization

Feature:

**Write it for me**

Generate:

-   Wish-page message
-   Card message
-   WhatsApp message
-   Social caption

AI architecture:

``` text
Browser
   ↓
Secure Edge Function
   ↓
AI Provider
   ↓
Validated response
   ↓
Browser
```

Never expose provider API keys in browser code.

Implement:

-   Rate limiting
-   Usage tracking
-   Input constraints
-   Appropriate abuse controls

------------------------------------------------------------------------

# Phase 10 --- Template Platform

Turn templates into a scalable content system.

Metadata:

``` text
id
name
description
event_types
preview_url
version
status
created_by
pricing
```

Lifecycle:

``` text
Draft
 ↓
Review
 ↓
Published
 ↓
Deprecated
```

Later consider approved designer submissions and revenue sharing.

------------------------------------------------------------------------

# Phase 11 --- Advanced Celebration Platform

Only after validated demand consider:

-   Custom subdomains
-   Scheduled publishing
-   Video memories
-   Collaborative creation
-   Anniversary reminders
-   Event collections
-   Creator marketplace
-   Corporate/event plans
-   Digital/physical card partnerships
-   Optional gift integrations

Do not expand into delivery/gifting simply because those features are
technically possible.

------------------------------------------------------------------------

# Success Metrics

## Phase 1--3

Measure:

-   Template browsing
-   Template selection
-   Personalization completion
-   Preview completion
-   Publish rate
-   Share rate
-   Wish page open rate
-   Mobile performance

## Phase 5

Measure:

-   Assisted creation requests
-   Custom design requests
-   Request completion rate

## Phase 6

Measure:

-   Free → paid conversion
-   Revenue per event
-   Premium template usage
-   Refund rate

## Primary early metric

**Percentage of created experiences that are actually shared and
opened.**

This matters more than raw registrations or page views.
