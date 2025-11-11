import { AppConfig } from "./app.config.types";
import { getModeConfig } from "./mode.config";

const modeConfig = getModeConfig();

// Mode-specific configurations
const getModeSpecificHeader = () => {
  switch (modeConfig.mode) {
    case 'operator':
      return {
        links: [
          { href: "/admin", label: "Platform Admin" },
          { href: "/admin/users", label: "Users" },
          { href: "/admin/projects", label: "Projects" },
          { href: "/admin/metrics", label: "Metrics" },
        ],
      };
    case 'console':
      return {
        links: [
          { href: "/console", label: "Dashboard" },
          { href: "/console/projects", label: "My Projects" },
          { href: "/console/api-keys", label: "API Keys" },
          { href: "/console/generations", label: "Generations" },
        ],
      };
    case 'project':
    default:
      return {
        links: [
          { href: "/", label: "Home" },
          { href: "/example-pages/use-cases", label: "Use Cases" },
          { href: "/example-pages/landing-pages", label: "Landing Pages" },
          { href: "/example-pages/components", label: "Components" },
          { href: "/example-pages", label: "All examples" },
        ],
      };
  }
};

const getModeSpecificTitle = () => {
  switch (modeConfig.mode) {
    case 'operator':
      return "Dev Kit for AI - Platform Admin";
    case 'console':
      return "Dev Kit for AI - Developer Console";
    case 'project':
    default:
      return "Dev Kit for AI";
  }
};

const appConfig: AppConfig = {
  name: "Dev Kit for AI",
  title: getModeSpecificTitle(),
  description: "AI Project Starter & Boilerplate with Batteries Included.",
  logo: {
    text: "Dev Kit for AI",
    href: "/",
  },
  header: getModeSpecificHeader(),
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
  mode: modeConfig,
};

export default appConfig;
