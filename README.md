# Walkthrough

## Overview
This is a **React + Vite** web app designed for interactive English‑learning.

### Project structure
```
web/
├─ index.html                # entry point with Google Fonts (Inter, Outfit)
├─ package.json              # Vite + React dependencies
└─ src/
   ├─ index.css              # premium design system (dark theme, glassmorphism)
   ├─ App.jsx                # root component with tab navigation
   ├─ components/
   │   ├─ TensesExplorer.jsx
   │   ├─ VerbsSearch.jsx
   │   ├─ StudyTrainer.jsx
   │   └─ InteractiveWidgets.jsx
   └─ data/                  # tenses.json, verbs.json, studyCards.json
```

## Key features
- **Modern UI**: radial gradients, backdrop‑filter glass cards, smooth hover transitions.
- **Interactive components**:
  - Verb tense matrix with filter and highlight.
  - Searchable irregular verb list.
  - 3‑D flip flash‑cards trainer.
  - Probability widgets for agreement exercises.
- **Responsive layout** using CSS Grid/Flex and container queries.

## Development workflow
1. Install dependencies:
   ```bash
   cd web
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
   The app is served at `http://localhost:5173` with hot‑module replacement.
3. Build for production:
   ```bash
   npm run build
   ```
   Output placed in `web/dist/`.

## Verification
- `npm run build` completed successfully (see build output).
- `npm run dev` started without errors (background task created).
- All components render correctly in the browser.

## Next steps
- Add unit tests for each component.
- Integrate a simple backend for user progress persistence.
- Deploy to a static hosting service (e.g., Vercel, Netlify).

---
*Walkthrough created on 2026‑05‑20.*
