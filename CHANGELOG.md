# Changelog

### v1.9.0 [2026-01-14]

Improved UI component styling with explicit dark mode support and added billing and payment features for project mode.

#### Added
- Added billing page with subscription management and transaction history
- Added test payment page for payment integration testing
- Added payment actions and utilities for processing transactions
- Added `PaymentButton` component for initiating payment flows
- Added `Alert`, `AlertTitle`, and `AlertDescription` components for displaying alert messages

#### Changed
- Updated `Button` component variants with explicit colors (`purple-600`, `red-600`) instead of CSS variables for improved dark mode support
- Enhanced `Button` component focus ring styling with explicit colors and proper dark mode offsets
- Updated `DropdownMenu` component with explicit border colors for better visibility
- Updated `Select` component with explicit styling for triggers and menu items
- Updated `Select` content z-index to `z-[9999]` for proper layering
- Updated header navigation breakpoints from `sm:` to `md:` for better responsive behavior
- Updated dashboard billing button to link to `/billing` page instead of being disabled
- Improved responsive styling in header with hidden and inline-flex visibility changes

#### Fixed
- Removed "Forgot password?" link from login form (now commented out)

#### Removed
- Removed usage of CSS variable references (`bg-primary`, `text-primary-foreground`, etc.) in favor of explicit color values

### v1.8.0 [2025-12-07]

Enhanced user experience with personalized dashboard greetings and improved authentication for end-user projects.

#### Added
- Added `full_name` and `project_id` fields to `UserWithRole` interface for better user identification and project tracking
- Added `full_name` field to `RegistrationResponse` interface to support personalized authentication responses

#### Changed
- Updated dashboard welcome message to display personalized greeting with user's full name when available
- Enhanced `backendLoginAction()` to include `X-Project-ID` header for project mode end-user authentication
- Updated `hydrateDeploymentMode()` integration in `backendLoginAction()` to extract project-specific headers
- Modified `getCurrentUser()` to extract and return `full_name` and `project_id` from authentication responses
- Restricted `DevkitDoctor` component visibility to project mode deployments only
- Cleaned up trailing whitespace in multiple component files

#### Removed
- Removed `autoprefixer` dependency from production dependencies
- Removed `@tailwindcss/postcss` dependency from development dependencies
- Removed `typescript` and `vercel` dependencies from development dependencies

### v1.7.0 [2025-11-26]

Added UI component primitives for alert dialogs, select dropdowns, and textarea inputs to expand component library.

#### Added
- Added `AlertDialog` component wrapper based on Radix UI `@radix-ui/react-alert-dialog` primitive
- Added `Select` component with trigger, scrolling, and value management based on Radix UI `@radix-ui/react-select` primitive
- Added `Textarea` component for multi-line text input with consistent styling
- Added `@radix-ui/react-alert-dialog` and `@radix-ui/react-select` dependencies

### v1.6.0 [2025-11-24]

Implemented unified registration flow supporting both developer and end-user roles with JWT token-based authentication.

#### Added
- Added support for end-user registration through the project mode registration flow
- Added JWT access and refresh tokens to registration response for immediate user authentication
- Added `dotenv-cli` development dependency for environment variable management
- Added role-specific registration logic to handle separate developer and end-user flows

#### Changed
- Simplified registration link routing to use consolidated `/register` endpoint for all deployment modes
- Updated `backendRegisterAction()` to dynamically set authentication headers based on user role
- Modified registration response handling to store JWT tokens in secure httpOnly cookies for both user roles
- Refactored developer-specific provisioning bundle logic to handle conditionally based on user role
- Improved developer-specific provisioning flow with separate success redirect
- Updated error messages for improved clarity and user feedback
- Refactored provisioning store deserialization error handling to reduce unnecessary logging
- Updated user authentication requirements in `requireAuth()` to remove email verification check

#### Removed
- Deleted deprecated `app/(main)/register/page.tsx` in favor of unified registration endpoint
- Removed email verification redirect logic from `requireAuth()` function

### v1.5.0 [2025-11-23]

Simplified dashboard page and streamlined environment configuration documentation.

#### Changed
- Simplified `.env.example` with clearer environment variable documentation
- Simplified dashboard layout by removing stats grid displaying project count and API key count for developers

#### Removed
- Removed imports for `fetchProjects()` and `fetchProjectApiKeys()` server actions from dashboard page
- Removed project count and API key count display widgets from dashboard

### v1.4.0 [2025-11-22]

Improved user experience with tooltip component support and enhanced login flow with automatic role-based redirects.

**Based on `devkit4ai/user-app/v1.4.0` and `devkit4ai/backend-api/v1.2.0` releases**

#### Added
- Added `Tooltip`, `TooltipTrigger`, `TooltipContent`, and `TooltipProvider` components based on Radix UI primitives
- Added `@radix-ui/react-tooltip` dependency for tooltip functionality
- Added automatic redirect logic on login page for already authenticated users with role-based destination routing

#### Changed
- Refactored `quick-start.tsx` component with improved code formatting and readability
- Updated login page to check authentication status and redirect authenticated users to appropriate dashboards

#### Fixed
- Fixed code formatting inconsistencies in `quick-start.tsx` component

### v1.3.0 [2025-11-20]

Improved theme switcher UI/UX and enhanced dropdown menu styling for better accessibility and visual consistency.

**Based on `devkit4ai/user-app/v1.3.0` and `devkit4ai/backend-api/v1.2.0` releases**

#### Changed
- Updated theme switcher trigger to use inline button styles instead of `Button` component for consistent theming
- Added dropdown menu open state management to automatically close menu after theme selection
- Enhanced dropdown menu styling with explicit color definitions for better dark mode support
- Updated dropdown menu submenus to use explicit gray colors instead of semantic tokens
- Changed cursor style from `cursor-default` to `cursor-pointer` for interactive dropdown items
- Updated radio item indicator to use CSS circle instead of Lucide icon for simplicity
- Improved dropdown menu z-index to `z-[9999]` for better layering in complex layouts
- Adjusted dropdown menu spacing and sizing for better visual hierarchy
- Extended JWT token expiration from 15 to 30 minutes for improved user experience

#### Removed
- Removed unused `Circle` icon import from `components/ui/dropdown-menu.tsx`
- Removed unnecessary `Button` import from `components/theme-switcher.tsx`

### v1.2.0 [2025-11-19]

Restructured application layout to support new main content area with improved component organization.

#### Changed
- Refactored root layout structure by removing conditional Header and Footer rendering for console pages
- Updated root layout to render main content directly without conditional wrapper logic
- Simplified layout component by removing `isCurrentRoute()` dependency and server utility imports
- Updated `Makefile` verify target to clean `.next` build directory before and after verification
- Added success message to verify target for confirmation of completed setup verification

#### Removed
- Deleted legacy authentication layout structure in `app/(auth)/` directory
- Removed authentication-related pages: `login/page.tsx`, `login/login-form.tsx`, `register/page.tsx`
- Deleted example pages directory structure: `app/example-pages/` and all contained pages
- Removed dashboard and checklist pages: `app/dashboard/page.tsx`, `app/checklist/page.tsx`, `app/error/page.tsx`
- Removed root home page in favor of new main layout structure
- Removed conditional header and footer rendering logic from root layout
- Deleted `lib/server-utils.ts` module containing deprecated `getCurrentPathname()` and `isCurrentRoute()` functions
- These functions were superseded by direct Next.js header handling in server components

### v1.0.0 [2025-11-17]

#### Changed
- Refactored header component to use centralized app configuration instead of deployment mode context, simplifying header link management
- Updated app configuration to integrate with deployment mode system via `hydrateDeploymentMode()` from `lib/deployment-mode.ts`
- Renamed `ModeConfig.mode` to `ModeConfig.currentMode` for clarity in configuration types
- Removed mode-specific header and title logic from app configuration, now using static project mode defaults
- Updated configuration structure to separate static values from deployment mode configuration
- Enhanced configuration documentation with detailed interface definitions and usage examples

#### Removed
- Removed `config/mode.config.ts` module, consolidating mode configuration into deployment mode system
- Removed `useDeploymentMode()` hook usage from header component
- Removed `getModeSpecificLinks()` and `getModeSpecificTitle()` helper functions from app configuration
