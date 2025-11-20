# Changelog

## 3 (2025-11-20)

Improved theme switcher UI/UX and enhanced dropdown menu styling for better accessibility and visual consistency.

### Changed
- Updated theme switcher trigger to use inline button styles instead of `Button` component for consistent theming
- Added dropdown menu open state management to automatically close menu after theme selection
- Enhanced dropdown menu styling with explicit color definitions for better dark mode support
- Updated dropdown menu submenus to use explicit gray colors instead of semantic tokens
- Changed cursor style from `cursor-default` to `cursor-pointer` for interactive dropdown items
- Updated radio item indicator to use CSS circle instead of Lucide icon for simplicity
- Improved dropdown menu z-index to `z-[9999]` for better layering in complex layouts
- Adjusted dropdown menu spacing and sizing for better visual hierarchy
- Extended JWT token expiration from 15 to 30 minutes for improved user experience

### Removed
- Removed unused `Circle` icon import from `components/ui/dropdown-menu.tsx`
- Removed unnecessary `Button` import from `components/theme-switcher.tsx`

## 2 (2025-11-19)

Restructured application layout to support new main content area with improved component organization.

### Changed
- Refactored root layout structure by removing conditional Header and Footer rendering for console pages
- Updated root layout to render main content directly without conditional wrapper logic
- Simplified layout component by removing `isCurrentRoute()` dependency and server utility imports
- Updated `Makefile` verify target to clean `.next` build directory before and after verification
- Added success message to verify target for confirmation of completed setup verification

### Removed
- Deleted legacy authentication layout structure in `app/(auth)/` directory
- Removed authentication-related pages: `login/page.tsx`, `login/login-form.tsx`, `register/page.tsx`
- Deleted example pages directory structure: `app/example-pages/` and all contained pages
- Removed dashboard and checklist pages: `app/dashboard/page.tsx`, `app/checklist/page.tsx`, `app/error/page.tsx`
- Removed root home page in favor of new main layout structure
- Removed conditional header and footer rendering logic from root layout
- Deleted `lib/server-utils.ts` module containing deprecated `getCurrentPathname()` and `isCurrentRoute()` functions
- These functions were superseded by direct Next.js header handling in server components

## 1 (2025-11-17)

### Changed
- Refactored header component to use centralized app configuration instead of deployment mode context, simplifying header link management
- Updated app configuration to integrate with deployment mode system via `hydrateDeploymentMode()` from `lib/deployment-mode.ts`
- Renamed `ModeConfig.mode` to `ModeConfig.currentMode` for clarity in configuration types
- Removed mode-specific header and title logic from app configuration, now using static project mode defaults
- Updated configuration structure to separate static values from deployment mode configuration
- Enhanced configuration documentation with detailed interface definitions and usage examples

### Removed
- Removed `config/mode.config.ts` module, consolidating mode configuration into deployment mode system
- Removed `useDeploymentMode()` hook usage from header component
- Removed `getModeSpecificLinks()` and `getModeSpecificTitle()` helper functions from app configuration
