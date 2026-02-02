## Project Summary
A personalized, interactive website for a couple featuring two distinct modes: "Modo Claro" (Cute & Romantic) and "Modo Escuro" (Hot & Seductive). The site includes a relationship counter, a random message generator, and a media gallery, all optimized for mobile (iPhone) with smooth animations.

## Tech Stack
- Framework: Next.js 15+ (App Router)
- Styling: Tailwind CSS
- Animations: Framer Motion
- Icons: Lucide React
- Language: TypeScript

## Architecture
- `src/app/page.tsx`: Main entry point handling theme state and layout.
- `src/components/`: Modular components for the counter, gallery, and message buttons.
- `src/hooks/`: Custom hooks for time calculation and mode persistence.

## User Preferences
- Romantic messages for Light Mode.
- Provocative messages for Dark Mode.
- Access code `6059` for Dark Mode.
- Start date for counter: 17/02/2023.
- Mobile-first design (iPhone optimization).

## Project Guidelines
- Use smooth transitions between light and dark modes.
- Implement floating animations (hearts/particles) based on the active mode.
- Ensure the gallery supports both images and videos.
- Follow a "Cute/Romantic" aesthetic for Light Mode and "Hot/Seductive" for Dark Mode.
- "texto Restrita" tab opens automatically on Feb 14th, 20:30, with a countdown before that.

## Common Patterns
- Time-locked content using `useEffect` and `setInterval` for countdowns.
- LocalStorage for persisting raffle results (one per day).
