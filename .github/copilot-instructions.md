# Copilot Instructions — Wedding Planning Website

## Build & Run

```bash
npm install          # install dependencies
npm run dev          # start dev server (Vite)
npm run build        # production build (tsc -b + vite build)
npm run lint         # ESLint
npx tsc --noEmit     # type-check only
```

No test framework is currently configured.

## Architecture

- **React + TypeScript + Vite** SPA with `react-router-dom` (HashRouter for static hosting)
- **No backend** — all data (budget, checklist, RSVP) persists in `localStorage`
- **Bilingual** — English + Traditional Chinese via `LanguageContext` and translation objects in `src/i18n/`
- **Styling** — CSS-in-JS via inline `styles` objects per component, plus global CSS variables injected from `src/styles/theme.ts` at app startup. No CSS modules or CSS framework.

### App Flow

1. **Splash** (`Splash.tsx`) — full-screen invitation letter, dismissed via state in `App.tsx`. Shows before anything else.
2. **Role select** (`RoleSelect.tsx`) — user picks "Guest" (no code) or "Wedding Crew" (requires code `2616`). Sets `RoleContext`.
3. **Main app** — `HashRouter` with `Navbar` + role-based routes:
   - **Guest routes**: Overview, RSVP, Schedule, Travel Guide, FAQ
   - **Crew routes**: all guest routes plus Budget, Checklist, Guests
4. **Access-gated sections** — Budget and Checklist have an additional `AccessCodeModal` with two tiers:
   - Code `516100`: groom/bride (full access)
   - Code `2616`: groomsmen/bridesmaid (read-only checklist)

### Contexts

- **`LanguageContext`** — provides `lang`, `t` (translations), `toggleLang()`. Access via `useLang()`.
- **`RoleContext`** — provides `role` (`'guest' | 'crew' | null`), `setRole()`, `isCrew`. Access via `useRole()`. Navbar uses `isCrew` to show/hide crew-only links.

### Data Layer

- `useLocalStorage<T>(key, initial)` hook in `src/hooks/` wraps `useState` + `localStorage`
- Default data for budget categories and checklist items live in `src/data/`
- localStorage keys: `wedding-budget`, `wedding-checklist`, `wedding-rsvp`, `wedding-lang`

## Conventions

- **Translation keys**: all user-visible strings come from `src/i18n/en.ts` (canonical type) and `src/i18n/zh-TW.ts`. Access via `useLang().t`. When adding UI text, add keys to **both** files.
- **Component style pattern**: each component defines a `const styles: Record<string, React.CSSProperties>` at bottom of file. Use `var(--color-*)` CSS variables from the theme for colors.
- **Global CSS classes**: `src/styles/theme.ts` exports a `cssVariables` string injected in `main.tsx`. It includes utility classes (`.card`, `.btn`, `.btn-primary`, `.form-group`, `.form-row`, etc.) alongside CSS variables. Add new global styles here, not in separate CSS files.
- **Theme colors**: light purple (`--color-primary-*`) and light yellow (`--color-secondary-*`). See `src/styles/theme.ts` for all tokens.
- **Images**: static images in `public/images/`. Reference as `/images/filename`.
- **Access codes are hardcoded** in `AccessCodeModal.tsx` and `RoleSelect.tsx` — not environment variables.

## Wedding Details Reference

- **Couple**: Heilam Wu (胡希琳) & Baoqi Huang (黃寶琪)
- **Date**: November 1, 2026
- **Venue**: Shicheng Forest Hot Spring Resort (石城森林溫泉度假酒店), Shicheng County, Ganzhou, Jiangxi, China
- **Dress code**: Earth tones (Earthy Brown, Pale Gold, Khaki, Sand)
