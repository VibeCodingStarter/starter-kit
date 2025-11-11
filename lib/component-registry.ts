interface ComponentItem {
  id: string;
  title: string;
  description?: string;
  path: string;
}

interface ComponentCategory {
  id: string;
  title: string;
  items: ComponentItem[];
}

export const componentRegistry: ComponentCategory[] = [
  {
    id: "landing",
    title: "Landing Page Variants",
    items: [
      {
        id: "landing-ai-saas",
        title: "AI SaaS Product",
        description:
          "Modern SaaS product landing page with features, pricing, and testimonials",
        path: "/example-pages/landing-pages/ai-saas-product",
      },
      {
        id: "landing-ai-dev",
        title: "AI Developer Tool",
        description:
          "Technical landing page for AI-powered developer tools with code samples",
        path: "/example-pages/landing-pages/ai-developer-tool",
      },
      {
        id: "landing-ai-assistant",
        title: "AI Assistant Platform",
        description:
          "Showcase an AI virtual assistant or chatbot service with interactive demo",
        path: "/example-pages/landing-pages/ai-assistant",
      },
      {
        id: "landing-ai-analytics",
        title: "AI-Powered Analytics",
        description:
          "Landing page for data analytics platform with AI insights visualization",
        path: "/example-pages/landing-pages/ai-analytics",
      },
      {
        id: "landing-ai-content",
        title: "AI Content Generator",
        description:
          "Landing page for AI tool that generates marketing copy, images, or videos",
        path: "/example-pages/landing-pages/ai-content",
      },
      {
        id: "landing-enterprise",
        title: "SaaS Enterprise Solution",
        description:
          "B2B SaaS landing page targeting enterprise clients with case studies",
        path: "/example-pages/landing-pages/enterprise-saas",
      },
    ],
  },
  {
    id: "ui-components",
    title: "UI Components",
    items: [
      {
        id: "ui-base",
        title: "Base",
        description: "Base UI components for building consistent interfaces",
        path: "/example-pages/components/ui",
      },
      {
        id: "ui-generic",
        title: "Generic",
        description:
          "Reusable components that can be used across different projects",
        path: "/example-pages/components/generic",
      },
      {
        id: "ui-project",
        title: "Project",
        description:
          "Components specific to this project's functionality (data and configuration)",
        path: "/example-pages/components/project",
      },
    ],
  },
  {
    id: "auth",
    title: "Authentication Components",
    items: [
      {
        id: "auth-1",
        title: "Login Form",
        description: "User login form with email/password",
        path: "/login",
      },
      {
        id: "auth-2",
        title: "Registration Form",
        description: "New user registration form",
        path: "/register/developer",
      },
    ],
  },
  {
    id: "layout",
    title: "Layout Components",
    items: [
      {
        id: "layout-1",
        title: "Dashboard Layout",
        description: "Admin dashboard with sidebar navigation",
        path: "/example-pages/layout/dashboard",
      },
      {
        id: "layout-2",
        title: "App Shell",
        description: "Basic application shell with header and footer",
        path: "/example-pages/layout/app-shell",
      },
    ],
  },
];
