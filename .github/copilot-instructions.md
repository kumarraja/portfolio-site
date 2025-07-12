# Copilot Instructions for Portfolio Site

## Architecture Overview

This is a **React Router v7** portfolio site with SSR, using a single-page component architecture pattern. The main portfolio content lives in `app/portfolio/portfolio.tsx` as a monolithic component with embedded data.

## Key Technologies & Patterns

### React Router v7 Structure

- **SSR enabled** by default (`react-router.config.ts`)
- Routes defined in `app/routes.ts` using the new `RouteConfig` API
- Type-safe route metadata with `+types/` convention (e.g., `+types/home.ts`)
- Root layout in `app/root.tsx` with `Layout` component pattern

### Animation System (React Spring)

- **Custom hook pattern**: `useScrollAnimation()` returns `{ref, spring}` object (NOT array)
- **Consistent animation structure**: All sections use `useScrollAnimation` + `useTrail` combo
- **Trail animations**: Each section animates list items with staggered delays
- **Hover animations**: Project cards use `useSpring` with `api.start()` for interactive states

### Component Architecture

- **Monolithic portfolio component**: All sections (Hero, About, Experience, Projects, Contact) in single file
- **Type-safe data**: Strong TypeScript interfaces for `PortfolioData`, `Project`, `Experience`, etc.
- **Responsive-first design**: Mobile-first CSS with progressive enhancement

## Development Workflows

### Essential Commands

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run typecheck    # TypeScript validation
npm run start        # Serve production build
```

### File Structure Rules

- `app/portfolio/` - Main portfolio component and assets
- `app/routes/` - Route components (currently just `home.tsx`)
- `app/+types/` - Auto-generated TypeScript route types
- `~/*` alias maps to `app/*` (configured in `tsconfig.json`)

## Project-Specific Conventions

### Responsive Design Pattern

- **Breakpoint progression**: `sm:` (640px) → `md:` (768px) → `lg:` (1024px) → `xl:` (1280px)
- **Typography scaling**: Always use responsive text sizes (e.g., `text-3xl sm:text-4xl lg:text-6xl`)
- **Mobile-first grids**: Start with `grid-cols-1` and scale up
- **Spacing consistency**: Use `py-16 sm:py-20` pattern for sections

### Animation Conventions

- **Scroll animations**: Always use `useScrollAnimation` hook with `{ref, spring}` destructuring
- **List animations**: Use `useTrail` with 200ms delay for staggered effects
- **Interactive hover**: Use `useSpring` with `api.start()` for hover states
- **Animation keys**: Use descriptive keys like `experience-${company}-${index}` (never just index)

### Data Management

- **Static data**: Portfolio content embedded in component (no external API)
- **Type safety**: All data must conform to TypeScript interfaces
- **Content updates**: Modify `portfolioData` object directly in `portfolio.tsx`

## Common Issues & Solutions

### TypeScript Errors

- **Animation hook destructuring**: Use `{ref, spring}` not `[ref, spring]`
- **React keys**: Never use array index alone - combine with unique identifiers
- **Route types**: Import from `./+types/routeName` for type safety

### Responsive Issues

- **Mobile navigation**: Hamburger menu with `useState` toggle pattern
- **Timeline layout**: Different structure for mobile vs desktop (mobile: left-aligned, desktop: alternating)
- **Touch targets**: Ensure minimum 44px touch targets on mobile

### Performance Optimization

- **Animation performance**: Use `transform` and `opacity` only for smooth 60fps
- **Bundle size**: Large component is intentional - avoid code splitting for this simple site
- **Image optimization**: Use appropriate formats and sizes for responsive images

## Integration Points

- **Tailwind CSS**: Custom theme in `app.css` with Inter font
- **Vite**: Configured with React Router plugin and TypeScript paths
- **Docker**: Production-ready Dockerfile for containerized deployment
- **External links**: LinkedIn, GitHub, email contact integration

When modifying this codebase:

1. Maintain the monolithic component structure
2. Follow the established animation patterns
3. Keep responsive design consistent
4. Update TypeScript interfaces when adding new data fields
5. Test on multiple breakpoints for responsive behavior
