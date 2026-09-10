# itsyourday.fun

A celebration platform for creating and sharing personalized digital
wishes and interactive experiences.

## Product Vision

`itsyourday.fun` starts as a lightweight, design-first platform for
birthday wishes and gradually expands into a broader celebration
platform supporting:

-   Birthday wishes
-   Anniversary wishes
-   Friendship and love
-   Congratulations
-   Festivals
-   Thank-you wishes
-   Interactive wish pages
-   Digital cards
-   Assisted creation
-   Custom-designed experiences
-   Premium templates
-   AI-assisted personalization
-   Optional digital/physical products later

The initial product should focus on the **digital celebration
experience**, not delivery, gifts, or a marketplace.

## Core Product Loop

The long-term core loop is:

**Discover Template → Personalize → Preview → Publish → Share →
Recipient Enjoys**

For the first public MVP, the priority is proving that people actually
create, share, and open the resulting experience.

## Architecture Strategy

The project deliberately separates:

1.  **Frontend** --- lightweight HTML, CSS, and JavaScript.
2.  **Backend** --- Supabase, introduced after the frontend experience
    is stable.
3.  **Payments** --- added later through secure server/Edge Function
    flows.
4.  **Template system** --- reusable renderer architecture so many
    visually different wishes do not become many duplicated websites.

The browser must never contain database secrets, payment secrets, AI
provider keys, or service-role credentials.

## Frontend Stack

Initial frontend:

-   HTML5
-   CSS3
-   Vanilla JavaScript
-   ES Modules
-   Responsive CSS
-   Web APIs where useful
-   GitHub

Avoid unnecessary framework dependencies during the frontend-only phase.

Do not add React, TypeScript, TanStack Query, Redux, Zustand, Axios,
Supabase SDK, or other libraries unless a later architectural decision
explicitly requires them.

## Backend Stack

Backend phase:

-   Supabase PostgreSQL
-   Supabase Storage
-   Supabase Row Level Security
-   Supabase Auth later
-   Supabase Edge Functions for trusted server-side operations

The frontend may use Supabase's browser-safe publishable/anon key only
when the backend phase begins. Secret/service-role credentials remain
server-side.

## Template Architecture

Templates are independent visual experiences built on a common data
contract.

Example wish data:

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

Use a generic renderer:

``` text
Public Wish URL
      ↓
Wish Data
      ↓
Template Resolver
      ↓
Template Renderer
      ↓
Selected Wish Experience
```

Do not create separate application infrastructure for every occasion.

A template should live conceptually like:

``` text
templates/
├── birthday/
│   ├── birthday-01/
│   │   ├── template.js
│   │   ├── template.css
│   │   └── preview.webp
│   └── birthday-02/
├── anniversary/
├── friendship/
├── love/
└── festivals/
```

The exact physical structure may evolve, but template rendering must
remain reusable and registry-based.

## Repository Structure

Initial frontend-oriented structure:

``` text
itsyourday.fun/
├── index.html
├── templates.html
├── occasions.html
├── create-custom.html
├── how-it-works.html
├── login.html
├── signup.html
│
├── wish/
│   └── index.html
│
├── admin/
│   └── index.html
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── css/
│   ├── global.css
│   ├── components.css
│   ├── home.css
│   ├── templates.css
│   ├── forms.css
│   └── wish/
│       ├── wish-base.css
│       └── template-specific.css
│
├── js/
│   ├── config.js
│   ├── home.js
│   ├── templates.js
│   ├── occasions.js
│   ├── create-custom.js
│   └── wish/
│       ├── wish-renderer.js
│       ├── template-registry.js
│       └── wish-preview.js
│
├── templates/
│   ├── birthday/
│   ├── anniversary/
│   ├── friendship/
│   ├── love/
│   └── festivals/
│
├── docs/
│
├── .env.example
├── .gitignore
├── README.md
├── PLAN.md
└── PHASE.md
```

`login.html`, `signup.html`, and `admin/` are structural placeholders
initially. Authentication and admin functionality are not part of the
frontend-only MVP.

## Development Tools

-   GitHub --- canonical source of truth
-   Lovable --- rapid frontend/product implementation
-   Antigravity --- repository inspection, refactoring, testing,
    security review, and engineering work

Do not allow Lovable and Antigravity to independently redesign the
architecture.

## Engineering Principles

1.  Keep the first release small.
2.  Separate presentation from template data.
3.  Do not duplicate template logic.
4.  Use generic concepts such as `event`, `wish`, and `template`.
5.  Build the frontend without backend coupling first.
6.  Add Supabase only when the frontend flow is stable.
7.  Never put secrets in browser code or Git.
8.  Never trust client-side payment status.
9.  Use server/Edge Functions for privileged operations.
10. Treat mobile responsiveness as a release requirement.
11. Prefer a few excellent templates over many mediocre templates.
12. Test the complete user journey, not just individual screens.

## Product Roadmap

See:

-   `PLAN.md` --- product, architecture, and business roadmap
-   `PHASE.md` --- execution checklist and phase acceptance criteria
