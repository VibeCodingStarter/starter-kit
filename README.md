# Dev Kit for AI - Starter Kit

>
> Build and ship AI-enabled SaaS applications in minutes, not months.
>
> Next.js + Tailwind CSS + Radix UI + Cloud API + Admin Console
>

Next.js boilerplate with everything you need to build AI-enabled SaaS applications, ⚡️ **quickly**.

Right after cloning _this Starter Kit_, you get a fully functional web application with **🔐 authentication**, **🧑‍💻 user management**, **🤖 AI integrations**, and **🎨 UI components**. [Admin console](https://vibecoding.ad/console) and [Cloud API](https://api.vibecoding.ad) are pre-wired for you to manage your users and projects.

#### **Jump in now:** 🚀 [Quick Start Guide](https://docs.devkit4ai.com/quickstart) • 🧑‍💻 [Create Console Account](https://vibecoding.ad/register/developer) • 💼 [Upgrade for More Features](https://vibecoding.ad/#pricing)

## 🚀 Quick Start

### Step 1. Clone and Install

```bash
git clone https://github.com/VibeCodingStarter/starter-kit.git cool-project
cd cool-project

# Install dependencies
npm install

# Create .env file
cp .env.example .env.local

# Run development server
npm run dev
```

One-liner for Mac/Linux:

```bash
printf "Project name (default: cool-project): " && read PROJECT_NAME && PROJECT_NAME=${PROJECT_NAME:-cool-project} && git clone https://github.com/VibeCodingStarter/starter-kit.git $PROJECT_NAME && cd $PROJECT_NAME && npm install && cp .env.example .env.local && npm run dev
```

One-liner for Windows (PowerShell):

```powershell
$PROJECT_NAME = Read-Host "Project name (default: cool-project)"; if (!$PROJECT_NAME) { $PROJECT_NAME = "cool-project" }; git clone https://github.com/VibeCodingStarter/starter-kit.git $PROJECT_NAME; cd $PROJECT_NAME; npm install; Copy-Item .env.example .env.local; npm run dev
```

> **Quick setup:** Copy the one-liner above for your platform and paste it into your terminal. It will prompt for a project name (press Enter to use `cool-project` as the default), then clone the repository, install dependencies, and start the development server.

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

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ENVIRONMENT` | No | Deployment environment (default: `local`) |
| `NEXT_PUBLIC_API_URL` | Yes | Cloud API base URL |
| `DEVKIT4AI_MODE` | Yes | Always `"project"` for starter kit |
| `DEVKIT4AI_DEVELOPER_KEY` | Yes | Your developer key from Cloud Admin |
| `DEVKIT4AI_PROJECT_ID` | Yes | Your project UUID |
| `DEVKIT4AI_PROJECT_KEY` | Yes | Your project API key |

### Example `.env.local`

```bash
# Environment
ENVIRONMENT=local

# User app
NEXT_PUBLIC_API_URL=https://api.vibecoding.ad # alternatively https://api.devkit4ai.com

# User app modes (operator, console, project)
# Always set to `project` for starter-kit
DEVKIT4AI_MODE=project

# Project Credentials
# Replace these with your actual credentials from VibeCoding.ad or DevKit4AI.com
DEVKIT4AI_DEVELOPER_KEY=your_developer_key_here
DEVKIT4AI_PROJECT_ID=your_project_id_here
DEVKIT4AI_PROJECT_KEY=your_project_key_here
```

## 📚 Resources

- **Documentation**: [docs.devkit4ai.com](https://docs.devkit4ai.com)
- **Cloud Admin**: [vibecoding.ad/console](https://vibecoding.ad/console) or [devkit4ai.com/console](https://devkit4ai.com/console)
- **Cloud API**: [api.vibecoding.ad](https://api.vibecoding.ad) or [api.devkit4ai.com](https://api.devkit4ai.com)
- **GitHub Repository**: [github.com/VibeCodingStarter/starter-kit](https://github.com/VibeCodingStarter/starter-kit)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the Mozilla Public License 2.0 - see the [LICENSE](./LICENSE) file for details.

## 💬 Support

- **Documentation**: [docs.devkit4ai.com](https://docs.devkit4ai.com)
- **Issues**: [GitHub Issues](https://github.com/VibeCodingStarter/starter-kit/issues)
- **Community**: Become part of [the Vibe Coding community](https://discord.gg/28uK5tAq89)
- **Email**: [support@vibecoding.ad](mailto:support@devkit4ai.com)
