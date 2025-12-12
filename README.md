# React Native Mentorship Program - Pre-Enrollment

A modern, responsive pre-enrollment website for a React Native Mobile App Development Mentorship Program built with Next.js and Convex.

## Features

- Clean, minimal UI with soft colors and smooth animations
- Multi-step enrollment form with progress indicator
- Convex backend for secure data storage
- Mobile-first responsive design
- Success confirmation page

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Backend**: Convex (real-time database)
- **Styling**: Tailwind CSS with custom animations

## Getting Started

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

### 3. Run the development server

In a separate terminal:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── convex/
│   ├── schema.ts          # Database schema
│   ├── enrollments.ts     # Mutation functions
│   └── _generated/        # Auto-generated Convex types
├── src/app/
│   ├── page.tsx           # Main page with hero & form
│   ├── success/page.tsx   # Success confirmation page
│   ├── layout.tsx         # Root layout with Convex provider
│   ├── ConvexClientProvider.tsx
│   └── globals.css        # Global styles & animations
```

## Form Sections

1. **Personal Information** - Name, email, Telegram, phone
2. **Background & Experience** - Technical level, technologies used
3. **Goals & Intentions** - Expectations, motivations
4. **Mentorship Focus** - Business/Technical/General
5. **Commitment** - Weekly hours, learning style
6. **Student Needs** - Challenges, mentor expectations
7. **App Idea** - Optional project idea
8. **Payment** - Deposit payment method

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variable: `NEXT_PUBLIC_CONVEX_URL`
4. Deploy

### Deploy Convex to Production

```bash
npx convex deploy
```
