# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
npm test         # Run tests (Vitest)
npm test -- --run  # Run tests once without watch mode
```

## Architecture

This is a simple React To Do application built with Vite.

- `src/App.jsx` - Main component with all todo logic (add, toggle, delete)
- `src/App.css` - Component styles with CSS variables for theming
- `src/hooks/useTheme.js` - Theme hook with localStorage persistence
- `src/main.jsx` - React entry point, renders App in StrictMode
- `src/App.test.jsx` - Component tests
- `src/test/setup.js` - Vitest setup with jest-dom matchers
- `vite.config.js` - Vite config with React plugin
- `eslint.config.js` - ESLint flat config with React hooks rules

## Tech Stack

- React 19 with Vite 7
- Vitest with React Testing Library
- ESLint with react-hooks and react-refresh plugins
- No TypeScript (JavaScript with JSX)
