# aesakof-next-starter

A full-stack boilerplate project, enabling quick start-up for new projects complete with authentication, theming, and database setup.

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
- Username support: users can sign in with either their email or username
- Email verification on sign up
- Password reset via email
- Change password from account settings
- Account deletion
- Route protection via `proxy.ts`: authenticated-only and guest-only routes handled automatically

### UI Components
Rather than relying on an external component library, this project ships with a set of custom-built components that are intentionally straightforward and easy to modify. There are no third-party abstractions to work around, just components you own and can change to fit your project.

All components are styled with the theme tokens in `globals.css` (see [Theming](#theming)), so changing a project's look means editing one file, not hunting through components. Each component is demonstrated on the `/ui-samples` page.

| Component | Description |
|---|---|
| `Button` | Variants (primary, secondary, danger), sizes (sm, md, lg, xl), loading and disabled states. The primary variant uses the `primary` tokens. |
| `LinkButton` | A Next.js link styled like a `Button`. Pass `external` to open in a new tab and show an external-link icon. |
| `Badge` | Small pill-shaped label with variants (such as primary and danger) and sizes (such as xs). |
| `Card` | Optional image, tags, title, description, children, footer, and danger styling. Accepts a `className`. Every prop is optional. |
| `ImageCarousel` | Image slider with previous/next buttons and dot indicators. |
| `Modal` | Controlled open/close, Escape key and overlay click to dismiss |
| `NavBar` | Responsive navigation with hamburger menu for mobile. The link for the current page is underlined and marked with `aria-current="page"`. |
| `ThemeToggle` | Light/dark toggle button. The icon swap is done with CSS only, which avoids hydration mismatches. |
| `UserMenu` | Dropdown menu with settings link and sign out |
| `Footer` | Simple site footer |
| `SideNav` | Link-based side navigation for settings-style layouts, with an active state |
| `Breadcrumbs` | Trail built from the current URL (for example `home / settings / account`). Every crumb links to its page, and the last one marks the current page. Hidden on the home page. Labels default to the raw lowercase URL segments; pass a `labels` prop (for example `{ projects: "Projects" }`) to rename them. Rendered in `layout.tsx` under the NavBar. |
| `Table` | Composable primitives: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` |

### Theming
Light/dark mode is implemented with `next-themes`, using a `.dark` class on `<html>` and a semantic CSS custom properties system defined in `globals.css`. Components never use raw colors for backgrounds, text, or borders. They use these tokens instead:

| Token | Used for |
|---|---|
| `background`, `foreground` | Page background and base text |
| `surface`, `surface-raised` | Panels and elevated areas (navbar, cards) |
| `border` | Borders and dividers |
| `text-primary`, `text-secondary`, `text-tertiary` | Text, from strongest to quietest |
| `primary`, `primary-foreground` | Main action color (primary buttons, badges, selected states) and the text that sits on it |
| `accent` | Subtle highlights, such as link text |
| `input-bg`, `input-border` | Form inputs |

**Two ways to change the theme**
- **Navbar toggle:** flips between light and dark instantly. It only uses `next-themes` (the choice lives in the browser's localStorage), so it works for signed-out visitors too.
- **Settings → Appearance:** offers Light, Dark, and System, and also saves the choice to the `UserPreferences` table. That saved value is only used to decide which option looks selected before the browser takes over. The theme people actually see always comes from localStorage (or the `ThemeProvider` default), so the database is a record of the last choice, not the source of truth.

**Colors that stay fixed on purpose:** danger/destructive red (`Button`, `LinkButton`, `Badge`, `Card` danger styling, the delete-account section), error and success message text, and the black scrim behind modals. These should not follow a project's palette.

### Pages
- `/`: Home
- `/sign-in`: Sign in with email or username
- `/sign-up`: Create an account
- `/verify-email`: Email verification landing
- `/forgot-password`: Request a password reset
- `/reset-password`: Set a new password via reset token
- `/settings`: Redirects to `/settings/account`
- `/settings/account`: Change password and delete account
- `/settings/appearance`: Theme switcher
- `/dashboard`: Protected example page
- `/ui-samples`: Component showcase
- Custom 404 page (`app/not-found.tsx`)

### Testing
**Unit tests (Vitest)** cover UI components and custom hooks: `Button`, `Card`, `Modal`, and `useClickOutside`. Tests are in `__tests__/` and run with `npm test`.

**E2E tests (Playwright)** cover full auth flows: sign in with email, sign in with username, wrong password error, sign out, and access control for protected and guest-only routes. Tests run against a seeded test database via a dedicated API route and are configured for Chromium only for stability. Run with `npm run test:e2e`.

**CI** runs the Playwright suite on every push to `main` via GitHub Actions.

### Project Structure

```
app/                  Pages and route-specific components (kept next to their page.tsx)
    generated/prisma/ Generated Prisma client (do not edit)
components/ui/        Reusable components
hooks/                Custom hooks (e.g. useClickOutside)
lib/                  auth.ts, auth-client.ts, prisma.ts, and actions/ (Server Actions)
prisma/               schema.prisma and migrations
__tests__/            Vitest unit tests
e2e/                  Playwright tests
proxy.ts              Route protection (the Next.js 16 name for middleware)
prisma.config.ts      Prisma config, including the database connection
```

---

## Getting Started

### Prerequisites
- Node.js v22 LTS (check with `node -v`)
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

Create three separate Prisma Postgres database instances, one for each environment:

- **Development**: used when running locally with `npm run dev`
- **Test**: used by Playwright E2E tests
- **Production**: used by your Vercel deployment

Keeping these separate ensures that test runs and local development never affect production data.

### 4. Set up environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```dotenv
DATABASE_URL=         # Your development Prisma Postgres connection string
DATABASE_URL_TEST=    # Your test Prisma Postgres connection string
BETTER_AUTH_SECRET=   # A random secret, generate one with: openssl rand -base64 32
BETTER_AUTH_URL=      # http://localhost:3000 for local dev
RESEND_API_KEY=       # Your Resend API key
RESEND_FROM_EMAIL=    # The email address to send from
```

### 5. Run migrations and generate the Prisma client

```bash
npx prisma migrate deploy
npx prisma generate
```

### 6. Install the Playwright browser (first time only)

```bash
npx playwright install chromium
```

### 7. Start the development server

```bash
npm run dev
```

### 8. Make it your own

Work through the [new project checklist](#new-project-checklist) below before building anything.

---

## New Project Checklist

- [ ] **Name the project:** update `name` in `package.json`, and replace the `[PROJECT LOGO HERE]` placeholder link in `components/ui/NavBar.tsx`
- [ ] **Colors:** edit the token values in `:root` and `.dark` in `app/globals.css`. Components pick them up automatically. Set `primary`/`primary-foreground` first, since buttons, badges, and selected states use them.
- [ ] **Fonts (optional):** body and mono fonts are loaded in `app/layout.tsx`. The `--font-sans`, `--font-heading`, and `--font-mono` variables in `globals.css` feed Tailwind's `font-sans`, `font-heading`, and `font-mono`. To give a project a separate heading font, load it in `layout.tsx` and point `--font-heading` at it.
- [ ] **Site metadata:** in `app/layout.tsx`, set the `siteName` and `description` (marked `TODO`). `metadataBase` is built from `BETTER_AUTH_URL`, so make sure that is set correctly in Vercel or social previews will point at localhost.
- [ ] **Open Graph image:** add a 1200x630 `opengraph-image.png` to `app/` and Next generates the tags for you. Add a copy named `twitter-image.png` if you want it on X cards too. After deploying, check the preview with a tool like opengraph.xyz. Slack, iMessage, and LinkedIn cache previews, so changes can take a while to show up.
- [ ] **Favicon:** replace `app/favicon.ico` (it must be RGBA, or it will error)
- [ ] **Footer:** replace the footer text and links
- [ ] **Breadcrumbs:** pass a `labels` map in `layout.tsx` if you want proper names instead of lowercase URL segments, and check that the row lines up with the NavBar and page content (see Gotchas). Remove the component from the layout if the project doesn't need it.
- [ ] **Home page:** replace the placeholder with the real home page
- [ ] **Environment variables:** create the three databases and fill in `.env` (see above), then add the production values in Vercel
- [ ] **Cleanup:** remove the `/ui-samples` route and its NavBar links before launching, if the project doesn't need a component showcase

---

## Command Reference

### npm scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) at http://localhost:3000 |
| `npm run build` | Generate the Prisma client, **apply pending migrations to the database in `DATABASE_URL`**, then build. This is what Vercel runs. |
| `npm start` | Serve the production build (after `build`) |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest in watch mode |
| `npm test -- --run` | Run Vitest once and exit |
| `npm run test:ui` | Open the Vitest UI |
| `npm run test:e2e` | Run the Playwright suite |
| `npm run test:e2e:ui` | Open Playwright's interactive UI mode |

> **Careful:** `npm run build` applies migrations. To check that everything compiles without touching any database, run `npx next build` instead.

### Prisma

| Command | What it does |
|---|---|
| `npx prisma migrate dev --name describe-change` | After editing `schema.prisma`: create a new migration and apply it to your development database |
| `npx prisma migrate deploy` | Apply existing migrations without creating new ones (what production uses) |
| `npx prisma generate` | Regenerate the Prisma client into `app/generated/prisma` (run after pulling schema changes or reinstalling) |
| `npx prisma studio` | Open a browser UI to view and edit the database |

### Before committing

```bash
npm run lint
npm test -- --run
npm run test:e2e
npx next build
```

---

## Running Tests

### Unit tests (Vitest)

```bash
npm test               # watch mode: re-runs as you save, press q to quit
npm test -- --run      # run once and exit
npm run test:ui        # browser-based UI
```

Run a single file by adding its path, or filter by test name:

```bash
npm test -- --run __tests__/Button.test.tsx
npm test -- --run -t "part of a test name"
```

### E2E tests (Playwright)

Playwright tests require the dev server to be running and the test database to be configured via `DATABASE_URL_TEST` in your `.env`.

```bash
npm run test:e2e
```

By default Playwright runs headless (no visible browser). To see what the tests are doing:

| Goal | Command |
|---|---|
| Watch it in a real browser window | `npm run test:e2e -- --headed --workers=1` |
| Step through one action at a time (opens the Inspector) | `npm run test:e2e -- --debug` |
| Interactive UI: click any step to see a snapshot of the page before and after | `npm run test:e2e:ui` |
| Record a replayable trace of every test | `npm run test:e2e -- --trace on` |
| Open the HTML report from the last run | `npx playwright show-report` |
| Open a saved trace | `npx playwright show-trace <path-to-trace.zip>` |

Run a single test file, or filter by test name:

```bash
npm run test:e2e -- e2e/auth.spec.ts
npm run test:e2e -- -g "wrong password"
```

Headed runs go by very fast. To slow them down enough to follow, add `slowMo` to `playwright.config.ts` temporarily (and remove it afterward, or CI will crawl):

```ts
use: {
    launchOptions: { slowMo: 500 },
},
```

To pause a test at a specific point so you can look around, add `await page.pause()` inside the test.

**If a test fails after a UI change:** it is more often a selector that needs updating (text, role, or class name) than a real bug. The error output shows the failing line.

---

## Deploying to Vercel

### 1. Create a new Vercel project

In the Vercel dashboard, click **Add Project** and import your GitHub repo. Next.js will be auto-detected, so leave the build settings as-is.

### 2. Add environment variables

Add the following in the Vercel project's **Settings → Environment Variables** before deploying:

```dotenv
DATABASE_URL=         # Your production Prisma Postgres connection string
BETTER_AUTH_SECRET=   # A new secret, different from your local one
BETTER_AUTH_URL=      # Your Vercel deployment URL, e.g. https://your-app.vercel.app
RESEND_API_KEY=       # Your Resend API key
RESEND_FROM_EMAIL=    # The email address to send from
```

> **Note:** `DATABASE_URL_TEST` is not needed in Vercel.

> **Note:** You may not know your Vercel URL before the first deploy. Deploy once, copy the assigned URL, update `BETTER_AUTH_URL` to match it exactly (no trailing slash), then redeploy. Better Auth will reject requests with an `INVALID_ORIGIN` error if this doesn't match.

### 3. Deploy

Push to `main` and Vercel will build and deploy automatically. The build command (`prisma generate && prisma migrate deploy && next build`) will generate the Prisma client and apply any pending migrations to your production database on every deploy.

---

## Gotchas

- `params` and `searchParams` are Promises in Next.js 16, so `await` them in pages and `generateMetadata`.
- `font-heading` only exists as a Tailwind utility if `--font-heading` is declared in the `@theme inline` block in `globals.css`.
- `app/favicon.ico` must be RGBA.
- Global CSS that shouldn't override Tailwind utilities belongs inside `@layer base`.
- Page containers inside a flex-column `<main>` need `w-full` alongside `max-w-*` and `mx-auto`, or they shrink to their content.
- `html` has `overflow-y: scroll` so pages with and without a scrollbar keep the same width. `scrollbar-gutter: stable` leaves a visible gap, so it is not used.
- The next-themes "script tag" console error under React 19 is harmless.
- Better Auth 1.6+ renamed `forgetPassword` to `requestPasswordReset` on the client.
- The GitHub Actions workflow runs on `ubuntu-24.04`, not `ubuntu-latest`. `ubuntu-latest` moved to Ubuntu 26.04, and Playwright 1.60.0 failed there with "Playwright does not support chromium on ubuntu26.04-x64". After upgrading `@playwright/test` to a release that supports Ubuntu 26.04 (check its release notes), you can switch back to `ubuntu-latest`.
- `Breadcrumbs` centers its row in a `max-w-7xl` container. The NavBar and pages in this boilerplate are full width by default, so on wide screens the breadcrumb row may not line up with the logo. Remove `mx-auto max-w-7xl` from the component if the project is full width, or add the same constraint to the NavBar and pages if it isn't.
