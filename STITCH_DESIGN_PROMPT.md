# Google Stitch Design Prompt - React Native Mentorship Form UI/UX Redesign

## Project Overview
Redesign the entire UI/UX for a React Native & Full-stack Mentorship Program pre-enrollment website offered by **Yotech Digitals**. The program is a comprehensive **6-month mentorship** divided into **two semesters**:
- **1st Semester**: Frontend Development (3 months)
- **2nd Semester**: Backend Development (3 months)

The current implementation is built with Next.js 16, React 19, and Tailwind CSS 4. Transform it into a stunning, super aesthetic design inspired by modern design systems.

### About the Mentor
- **Mentor**: Yohannes Damtie - Full Stack Web and Mobile App Developer
- **Company**: Yotech Digitals
- **Google Play Developer Account**: https://play.google.com/store/apps/dev?id=6112063894787389964
- **Website**: www.yotech.space (visit to check recent products and student testimonials/feedback)

The design should reflect the professional expertise and credibility of Yotech Digitals while maintaining a modern, approachable aesthetic that appeals to aspiring developers.

## Design Inspiration Sources
Draw heavy inspiration from these platforms for component styles, animations, and overall aesthetic:
- **uiverse.io** - Creative CSS components, glassmorphism, neumorphism, unique button styles
- **seraui.com** - Modern, clean UI components with smooth interactions
- **shadcn.io** - Beautiful, accessible component library with elegant styling
- **21st.dev/community/components** - Cutting-edge component designs and patterns

## Current Structure to Redesign

### Pages/Sections to Redesign:
1. **Hero Section** (`src/components/Hero.tsx`)
   - Currently has floating 3D elements and phone mockup
   - Needs more dynamic, creative visual impact
   - Consider: animated gradients, particle effects, 3D transforms, glassmorphism cards

2. **Multi-step Enrollment Form** (`src/components/EnrollmentForm.tsx`)
   - 8-step form with progress indicator
   - Steps: Personal Info, Background, Goals, Focus, Commitment, Needs, App Idea, Payment
   - Needs: Creative step transitions, animated progress bar, beautiful form inputs

3. **Form Components** (`src/components/FormInputs.tsx`)
   - Input, Textarea, OptionButton, TagButton, ProgressBar
   - Needs: Modern input styles with focus states, creative selection buttons, animated tags

4. **Additional Components** (if they exist):
   - Navbar (`src/components/Navbar.tsx`)
   - Footer (`src/components/Footer.tsx`)
   - Mentor Section (`src/components/MentorSection.tsx`)
   - Success page (`src/app/success/page.tsx`)

## Design Requirements

### Color Palette & Theme
- Use a sophisticated, modern color scheme
- Consider: deep gradients, vibrant accents, soft pastels with high contrast
- Implement dark mode support or a striking dark theme
- Use gradient text, glassmorphism overlays, and subtle shadows

### Typography
- Modern, clean typography hierarchy
- Use gradient text for headings
- Excellent readability with proper spacing
- Consider: Inter, Geist, or similar modern fonts

### Component Styles to Implement

#### Buttons
- Gradient buttons with hover effects (inspired by uiverse.io)
- Glassmorphism buttons with backdrop blur
- Animated buttons with micro-interactions
- Glow effects on hover
- Smooth scale/transform transitions

#### Form Inputs
- Floating label inputs
- Inputs with animated borders on focus
- Glassmorphism input fields
- Smooth focus transitions
- Creative validation states

#### Cards & Containers
- Glassmorphism cards with backdrop blur
- Subtle border gradients
- Hover lift effects
- Animated shadows
- Gradient borders

#### Progress Indicators
- Animated progress bars with gradient fills
- Step indicators with creative styling
- Smooth transitions between steps
- Visual feedback for completed steps

#### Selection Components
- Creative option buttons with icons
- Animated tag selection with glow effects
- Smooth toggle states
- Visual feedback on selection

### Animations & Interactions
- Smooth page transitions
- Staggered animations for form steps
- Floating/pulsing elements
- Parallax effects
- Micro-interactions on hover/click
- Loading states with creative spinners
- Success animations with confetti or particles

### Layout & Spacing
- Generous whitespace
- Modern grid layouts
- Responsive design (mobile-first)
- Breakpoints: mobile, tablet, desktop
- Consistent spacing scale

## Specific Design Patterns to Consider

### From uiverse.io:
- Aurora gradient backgrounds
- Morphing blob shapes
- Creative button hover effects
- Glass cards with noise texture
- Animated borders

### From seraui.com:
- Clean, minimal aesthetic
- Smooth component transitions
- Elegant form designs
- Modern card layouts

### From shadcn.io:
- Consistent design tokens
- Accessible components
- Beautiful hover states
- Proper focus rings
- Elegant shadows

### From 21st.dev:
- Creative component patterns
- Unique layouts
- Modern animation techniques
- Interactive elements

## Technical Requirements

### Framework & Stack
- Keep Next.js 16, React 19, Tailwind CSS 4
- Use Tailwind CSS for all styling
- Implement custom animations in `src/app/globals.css`
- Use Lucide React icons (already installed)
- Maintain Convex backend integration

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Proper viewport handling

### Performance
- Optimize animations (use CSS transforms)
- Lazy load heavy elements if needed
- Smooth 60fps animations
- Efficient re-renders

## Deliverables

Create a comprehensive design system that includes:

1. **Color Palette** - Primary, secondary, accent colors with gradients
2. **Typography Scale** - Font sizes, weights, line heights
3. **Component Library** - Redesigned versions of all current components
4. **Animation System** - Keyframe animations, transitions, effects
5. **Layout Patterns** - Grid systems, spacing, responsive breakpoints
6. **Global Styles** - CSS variables, custom utilities, animations

## Form-Specific Enhancements

### Step 1 - Personal Info
- Beautiful input fields with floating labels
- Animated focus states
- Gradient borders on active inputs

### Step 2 - Background
- Creative selection buttons for technical level
- Animated tag selection for technologies
- Smooth conditional field reveal

### Step 3 - Goals
- Elegant option buttons with icons
- Gradient text for headings
- Smooth textarea focus effects

### Step 4 - Focus
- Icon-based selection cards with hover effects
- Glassmorphism card styling
- Animated selection states

### Step 5 - Commitment
- Grid-based option buttons
- Creative hover animations
- Visual hierarchy for options

### Step 6 - Needs
- Beautiful textarea with auto-expand
- Smooth focus transitions
- Elegant placeholder styling

### Step 7 - App Idea
- Creative option cards with icons
- Animated conditional fields
- Smooth transitions

### Step 8 - Payment
- Prominent payment info card with gradient
- Beautiful selection buttons
- Strong CTA for submission

### Navigation
- Animated back/next buttons
- Loading states with creative spinners
- Success animation on submission

## Hero Section Enhancements

- Dynamic gradient background with animation
- 3D floating elements with parallax
- Glassmorphism phone mockup
- Animated text gradients
- Creative CTA buttons with glow effects
- Floating badge/pill components
- Particle or mesh background effects

## Success Page

- Celebration animation (confetti, particles)
- Beautiful success message card
- Gradient text and icons
- Smooth entry animation
- Clear next steps

## Additional Notes

- Maintain all existing functionality
- Keep form validation logic intact
- Preserve Convex backend integration
- Ensure accessibility (ARIA labels, keyboard navigation)
- Test on multiple devices and screen sizes
- Optimize for performance
- Use CSS custom properties for theming

## Design Philosophy

Create a design that:
- Feels modern and cutting-edge
- Provides delightful micro-interactions
- Guides users through the form intuitively
- Creates visual hierarchy and clarity
- Evokes emotion and excitement
- Stands out from typical form designs
- Maintains professionalism while being creative

## Output Format

Generate:
1. Complete redesigned component files
2. Updated global CSS with animations
3. Design system documentation
4. Responsive implementation
5. All necessary Tailwind utility classes
6. Custom animation keyframes

Make the design truly exceptional - something that users will remember and want to interact with.
