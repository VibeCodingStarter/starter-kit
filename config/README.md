# Configuration

Project configuration.

Configuration structure is defined in `config/app.config.types.ts` and implemented in `config/app.config.ts`.

## Configuration

```ts
title: string; // title of the project
description: string; // description of the project
logo: {
  text: string; // text of the logo
  href: string; // link of the logo
}
navigation: {
  links: Array<{
    href: string; // link of the navigation item
    label: string; // label of the navigation item
  }>;
}
footer: {
  title: string; // title of the footer, optional
  description: string; // description of the footer, optional
  links: { // links section of the footer
    [section: string]: Array<{
      href: string; // link of the footer item
      label: string; // label of the footer item
    }>;
  };
}
```

## Usage

Import configuration in any component:

```tsx
import appConfig from "@/config/app.config";

// Example component using configuration
export default function DemoComponent() {
  return (
    <div>
      <h1>{appConfig.title}</h1>
      <p>{appConfig.description}</p>
    </div>
  );
}
```
