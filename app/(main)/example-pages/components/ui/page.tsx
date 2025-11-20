import PageHeader from "@/components/generic/page-header";
import CodeBlock from "@/components/generic/code-block";
import FloatingNav from "@/components/generic/floating-nav";
import TableOfContents from "@/components/generic/toc";
import ScrollIndicator from "@/components/generic/scroll-indicator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample UI component data
const UI_COMPONENTS = {
  button: {
    title: "Button",
    description:
      "A button component that can be customized with various styles and behaviors.",
    demo: <Button className="mt-2">Click me</Button>,
    code: `import { Button } from "@/components/ui/button";\n\n<Button>Click me</Button>`,
  },
  card: {
    title: "Card",
    description:
      "A card container with flexible layout options for various content types.",
    demo: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
    ),
    code: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";\n\n<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card description</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Card content</p>\n  </CardContent>\n  <CardFooter>\n    <Button>Action</Button>\n  </CardFooter>\n</Card>`,
  },
  input: {
    title: "Input",
    description:
      "A text input field component with various configuration options.",
    demo: <Input placeholder="Type something..." className="max-w-xs" />,
    code: `import { Input } from "@/components/ui/input";\n\n<Input placeholder="Type something..." />`,
  },
  tabs: {
    title: "Tabs",
    description:
      "A tabbed interface component for organizing and switching between different views without navigating to a new page.",
    demo: (
      <div className="space-y-6">
        {/* Basic tabs example */}
        <div>
          <h4 className="text-sm font-medium mb-2">Basic</h4>
          <Tabs defaultValue="account" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="p-4 border rounded-md mt-2">
              <h3 className="font-medium">Account Settings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage your account information and preferences.
              </p>
            </TabsContent>
            <TabsContent
              value="password"
              className="p-4 border rounded-md mt-2"
            >
              <h3 className="font-medium">Password Settings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Update your password and security preferences.
              </p>
            </TabsContent>
            <TabsContent
              value="settings"
              className="p-4 border rounded-md mt-2"
            >
              <h3 className="font-medium">General Settings</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Configure your application settings and preferences.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Form within tabs example */}
        <div>
          <h4 className="text-sm font-medium mb-2">Form Example</h4>
          <Tabs defaultValue="login" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <Button className="w-full">Sign in</Button>
              </div>
            </TabsContent>
            <TabsContent
              value="register"
              className="p-4 border rounded-md mt-2"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" placeholder="Enter your email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="Create a password"
                  />
                </div>
                <Button className="w-full">Create account</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    ),
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"\nimport { Input } from "@/components/ui/input"\nimport { Label } from "@/components/ui/label"\nimport { Button } from "@/components/ui/button"\n\n// Basic Tabs\n<Tabs defaultValue="account">\n  <TabsList>\n    <TabsTrigger value="account">Account</TabsTrigger>\n    <TabsTrigger value="password">Password</TabsTrigger>\n    <TabsTrigger value="settings">Settings</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">Account content</TabsContent>\n  <TabsContent value="password">Password content</TabsContent>\n  <TabsContent value="settings">Settings content</TabsContent>\n</Tabs>\n\n// Form Example\n<Tabs defaultValue="login" className="w-full">\n  <TabsList className="grid w-full grid-cols-2">\n    <TabsTrigger value="login">Login</TabsTrigger>\n    <TabsTrigger value="register">Register</TabsTrigger>\n  </TabsList>\n  <TabsContent value="login">\n    <div className="space-y-4">\n      <div className="space-y-1">\n        <Label htmlFor="email">Email</Label>\n        <Input id="email" placeholder="Enter your email" />\n      </div>\n      <div className="space-y-1">\n        <Label htmlFor="password">Password</Label>\n        <Input id="password" type="password" />\n      </div>\n      <Button className="w-full">Sign in</Button>\n    </div>\n  </TabsContent>\n  <TabsContent value="register">\n    {/* Registration form fields */}\n  </TabsContent>\n</Tabs>`,
  },
};

interface ComponentData {
  title: string;
  description: string;
  demo?: React.ReactNode;
  code: string;
}

function ComponentSection({ id, data }: { id: string; data: ComponentData }) {
  return (
    <div id={id} className="mb-12 scroll-mt-16">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {data.title}
        <a
          href={`#${id}`}
          className="text-indigo-600 dark:text-indigo-400 text-sm"
        >
          #
        </a>
      </h3>
      <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        {data.description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {data.description}
          </p>
        )}
        {data.demo}
      </div>
      <CodeBlock code={data.code} />
    </div>
  );
}

export default function UIComponentsPage() {
  const TOC_ITEMS = {
    "UI Components": Object.entries(UI_COMPONENTS).map(([id, data]) => ({
      id,
      label: data.title,
    })),
  };

  return (
    <>
      <ScrollIndicator />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <PageHeader
          title="UI Components"
          description="Base UI components for building consistent interfaces."
        />

        <div className="max-w-5xl mx-auto px-4 py-8">
          <Link
            href="/example-pages/components"
            className="text-indigo-600 dark:text-indigo-400 mb-6 inline-block"
          >
            ← Back to Components
          </Link>

          <TableOfContents items={TOC_ITEMS} />

          <section>
            <h2 className="text-2xl font-bold mb-8">UI Components</h2>
            {Object.entries(UI_COMPONENTS).map(([id, data]) => (
              <ComponentSection key={id} id={id} data={data} />
            ))}
          </section>
        </div>

        <FloatingNav items={TOC_ITEMS} />
      </div>
    </>
  );
}
