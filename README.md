# React Native Mentorship Program - Pre-Enrollment

A modern, responsive pre-enrollment platform for a React Native Mobile App Development Mentorship Program built with Next.js 16 and Convex.

## Features

- Multi-step enrollment form with 8 sections and progress indicator
- Student dashboard with syllabus/roadmap, activities, and progress tracking
- Admin panel for managing enrollments, syllabus, and activities
- Rich text editor (Lexical) for syllabus content
- Authentication via better-auth (email/password + Google OAuth)
- Real-time data with Convex backend
- Mobile-first responsive design

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, TypeScript
- **Backend**: Convex (real-time database + serverless functions)
- **Auth**: better-auth with @convex-dev/better-auth
- **Editor**: Lexical rich text editor
- **Icons**: lucide-react, react-icons

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up Convex

Run the Convex development server (this will prompt you to log in and create a project if needed):

```bash
npx convex dev
```

This will:
- Create a `.env.local` file with your Convex URL
- Sync your schema and functions to Convex
- Watch for changes

### 3. Configure environment variables

Ensure `.env.local` has the required variables:

```
CONVEX_DEPLOYMENT=dev:<your-deployment>
CONVEX_SITE_URL=https://<your-deployment>.convex.site
NEXT_PUBLIC_CONVEX_URL=https://<your-deployment>.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://<your-deployment>.convex.site
SITE_URL=http://localhost:3000
```

### 4. Run the development server

In a separate terminal:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── convex/
│   ├── schema.ts              # Database schema (5 tables)
│   ├── enrollments.ts         # Enrollment queries/mutations
│   ├── syllabus.ts            # Syllabus CRUD
│   ├── progress.ts            # Student progress tracking
│   ├── activities.ts          # Bi-weekly/monthly activities
│   ├── auth.ts                # Auth configuration
│   ├── auth.config.ts         # Auth providers
│   ├── convex.config.ts       # App definition with better-auth
│   ├── http.ts                # HTTP routes for auth
│   ├── migration.ts           # Data migration
│   └── _generated/            # Auto-generated Convex types
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page with hero & enrollment form
│   │   ├── layout.tsx         # Root layout with Convex provider
│   │   ├── globals.css        # Global styles & animations
│   │   ├── ConvexClientProvider.tsx
│   │   ├── asdf/page.tsx      # Enrollment admin view
│   │   ├── success/page.tsx   # Post-submission confirmation
│   │   ├── verify/page.tsx    # Enrollment verification
│   │   ├── syllabus/page.tsx  # Public syllabus/roadmap
│   │   ├── auth/signin/page.tsx
│   │   ├── dashboard/         # Student dashboard
│   │   ├── admin/             # Admin panel
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── Navbar.tsx, Hero.tsx, Footer.tsx, EnrollmentForm.tsx
│   │   ├── admin/             # Admin components
│   │   ├── dashboard/         # Dashboard components
│   │   └── editor/            # Lexical editor components
│   └── lib/
│       ├── auth-client.ts     # Better-auth client
│       └── auth-server.ts     # Server-side auth helpers
```

## Routes

### Public
- `/` - Landing page with enrollment form
- `/syllabus` - Public syllabus/roadmap
- `/verify` - Verify enrollment by Telegram/phone
- `/success` - Post-enrollment success page
- `/auth/signin` - Sign in page

### Student Dashboard (requires auth)
- `/dashboard` - Overview with progress
- `/dashboard/syllabus` - Full syllabus
- `/dashboard/syllabus/[slug]` - Lesson details
- `/dashboard/activities` - Bi-weekly/monthly activities
- `/dashboard/profile` - User profile

### Admin (requires admin email)
- `/admin` - Dashboard overview with stats
- `/admin/syllabus` - Manage syllabus (CRUD)
- `/admin/activities` - Manage activities (CRUD)
- `/admin/profile` - Admin profile

## Deployment

### Deploy Convex to Production

```bash
npx convex deploy
```

### Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_CONVEX_URL`
   - `NEXT_PUBLIC_CONVEX_SITE_URL`
   - `CONVEX_SITE_URL`
   - `SITE_URL`
4. Deploy
