# Starter Kit: Next.js Project Template SPECS.md

## Service Overview

Open-source Next.js 15.5.6 frontend template for building AI-powered end-user applications. Operates exclusively in project deployment mode, pre-configured for connection to Dev Kit for AI Cloud API. Provides authentication, example pages, and AI integration patterns for developers to clone and customize.

**Core Technologies:**
- Next.js 15.5.6 with App Router and Turbopack
- React 19.1.0 (Server Components, Server Actions)
- TypeScript 5 (strict mode, ES2017 target)
- Tailwind CSS 3.4.18 with dark mode
- Radix UI component primitives
- next-themes 0.4.6 for theme management
- lucide-react 0.510.0 for icons
- Vercel Analytics 1.5.0 and Speed Insights 1.2.0

## Deployment Configuration

Starter Kit operates exclusively in project mode, pre-configured to connect to Cloud API with placeholder credentials that developers replace with their own.

### Environment Variables

**Required:**
- `DEVKIT4AI_MODE`: Always "project"
- `NEXT_PUBLIC_API_URL`: Cloud API base URL (default: https://api.vibecoding.ad)
- `DEVKIT4AI_DEVELOPER_KEY`: Developer key obtained from Cloud Admin
- `DEVKIT4AI_PROJECT_ID`: Project UUID from Cloud Admin
- `DEVKIT4AI_PROJECT_KEY`: Project API key from Cloud Admin

**Optional:**
- `ENVIRONMENT`: Deployment environment identifier (default: local)

### Mode Validation

**Implementation:** lib/deployment-mode.ts
- `hydrateDeploymentMode()`: React-cached function validates environment configuration
- Returns `DeploymentModeConfig` with mode, backendApiUrl, secrets, headers, issues, isReady
- Validates project ID as valid UUID format
- Validates backend URL as valid URL with protocol
- Issues array contains error/warning objects with severity and message
- `isReady` flag is false when error-level issues exist

**Backend Request Headers:**
- `X-User-Role`: "end_user" (fixed for project mode)
- `X-Developer-Key`: From DEVKIT4AI_DEVELOPER_KEY
- `X-Project-ID`: From DEVKIT4AI_PROJECT_ID (validated as UUID)
- `X-API-Key`: From DEVKIT4AI_PROJECT_KEY

**Configuration Display:**
- Amber banner at top of root layout when issues exist
- Error-level issues shown in red text
- Warning-level issues shown in amber text
- Banner rendered in app/layout.tsx when deploymentConfig.issues.length > 0

## Authentication System

JWT-based authentication via Cloud API with end_user role enforcement. All authentication flows target Cloud API endpoints with project-scoped access.

### Server-Side Authentication

**Implementation:** lib/auth-server.ts

**Token Storage:**
- JWT access tokens in httpOnly cookie `devkit4ai-token` (15 minute expiry)
- Refresh tokens in httpOnly cookie `devkit4ai-refresh-token` (7 day expiry)
- Cookies use secure flag in production, sameSite=lax, path=/

**Core Functions:**
- `getCurrentUser()`: React-cached function fetches user from Cloud API `/api/v1/auth/me`, returns UserWithRole or null, validates response structure and role values, includes 10 second timeout protection via AbortController
- `requireAuth()`: Enforces authentication, redirects to `/login?returnUrl=<path>` if unauthenticated, redirects to `/verify-email` if account not activated
- `requireRole(allowedRoles)`: Enforces role-based access, redirects to login if unauthenticated, redirects to /dashboard if unauthorized
- `getCurrentPath()`: Extracts current path from request headers (x-invoke-path, x-pathname, x-url, referer) for return URL functionality

**User Data Structure:** lib/types/auth.ts
- `UserWithRole`: id, email, role ('platform_operator' | 'developer' | 'end_user'), is_active, created_at

### Client-Side Authentication

**Implementation:** lib/auth-context.tsx

**Context Providers:**
- `DeploymentModeProvider`: Wraps app with deployment configuration from hydrateDeploymentMode()
- `AuthProvider`: Wraps app with user data from getCurrentUser(), receives user prop from server

**Hooks:**
- `useDeploymentMode()`: Returns full deployment config
- `useDeploymentIssues()`: Returns configuration issues array
- `useRegistrationHeaders()`: Returns headers for backend API calls
- `useDeploymentReadiness()`: Returns boolean isReady status
- `useAuth()`: Returns user and isLoading (always false after hydration)
- `useCurrentUser()`: Returns user or null
- `useIsAuthenticated()`: Returns boolean authentication status
- `useRequireRole(allowedRoles)`: Returns user if authorized, null otherwise (no redirect)
- `useHasRole(allowedRoles)`: Returns boolean role check

### Server Actions

**Implementation:** app/actions.ts

**Login:**
- `backendLoginAction(formData)`: Universal login via Cloud API `/api/v1/auth/login`, stores JWT tokens in cookies, fetches user from `/api/v1/auth/me`, redirects based on role (operator→/portal, developer→/console, end_user→/dashboard), handles returnUrl with sanitization via sanitizeReturnUrl(), includes 10 second timeout protection

**Sign Out:**
- `signOutAction()`: Clears JWT cookies and redirects to /login

**Registration:**
- `backendRegisterAction(formData)`: Developer registration (not used in starter kit but present for compatibility)

**Helper Functions:**
- `storeTokensInCookies(tokens)`: Stores access and refresh tokens in httpOnly cookies
- `clearTokensFromCookies()`: Deletes JWT cookies

### Return URL Handling

**Implementation:** lib/return-url.ts

**Security Function:**
- `sanitizeReturnUrl(value)`: Validates return URLs to prevent open redirect vulnerabilities, only allows same-origin relative paths starting with single forward slash, rejects double-slash prefixes, control characters, overly long values (>2048 chars), URL-decodes input with fallback to raw value on error, returns sanitized path or null if invalid

### Provisioning Store

**Implementation:** lib/provisioning-store.ts

**Purpose:**
- Stores developer provisioning credentials (project_id, developer_key, api_key) after registration
- Uses httpOnly cookie `devkit4ai-provisioning` with 24 hour TTL
- Not actively used in starter kit (registration flow disabled) but present for compatibility

**Functions:**
- `storeProvisioningBundle(bundle)`: Validates and stores bundle in httpOnly cookie
- `getProvisioningBundle()`: Reads and returns bundle
- `consumeProvisioningBundle()`: Reads and deletes cookie (one-time visibility)
- `clearProvisioningBundle()`: Deletes cookie
- `shouldUseSecureCookies()`: Detects HTTPS from headers
- Development logging for debugging

## Routing & Pages

### App Router Structure

**Root Pages:**
- `/` (app/page.tsx): Marketing homepage with LocalOnboardingHero, LocalSetupGuide, FeaturePreview, QuickStart, DemoShowcase, TechStack, PricingModel sections
- `/start` (app/start/page.tsx): Interactive setup guide with progress tracking, command copying, configuration cards, quick action links
- `/checklist` (app/checklist/page.tsx): Customization checklist with feature showcase and project info sidebar
- `/error` (app/error/page.tsx): Generic error page

**Authentication Pages:**
- `/login` (app/(auth)/login/page.tsx): Universal login form with LoginForm component, displays error/message from query params, handles returnUrl with sanitization
- `/register` (app/register/page.tsx): Redirects to /register/developer
- `/register/developer` (app/(auth)/register/developer/page.tsx): Developer registration page (redirects to login in project mode)
- `/register/developer/success` (app/(auth)/register/developer/success/page.tsx): Provisioning credentials display (not used in project mode)

**Dashboard Pages:**
- `/dashboard` (app/dashboard/page.tsx): Protected page requiring authentication via requireAuth(), displays user info with role-based sections (Platform Operator Panel, Developer Console, My Account), shows stats for developers, sign out button

**Console Pages:**
- Layout (app/console/layout.tsx): Enforces console/operator mode and developer role, redirects project mode to /dashboard
- `/console` (app/console/page.tsx): Console dashboard (redirects project mode users to /dashboard)
- `/console/projects` (app/console/projects/page.tsx): Projects list (redirects project mode users to /dashboard)
- `/console/projects/[projectId]` (app/console/projects/[projectId]/page.tsx): Project detail (redirects project mode users to /dashboard)

**Example Pages:**
- `/example-pages` (app/example-pages/page.tsx): Component showcase hub with categorized navigation
- `/example-pages/landing-pages/*`: Landing page variants (AI SaaS, Developer Tool, Assistant, Analytics, Content, Enterprise)
- `/example-pages/use-cases/*`: AI use case examples
- `/example-pages/components/*`: UI component library showcase
- `/example-pages/topic-specific-pages/*`: Additional example pages

### Middleware

**Implementation:** middleware.ts

Runs on all routes except static assets:
- Sets `x-pathname` request header with current path and search params
- Does NOT perform authentication or redirects
- Pages control their own protection via requireAuth() or requireRole()
- Matcher excludes `_next/static`, `_next/image`, `favicon.ico`, static assets (svg, png, jpg, jpeg, gif, webp)

## Component Architecture

### Component Organization

**components/ui/**: Radix UI-based primitives
- avatar.tsx, badge.tsx, button.tsx, card.tsx, checkbox.tsx, dropdown-menu.tsx, input.tsx, label.tsx, separator.tsx, sheet.tsx, skeleton.tsx, table.tsx, tabs.tsx
- Built with Radix UI and class-variance-authority for variants
- Styled with Tailwind utility classes
- Export via named exports with forwardRef where needed

**components/generic/**: Reusable cross-project components
- category-grid.tsx, code-block.tsx, cta-button.tsx, floating-nav.tsx, info-box.tsx, page-header.tsx, scroll-indicator.tsx, theme-toggle.tsx, toc.tsx
- Domain-agnostic, designed for portability
- Accept props for customization

**components/project/**: Project-specific components
- header.tsx: Mode-aware navigation with mobile menu, theme switcher, CTA button, uses useDeploymentMode() hook, getModeSpecificLinks() function returns project mode links by default
- footer.tsx: Company info, link sections from app.config.ts, copyright

**components/starter/**: Homepage marketing sections
- local-onboarding-hero.tsx, local-setup-guide.tsx, feature-preview.tsx, quick-start.tsx, demo-showcase.tsx, pricing-model.tsx, tech-stack.tsx, built-in-features.tsx, starter-hero.tsx
- Compose homepage sections

**components/auth/**: Authentication components
- confirmation-actions.tsx: Post-registration action buttons

**components/devkit/**: Development tooling
- devkit-doctor/: Diagnostic panel shown when NODE_ENV=development or NEXT_PUBLIC_DEMO_MODE=true
- devkit-landing/: Landing page components

**Shared Components:**
- components/form-message.tsx: Form validation message display with icon
- components/submit-button.tsx: Form submit button with loading state using Loader2 icon
- components/theme-switcher.tsx: Theme toggle using next-themes

### Console Components

**Note:** Console components exist for compatibility but redirect project mode users to /dashboard.

**app/console/console-header.tsx**: Console header with user menu
**app/console/console-sidebar.tsx**: Sidebar navigation
**app/console/stats-card.tsx**: Stat display card with icon, title, value, description
**app/console/quick-actions.tsx**: Quick action buttons section
**app/console/getting-started.tsx**: Getting started guide

### Component Registry

**Implementation:** lib/component-registry.ts

Defines categorized component inventory for example pages:
- Landing Page Variants: AI SaaS Product, AI Developer Tool, AI Assistant Platform, AI-Powered Analytics, AI Content Generator, SaaS Enterprise Solution
- UI Components: Base, Generic, Project categories
- Authentication Components: Login Form, Registration Form
- Layout Components: Dashboard Layout, App Shell

Used for component showcase navigation in /example-pages.

## Console Feature

Developer workspace components exist for compatibility but are not accessible in project mode. Console layout redirects project mode users to /dashboard.

### Console Server Actions

**Implementation:** app/console/actions.ts

**fetchProjects():**
- Retrieves JWT token from cookie `devkit4ai-token`
- Gets backend URL from hydrateDeploymentMode()
- GET request to Cloud API `/api/v1/projects` with Authorization header and X-User-Role: developer
- 10 second timeout protection via AbortController
- Returns array of Project objects or empty array on error
- Validates response is array before returning

**fetchProjectApiKeys(projectId):**
- Similar pattern to fetchProjects
- GET request to Cloud API `/api/v1/projects/${projectId}/api-keys`
- Returns array of ApiKey objects (id, key_prefix, name, created_at, last_used_at)

**Project Type:**
- id: string (UUID)
- name: string
- description: string | null
- is_active: boolean
- created_at: string (ISO 8601)
- updated_at: string | null

## State Management

### React Context Providers

**DeploymentModeProvider (lib/auth-context.tsx):**
- Client component wrapping entire app in root layout
- Receives deployment config from server-side hydrateDeploymentMode()
- Provides mode, backendApiUrl, secrets, headers, issues, isReady to client components
- Hooks: useDeploymentMode(), useDeploymentIssues(), useRegistrationHeaders(), useDeploymentReadiness()

**AuthProvider (lib/auth-context.tsx):**
- Client component wrapping app after DeploymentModeProvider
- Receives user from server-side getCurrentUser()
- Provides user (UserWithRole | null) and isLoading (always false) to client components
- Hooks: useAuth(), useCurrentUser(), useIsAuthenticated(), useRequireRole(allowedRoles), useHasRole(allowedRoles)
- Role-based rendering helpers return null if unauthorized (no redirects in client context)

**ThemeProvider (next-themes):**
- Wraps app after AuthProvider
- attribute="class" for Tailwind dark mode
- defaultTheme="system" with enableSystem
- disableTransitionOnChange for better UX
- suppressHydrationWarning on html element

### Root Layout Structure

**Implementation:** app/layout.tsx

Server component orchestrating app initialization:
1. Calls hydrateDeploymentMode() to get deployment config
2. Calls getCurrentUser() to fetch authenticated user
3. Renders DeploymentModeProvider with config
4. Renders AuthProvider with user
5. Renders ThemeProvider with settings
6. Displays configuration issues banner if present
7. Renders Header, main content, Footer
8. Includes Vercel Analytics and SpeedInsights
9. Conditionally renders DevkitDoctor in development mode or when NEXT_PUBLIC_DEMO_MODE=true

**Metadata:**
- Title from app.config.ts: "Dev Kit for AI"
- Description: "AI Project Starter & Boilerplate with Batteries Included."

## Configuration

### App Configuration

**Implementation:** config/app.config.ts

**Structure:**
- name: "Dev Kit for AI"
- title: Mode-specific (project mode: "Dev Kit for AI")
- description: "AI Project Starter & Boilerplate with Batteries Included."
- logo: text and href
- header: mode-specific navigation links
- footer: title, description, link sections (resources, documentation)
- mode: from mode.config.ts

**Mode-Specific Settings:**
- getModeSpecificHeader(): Returns navigation links based on deployment mode
- getModeSpecificTitle(): Returns page title based on deployment mode
- Project mode header links: Home, Use Cases, Landing Pages, Components, All examples
- Footer links shared across all modes

**Implementation:** config/mode.config.ts
- getModeConfig(): Returns mode configuration from environment

**Implementation:** config/app.config.types.ts
- AppConfig interface definition

## Theme Management

**Implementation:**
- next-themes 0.4.6 for theme state management
- System theme detection enabled
- Dark mode via Tailwind `dark:` classes
- ThemeSwitcher component in components/theme-switcher.tsx
- Theme toggle in header navigation (desktop and mobile)
- Tailwind config enables dark mode via class strategy

## Type Definitions

**lib/types/auth.ts:**
- ProvisioningData: project_id, api_key, developer_key (optional fields)
- RegistrationResponse: id, email, role, is_active, created_at, provisioning (optional)
- TokenResponse: access_token, refresh_token (optional), token_type
- ApiErrorResponse: detail
- RegistrationFormData: email, password
- OperatorRegistrationResult: success, data (optional), error (optional)
- UserWithRole: id, email, role ('platform_operator' | 'developer' | 'end_user'), is_active, created_at
- AuthError: 'no_token' | 'invalid_token' | 'expired_token' | 'inactive_user' | 'network_error' | 'unauthorized_role'
- AuthResult: success, user (optional), error (optional), message (optional)
- AuthContextValue: user (UserWithRole | null), isLoading (boolean)

## Build Configuration

**next.config.ts:**
- Empty configuration, uses Next.js defaults

**tailwind.config.ts:**
- Content paths: pages, components, app directories
- Extended colors: background (CSS var), foreground (CSS var)
- No custom plugins
- Dark mode: class strategy

**tsconfig.json:**
- Strict mode enabled
- ES2017 target
- Path alias: @/ maps to ./

**Package Scripts:**
- dev: Turbopack dev server on port 3004
- build: Production build
- start: Production server on port 3004
- lint: ESLint
- test: Integration and E2E tests
- test:integration: Vitest tests
- test:integration:watch: Vitest watch mode
- test:e2e: Playwright tests

## Development Features

### DevKit Doctor

Diagnostic panel shown when NODE_ENV=development or NEXT_PUBLIC_DEMO_MODE=true. Located in components/devkit/devkit-doctor/.

### Analytics

Vercel Analytics and Speed Insights integrated in root layout for production monitoring.
