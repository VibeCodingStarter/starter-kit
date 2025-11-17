# Configuration

Application configuration with multi-mode deployment support.

## Files

- `app.config.types.ts` - TypeScript type definitions
- `app.config.ts` - Application configuration implementation

## Structure

Configuration integrates with deployment mode system via `hydrateDeploymentMode()` from `lib/deployment-mode.ts`.

```ts
interface AppConfig {
  name: string;                // Application name
  title: string;               // Page title
  description: string;         // Application description
  logo: {
    text: string;              // Logo text
    href: string;              // Logo link
  };
  header: {
    links: Array<{
      href: string;            // Navigation link URL
      label: string;           // Navigation link label
    }>;
  };
  footer: {
    title: string;             // Footer title
    description: string;       // Footer description
    links: {
      [section: string]: Array<{
        href: string;          // Footer link URL
        label: string;         // Footer link label
        external?: boolean;    // Opens in new tab if true
      }>;
    };
  };
  mode?: ModeConfig;           // Deployment mode configuration
}

interface ModeConfig {
  currentMode: AppMode;        // "operator" | "console" | "project"
  operatorKey?: string;        // Operator authentication key
  projectId?: string;          // Project UUID
  projectKey?: string;         // Project API key
}
```

## Configuration Values

### Static Values
- **Title**: "Dev Kit for AI - Developer Toolkit for Building AI-powered SaaS Web Applications"
- **Header Links**: Use Cases, Landing Pages, Components, All examples

### Dynamic Values
- **Mode Configuration**: Populated from deployment mode system with current mode and authentication secrets

## Usage

```tsx
import appConfig from "@/config/app.config";

export default function DemoComponent() {
  return (
    <div>
      <h1>{appConfig.title}</h1>
      <p>{appConfig.description}</p>
      
      {/* Access mode information */}
      {appConfig.mode && (
        <p>Current mode: {appConfig.mode.currentMode}</p>
      )}
      
      {/* Use header links */}
      <nav>
        {appConfig.header.links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
```

## Deployment Mode

Deployment mode is determined by environment variables and validated through `lib/deployment-mode.ts`. See the deployment-mode documentation for detailed configuration requirements and validation rules.
