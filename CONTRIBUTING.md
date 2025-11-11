# Contributing to Dev Kit for AI - Starter Kit

Thank you for your interest in contributing to the Dev Kit for AI Starter Kit! We welcome contributions from the community and are grateful for your support.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Project Structure](#project-structure)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be respectful** and inclusive to all participants
- **Accept constructive criticism** gracefully
- **Focus on what is best** for the community
- **Show empathy** towards other community members

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18 or higher
- **npm**, **yarn**, or **pnpm**
- **Git** for version control
- A **Dev Kit for AI account** ([sign up here](https://vibecoding.ad/register/developer))

### First Time Contributors

If you're new to contributing to open source, here are some resources to help you get started:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [First Contributions](https://github.com/firstcontributions/first-contributions)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)

Look for issues labeled `good first issue` or `help wanted` to get started!

## 🛠️ Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/starter-kit.git
   cd starter-kit
   ```

3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/VibeCodingStarter/starter-kit.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   # or
   make install
   ```

5. **Set up environment variables**:
   - Copy `.env.example` to `.env.local` (if available)
   - Add your Dev Kit for AI credentials from [Cloud Admin](https://vibecoding.ad/console)

6. **Run the development server**:
   ```bash
   npm run dev
   # or
   make dev
   ```

7. **Verify everything works** by visiting [http://localhost:3004](http://localhost:3004)

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear descriptive title**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, browser)
- **Error messages** and stack traces

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear descriptive title**
- **Detailed description** of the proposed feature
- **Use cases** explaining why this would be useful
- **Mockups or examples** (if applicable)

### Contributing Code

1. **Check existing issues** or create a new one to discuss your idea
2. **Wait for approval** from maintainers before starting major work
3. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** following our coding standards
5. **Write tests** for your changes
6. **Update documentation** as needed
7. **Commit your changes** with clear commit messages
8. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
9. **Open a Pull Request**

### Contributing Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos or clarifying existing docs
- Adding examples or use cases
- Creating tutorials or guides
- Improving code comments

## 🔄 Pull Request Process

1. **Update the README.md** with details of changes if applicable
2. **Ensure tests pass**: Run `npm run test` or `make verify`
3. **Ensure linting passes**: Run `npm run lint`
4. **Update documentation** if you've made API changes
5. **Link related issues** in your PR description
6. **Request review** from maintainers
7. **Address review feedback** promptly
8. **Squash commits** if requested before merging

### PR Review Criteria

Your PR will be reviewed based on:

- **Code quality** and adherence to standards
- **Test coverage** for new features
- **Documentation** completeness
- **Performance** impact
- **Backward compatibility** (if applicable)

## 📏 Coding Standards

### TypeScript/React Guidelines

- **Use TypeScript** for all new files
- **Prefer Server Components** over Client Components
- **Use "use client"** only when necessary (interactivity, hooks, browser APIs)
- **Use "use server"** for Server Actions
- **Export types and interfaces** explicitly
- **Avoid `any` type** - use proper types or `unknown`

### Code Style

- **Follow existing patterns** in the codebase
- **Use Tailwind CSS** for styling (utility-first approach)
- **Use `cn()` helper** from `lib/utils.ts` for conditional classes
- **Component names**: PascalCase (e.g., `UserDashboard.tsx`)
- **Utility files**: kebab-case (e.g., `auth-server.ts`)
- **Page files**: lowercase (e.g., `page.tsx`, `layout.tsx`)

### React Best Practices

```typescript
// ✅ Good - Server Component
export default async function DashboardPage() {
  const user = await getCurrentUser();
  return <Dashboard user={user} />;
}

// ✅ Good - Client Component (only when needed)
"use client";
export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// ❌ Avoid - Unnecessary client component
"use client";
export function StaticCard({ title }: { title: string }) {
  return <div>{title}</div>; // No interactivity needed
}
```

### File Organization

```typescript
// ✅ Good - Organized imports
import { type ReactNode } from "react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth-server";

// ❌ Avoid - Mixed import styles
import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth-server";
import { redirect } from "next/navigation";
```

## 🏗️ Project Structure

Key directories to understand:

```
starter-kit/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (login, register)
│   ├── dashboard/         # Protected user pages
│   ├── example-pages/     # Component showcase
│   └── actions.ts         # Server Actions
├── components/
│   ├── ui/                # Base UI primitives (DO NOT modify without discussion)
│   ├── generic/           # Reusable components
│   ├── project/           # Project-specific components
│   └── starter/           # Homepage sections
├── lib/
│   ├── auth-server.ts     # Server-side auth helpers
│   ├── auth-context.tsx   # Client-side auth hooks
│   └── deployment-mode.ts # Configuration
└── config/
    └── app.config.ts      # App-wide configuration
```

### Where to Add Your Changes

- **New pages**: `app/` directory
- **Reusable UI components**: `components/generic/`
- **Project-specific components**: `components/project/`
- **Utility functions**: `lib/` or `utils/`
- **Configuration**: `config/`

## 🧪 Testing Guidelines

### Running Tests

```bash
# Run all tests
npm run test

# Integration tests (Vitest)
npm run test:integration
npm run test:integration:watch

# E2E tests (Playwright)
npm run test:e2e
```

### Writing Tests

- **Write tests** for all new features
- **Update tests** when modifying existing features
- **Test edge cases** and error conditions
- **Use descriptive test names** that explain what is being tested

Example test structure:

```typescript
import { describe, it, expect } from "vitest";

describe("Feature Name", () => {
  it("should handle expected behavior", () => {
    // Arrange
    const input = "test";
    
    // Act
    const result = functionToTest(input);
    
    // Assert
    expect(result).toBe("expected");
  });
  
  it("should handle edge cases", () => {
    // Test edge cases
  });
});
```

## 📝 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(auth): add email verification flow

Add email verification endpoint and UI components
to support account activation via email.

Closes #123

---

fix(dashboard): resolve user stats display issue

Stats were showing undefined when user had no data.
Added default values and null checks.

---

docs(readme): update installation instructions

Clarify Node.js version requirement and add
troubleshooting section.
```

## 🌍 Community

### Getting Help

- **Documentation**: [docs.devkit4ai.com](https://docs.devkit4ai.com)
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Cloud Admin**: [vibecoding.ad/console](https://vibecoding.ad/console)

### Stay Connected

- Star the repository to show your support
- Watch the repository to stay updated
- Share your projects built with the Starter Kit

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the [Mozilla Public License 2.0](./LICENSE).

## 🙏 Recognition

Contributors will be recognized in our documentation and release notes. Thank you for making Dev Kit for AI better!

---

**Questions?** Open an issue or start a discussion. We're here to help!
