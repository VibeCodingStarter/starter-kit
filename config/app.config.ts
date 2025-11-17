import { AppConfig } from "./app.config.types";
import { hydrateDeploymentMode } from "@/lib/deployment-mode";

const deploymentConfig = hydrateDeploymentMode();

const appConfig: AppConfig = {
  name: "Dev Kit for AI",
  title:
    "Dev Kit for AI - Developer Toolkit for Building AI-powered SaaS Web Applications",
  description: "AI Project Starter & Boilerplate with Batteries Included.",
  logo: {
    text: "Dev Kit for AI",
    href: "/",
  },
  header: {
    links: [
      { href: "/example-pages/use-cases", label: "Use Cases" },
      { href: "/example-pages/landing-pages", label: "Landing Pages" },
      { href: "/example-pages/components", label: "Components" },
      { href: "/example-pages", label: "All examples" },
    ],
  },
  footer: {
    title: "Dev Kit for AI",
    description:
      "Dev Kit for AI is a project starter template for building AI applications with all major providers.",
    links: {
      platform: [
        {
          href: "https://devkit4ai.com",
          label: "Cloud Platform",
          external: true,
        },
        { href: "https://vibecoding.ad", label: "Vibe Coding", external: true },
        { href: "/console", label: "Developer Console" },
        { href: "/dashboard", label: "User Dashboard" },
      ],
      resources: [
        {
          href: "https://docs.devkit4ai.com",
          label: "Documentation",
          external: true,
        },
        {
          href: "https://github.com/VibeCodingStarter/starter-kit",
          label: "Starter Kit",
          external: true,
        },
        { href: "/example-pages", label: "All Examples" },
      ],
      community: [
        {
          href: "https://github.com/VibeCodingStarter/starter-kit/issues",
          label: "Report Issues",
          external: true,
        },
        {
          href: "https://github.com/VibeCodingStarter/starter-kit/discussions",
          label: "Discussions",
          external: true,
        },
        { href: "/example-pages/use-cases", label: "Use Cases" },
        { href: "/example-pages/components", label: "Components" },
      ],
    },
  },
  mode: {
    currentMode: deploymentConfig.mode,
    operatorKey: deploymentConfig.secrets.operatorKey,
    projectId: deploymentConfig.secrets.projectId,
    projectKey: deploymentConfig.secrets.projectKey,
  },
};

export default appConfig;
