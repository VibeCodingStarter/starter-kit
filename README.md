# Dev Kit for AI - Starter Kit

> Build and ship AI-powered SaaS applications in minutes, not months.

The **Starter Kit** is an open-source Next.js template that helps developers build AI-powered SaaS applications quickly. It comes pre-configured with authentication, user management, AI integration, and a beautiful UI—all connected to [Dev Kit for AI Cloud API](https://docs.devkit4ai.com/cloud-api/introduction).

#### **Jump in now:** 🚀 [Quick Start Guide](https://docs.devkit4ai.com/quickstart) • 🧑‍💻 [Create Console Account](https://vibecoding.ad/register/developer) • 💼 [Upgrade for More Features](https://vibecoding.ad/#pricing)

---

## 🚀 Why Vibe Coding Starter Kit? 🤘🏽🤘🏽🤘🏽

- 🧑‍💻 Clone the repo, wire up your credentials, and start shipping within minutes
- 📦 Launch with user dashboards and the hosted Cloud API already wired together
- 🤖 Leverage built-in AI integrations and production-ready feature blocks out of the box
- 🚢 Deploy with a single click to bring up the backend, frontend, admin, and end-user dashboards
- 🧰 Assemble polished experiences fast with the extensive built-in component library

---

## 🚀 Quick Start

### Step 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/VibeCodingStarter/starter-kit.git my-project
cd my-project

# Install dependencies
npm install

# Create .env file
cp .env.example .env.local

# Run development server
npm run dev
```

### Step 2. Get Your Credentials

1. Sign up for a free account at [VibeCoding.ad](https://vibecoding.ad/register/developer) or [DevKit4AI.com](https://devkit4ai.com/register/developer)

2. Right after registering, you'll see your **Developer Key** in the dashboard

- **Developer Key**
- **Project ID**
- **Project API Key**

3. Update your `.env.local` file with these values

### Step 3. Explore and Customize

1. Open [http://localhost:3004](http://localhost:3004) to see the starter kit in action
2. Explore example pages at `/example-pages`
3. Customize branding in `config/app.config.ts`
4. Add your features using the component library in `components/ui/`

Read the full documentation at [docs.devkit4ai.com](https://docs.devkit4ai.com) for detailed guides and API references.

---

## ✨ Features

### 🔐 Authentication & User Management
- **JWT-based authentication** with httpOnly cookies
- **Role-based access control** (RBAC)
- User registration and login flows
- Email verification and password reset
- Secure session management

### 🎨 Beautiful UI Components
- **60+ pre-built components** built with Radix UI
- **Dark mode support** with next-themes
- **Responsive design** optimized for all devices
- **Tailwind CSS** for easy customization
- **Landing page templates** for AI SaaS products

### 🚀 Production Ready
- **Server Components** for optimal performance
- **TypeScript** for type safety
- **ESLint** configured with Next.js best practices
- **Vitest** and **Playwright** for testing
- **Vercel Analytics** integration

### 🔌 Cloud API Integration
- Pre-configured connection to **[Cloud API](https://api.vibecoding.ad)**
- Project-scoped authentication
- Error handling and retry logic
- Support for multiple projects
- Multi-tenancy support

### 📊 Cloud Admin Dashboard
- **Project management** via **[Cloud Admin](https://vibecoding.ad/console)**
- API key generation and management
- User analytics and monitoring
- Usage tracking and limits

### 📚 Example Pages & Use Cases
- AI SaaS landing pages
- Component showcase
- Dashboard layouts
- Use case demonstrations
- Marketing page templates

---

## 📖 Documentation

### Core Concepts

The Starter Kit operates in **project mode**, which means:
- All users are scoped to your project
- Users have the `end_user` role
- Authentication flows through Cloud API
- Project-specific headers are automatically included

### Project Structure

```
starter-kit/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Protected user dashboard
│   ├── example-pages/     # Component showcase
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── ui/                # Base UI primitives (Radix UI)
│   ├── generic/           # Reusable components
│   ├── project/           # Project-specific (Header, Footer)
│   └── starter/           # Homepage marketing sections
├── lib/
│   ├── auth-server.ts     # Server-side auth helpers
│   ├── auth-context.tsx   # Client-side auth hooks
│   └── deployment-mode.ts # Configuration validation
└── config/
    └── app.config.ts      # App configuration
```

### Key Files

- **`lib/deployment-mode.ts`** - Validates environment variables and constructs API headers
- **`lib/auth-server.ts`** - Server-side authentication (getCurrentUser, requireAuth)
- **`lib/auth-context.tsx`** - Client-side hooks (useAuth, useDeploymentMode)
- **`app/actions.ts`** - Server Actions for login/logout
- **`app/layout.tsx`** - Root layout with providers

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DEVKIT4AI_MODE` | Yes | Always `"project"` for starter kit |
| `NEXT_PUBLIC_API_URL` | Yes | Cloud API base URL |
| `DEVKIT4AI_DEVELOPER_KEY` | Yes | Your developer key from Cloud Admin |
| `DEVKIT4AI_PROJECT_ID` | Yes | Your project UUID |
| `DEVKIT4AI_PROJECT_KEY` | Yes | Your project API key |
| `ENVIRONMENT` | No | Deployment environment (default: `local`) |

---

## 🎨 Customization

### Branding

Update `config/app.config.ts`:

```typescript
export const appConfig: AppConfig = {
  name: "Your App Name",
  description: "Your app description",
  logo: {
    text: "YourApp",
    href: "/",
  },
  // ... more config
};
```

### Styling

The starter kit uses Tailwind CSS. Customize in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Your custom colors
      },
    },
  },
};
```

### Components

All UI components are in `components/ui/` and built with Radix UI. Customize them directly or create variants using `class-variance-authority`.

---

## 🧪 Testing

```bash
# Run all tests
npm run test

# Integration tests (Vitest)
npm run test:integration
npm run test:integration:watch

# E2E tests (Playwright)
npm run test:e2e
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/VibeCodingStarter/starter-kit)

### Other Platforms

The starter kit works on any platform that supports Next.js:
- **Netlify**
- **Railway**
- **Render**
- **AWS Amplify**
- **Docker** (Dockerfile.dev included)

Ensure you set the required environment variables on your platform.

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server (port 3004)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run all tests
```

### Makefile Commands

```bash
make install         # Install dependencies
make dev             # Run dev server with backend health check
make verify          # Run typecheck, lint, audit, and build
make check-cloud-api # Check Cloud API health
```

---

## 📚 Resources

- **Documentation**: [docs.devkit4ai.com](https://docs.devkit4ai.com)
- **Cloud Admin**: [vibecoding.ad/console](https://vibecoding.ad/console) or [devkit4ai.com/console](https://devkit4ai.com/console)
- **Cloud API**: [api.vibecoding.ad](https://api.vibecoding.ad) or [api.devkit4ai.com](https://api.devkit4ai.com)
- **GitHub Repository**: [github.com/VibeCodingStarter/starter-kit](https://github.com/VibeCodingStarter/starter-kit)

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the Mozilla Public License 2.0 - see the [LICENSE](./LICENSE) file for details.

---

## 💬 Support

- **Documentation**: [docs.devkit4ai.com](https://docs.devkit4ai.com)
- **Issues**: [GitHub Issues](https://github.com/VibeCodingStarter/starter-kit/issues)
- **Community**: Join our community for help and discussions

---

## 🌟 What's Next?

After setting up the Starter Kit:

1. **Explore Example Pages** at `/example-pages`
2. **Customize Branding** in `config/app.config.ts`
3. **Add Your Features** using the component library
4. **Deploy to Production** on Vercel or your preferred platform
5. **Upgrade Your Plan** at [VibeCoding.ad](https://vibecoding.ad) for higher limits

---
