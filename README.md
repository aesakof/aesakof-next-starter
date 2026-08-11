# aesakof-next-starter

[INSERT DESCRIPTION HERE]

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Database | [Prisma 7](https://www.prisma.io/) + [Prisma Postgres](https://www.prisma.io/postgres) |
| Authentication | [Better Auth 1.5.6](https://www.better-auth.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Email | [Resend](https://resend.com/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Icons | [lucide-react](https://lucide.dev/) |
| Unit Testing | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| E2E Testing | [Playwright](https://playwright.dev/) |
| Deployment | [Vercel](https://vercel.com/) |
| CI/CD | [GitHub Actions](https://github.com/features/actions) |

## Features

### Authentication & User Management
- Email/password sign up and sign in
- Username support — users can sign in with either their email or username
- Email verification on sign up
- Password reset via email
- Change password from account settings
- Account deletion
- Route protection via `proxy.ts` — authenticated-only and guest-only routes handled automatically

### UI Components
Rather than relying on an external component library, this project ships with a set of custom-built components that are intentionally straightforward and easy to modify. There are no third-party abstractions to work around — just components you own and can change to fit your project.

| Component | Description |
|---|---|
| `Button` | Variants (primary, secondary, danger), sizes (sm, md, lg, xl), loading and disabled states |
| `Card` | Optional title, description, children, footer, and danger styling |
| `Modal` | Controlled open/close, Escape key and overlay click to dismiss |
| `NavBar` | Responsive navigation with hamburger menu for mobile |
| `UserMenu` | Dropdown menu with settings link and sign out |
| `Footer` | Simple site footer |
| `SideNav` | Link-based side navigation for settings-style layouts |
| `Table` | Composable primitives — `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` |

### Dark Mode
Light/dark mode with a theme switcher in settings. Implemented using `next-themes` with a `.dark` class on `<html>` and a semantic CSS custom properties system (`--background`, `--foreground`, `--surface`, `--surface-raised`, `--border`, `--text-primary`, etc.) defined in `globals.css`.

### Pages
- `/` — Home
- `/sign-in` — Sign in with email or username
- `/sign-up` — Create an account
- `/verify-email` — Email verification landing
- `/forgot-password` — Request a password reset
- `/reset-password` — Set a new password via reset token
- `/settings/account` — Change password and delete account
- `/settings/appearance` — Theme switcher
- `/dashboard` — Protected example page
- `/ui-samples` — Component showcase

### Testing
**Unit tests (Vitest)** cover UI components and custom hooks — `Button`, `Card`, `Modal`, and `useClickOutside`. Tests are in `__tests__/` and run with `npm test`.

**E2E tests (Playwright)** cover full auth flows — sign in with email, sign in with username, wrong password error, sign out, and access control for protected and guest-only routes. Tests run against a seeded test database via a dedicated API route and are configured for Chromium only for stability. Run with `npm run test:e2e`.

**CI** runs the Playwright suite on every push to `main` via GitHub Actions.

---

## Getting Started

### Prerequisites
- Node.js v22 LTS
- A [Prisma Postgres](https://www.prisma.io/postgres) account (for your database)
- A [Resend](https://resend.com/) account (for transactional email)
- A [Vercel](https://vercel.com/) account (for deployment)

### 1. Create a new repo from this template

On this repo's GitHub page, click **Use this template → Create a new repository**. This creates a fresh copy in your account without the original commit history.

Clone your new repo locally.

### 2. Install dependencies

```bash
npm install
```

### 3. Create your databases

Create three separate Prisma Postgres database instances — one for each environment:

- **Development** — used when running locally with `npm run dev`
- **Test** — used by Playwright E2E tests
- **Production** — used by your Vercel deployment

Keeping these separate ensures that test runs and local development never affect production data.

### 4. Set up environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```dotenv
DATABASE_URL=         # Your development Prisma Postgres connection string
DATABASE_URL_TEST=    # Your test Prisma Postgres connection string
BETTER_AUTH_SECRET=   # A random secret — generate one with: openssl rand -base64 32
BETTER_AUTH_URL=      # http://localhost:3000 for local dev
RESEND_API_KEY=       # Your Resend API key
RESEND_FROM_EMAIL=    # The email address to send from
```

### 5. Run migrations and generate the Prisma client

```bash
npx prisma migrate deploy
npx prisma generate
```

### 6. Start the development server

```bash
npm run dev
```

---

## Running Tests

### Unit tests

```bash
npm test
```

### E2E tests

Playwright tests require the dev server to be running and the test database to be configured via `DATABASE_URL_TEST` in your `.env`.

```bash
npm run test:e2e
```

---

## Deploying to Vercel

### 1. Create a new Vercel project

In the Vercel dashboard, click **Add Project** and import your GitHub repo. Next.js will be auto-detected — leave the build settings as-is.

### 2. Add environment variables

Add the following in the Vercel project's **Settings → Environment Variables** before deploying:

```dotenv
DATABASE_URL=         # Your production Prisma Postgres connection string
BETTER_AUTH_SECRET=   # A new secret, different from your local one
BETTER_AUTH_URL=      # Your Vercel deployment URL — e.g. https://your-app.vercel.app
RESEND_API_KEY=       # Your Resend API key
RESEND_FROM_EMAIL=    # The email address to send from
```

> **Note:** `DATABASE_URL_TEST` is not needed in Vercel.

> **Note:** You may not know your Vercel URL before the first deploy. Deploy once, copy the assigned URL, update `BETTER_AUTH_URL` to match it exactly (no trailing slash), then redeploy. Better Auth will reject requests with an `INVALID_ORIGIN` error if this doesn't match.

### 3. Deploy

Push to `main` — Vercel will build and deploy automatically. The build command (`prisma generate && prisma migrate deploy && next build`) will generate the Prisma client and apply any pending migrations to your production database on every deploy.