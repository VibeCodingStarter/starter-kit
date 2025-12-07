"use client";

import CTAButton from "@/components/generic/cta-button";
import CodeBlock from "@/components/generic/code-block";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPageVariant1() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* Hero Section with Code Sample */}
      <section className="w-full py-24 md:py-32 px-8 bg-gradient-to-b from-violet-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Automate Your Development Workflow with AI
            </h1>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
              DevKitAI learns your codebase and automates repetitive tasks,
              letting you focus on solving real problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton href="/dashboard" variant="primary">
                Try Free for 14 Days
              </CTAButton>
              <CTAButton href="/demo" variant="secondary">
                Watch Demo
              </CTAButton>
            </div>
          </div>
          <div className="order-first md:order-last">
            <CodeBlock
              code={`// Automatically generate tests with DevKitAI
import { describe, it, expect } from 'vitest';
import { calculateTotal } from './pricing';

// DevKitAI analyzed your function and generated
// these comprehensive tests automatically
describe('calculateTotal', () => {
  it('applies correct discount for orders over $100', () => {
    const result = calculateTotal(120, false);
    expect(result).toBe(108); // 10% discount applied
  });

  it('applies correct tax for taxable orders', () => {
    const result = calculateTotal(50, true);
    expect(result).toBe(53.75); // 7.5% tax applied
  });

  it('handles zero values correctly', () => {
    const result = calculateTotal(0, false);
    expect(result).toBe(0);
  });
});`}
              language="typescript"
              className="shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-20 px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            How DevKitAI Transforms Your Workflow
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-violet-500">
              <CardHeader>
                <CardTitle>1. Connect Your Repositories</CardTitle>
                <CardDescription>
                  Securely connect DevKitAI to your GitHub, GitLab, or Bitbucket
                  repositories.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our secure connection process uses OAuth and never stores your
                  code. DevKitAI only analyzes your codebase to learn its
                  patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-indigo-500">
              <CardHeader>
                <CardTitle>2. AI Learns Your Codebase</CardTitle>
                <CardDescription>
                  Our algorithms analyze your coding style, patterns, and
                  architecture.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  DevKitAI builds a comprehensive understanding of your
                  project&apos;s structure, naming conventions, and architecture
                  decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-purple-500">
              <CardHeader>
                <CardTitle>3. Automate & Accelerate</CardTitle>
                <CardDescription>
                  Get intelligent suggestions, automated tests, and code
                  generation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  From generating unit tests to completing complex functions
                  based on your existing patterns, DevKitAI accelerates your
                  development process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="w-full py-20 px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Powerful AI Features for Developers
          </h2>

          <div className="space-y-16">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Smart Test Generation
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  DevKitAI automatically generates comprehensive test suites by
                  analyzing your code&apos;s functionality, edge cases, and potential
                  vulnerabilities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      80% average test coverage with AI-generated tests
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Identifies edge cases humans often miss</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Compatible with Jest, Vitest, Mocha, and more</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <CodeBlock
                  code={`// Before: Your implementation
function calculateShipping(orderTotal, country, expedited = false) {
  // Your complex shipping calculation logic
  // ...
}

// After: DevKitAI generated tests
describe('calculateShipping', () => {
  it('applies free shipping for orders over $100 in US', () => {
    expect(calculateShipping(120, 'US')).toBe(0);
  });

  it('applies flat rate for orders under $100 in US', () => {
    expect(calculateShipping(50, 'US')).toBe(5.99);
  });

  it('applies correct international shipping to Canada', () => {
    expect(calculateShipping(50, 'CA')).toBe(15.99);
  });

  it('applies expedited shipping correctly', () => {
    expect(calculateShipping(50, 'US', true)).toBe(12.99);
  });
});`}
                  language="javascript"
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-last md:order-first bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <CodeBlock
                  code={`// Your component
function UserProfile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {/* More user details */}
    </div>
  );
}

// DevKitAI suggests:
function UserProfile({ user }) {
  // Added error handling for missing user data
  if (!user) {
    return <div>Loading user data...</div>;
  }

  // Added error boundary for invalid user properties
  try {
    return (
      <div className="user-profile">
        <h2>{user.name || 'Unnamed User'}</h2>
        <p>{user.email || 'No email provided'}</p>
        {/* Suggested accessibility improvements */}
        <div role="contentinfo" aria-label="User details">
          {user.bio && <p>{user.bio}</p>}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering user profile:", error);
    return <div>Error displaying user profile</div>;
  }
}`}
                  language="jsx"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Code Quality Improvements
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  DevKitAI analyzes your code and suggests improvements for
                  error handling, accessibility, performance, and security
                  vulnerabilities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Proactive error handling suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Accessibility compliance recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Security vulnerability detection and fixes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="w-full py-20 px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Works With Your Existing Tools
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            DevKitAI integrates seamlessly with your development environment and
            workflow.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col items-center">
              <svg
                className="w-12 h-12 mb-4 text-gray-700 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <h3 className="font-semibold">GitHub</h3>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col items-center">
              <svg
                className="w-12 h-12 mb-4 text-gray-700 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.997 12c0-6.617-5.38-12-11.997-12S0 5.383 0 12c0 5.301 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.087-.745.084-.729.084-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.305 3.492.997.108-.775.419-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.312.469-2.381 1.237-3.221-.124-.304-.536-1.526.116-3.176 0 0 1.008-.323 3.3 1.23.959-.266 1.98-.399 3-.405 1.02.006 2.046.139 3.005.404 2.29-1.553 3.3-1.23 3.3-1.23.653 1.65.242 2.872.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.48 5.921.43.373.823 1.102.823 2.222v3.293c0 .32.192.694.801.576C20.566 21.795 24 17.298 24 12z" />
              </svg>
              <h3 className="font-semibold">VS Code</h3>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col items-center">
              <svg
                className="w-12 h-12 mb-4 text-gray-700 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.63 10.7L12 1.41 23.37 10.7c.41.3.63.77.63 1.25v10.74c0 .9-.73 1.63-1.63 1.63H1.63A1.63 1.63 0 0 1 0 22.69V11.95c0-.48.22-.95.63-1.25z" />
              </svg>
              <h3 className="font-semibold">GitLab</h3>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col items-center">
              <svg
                className="w-12 h-12 mb-4 text-gray-700 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.57 12.09l-5.45 5.45-1.41-1.41 5.45-5.45-5.45-5.45 1.41-1.41 5.45 5.45 5.45-5.45 1.42 1.41-5.45 5.45 5.45 5.45-1.42 1.41-5.45-5.45z" />
              </svg>
              <h3 className="font-semibold">CI/CD</h3>
            </div>
          </div>

          <CTAButton href="/integrations" variant="secondary">
            View All Integrations
          </CTAButton>
        </div>
      </section>

      {/* Pricing Section - Simple version */}
      <section className="w-full py-20 px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day
            free trial.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative">
              <CardHeader>
                <CardTitle>Developer</CardTitle>
                <div className="text-3xl font-bold">
                  $29
                  <span className="text-sm font-normal text-gray-500">/mo</span>
                </div>
                <CardDescription>For individual developers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-left">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    3 projects
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Basic code analysis
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Test generation
                  </li>
                </ul>
                <CTAButton href="/signup" className="w-full mt-6">
                  Start Free Trial
                </CTAButton>
              </CardContent>
            </Card>

            <Card className="relative border-2 border-violet-500 transform scale-105 shadow-xl">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle>Team</CardTitle>
                <div className="text-3xl font-bold">
                  $79
                  <span className="text-sm font-normal text-gray-500">/mo</span>
                </div>
                <CardDescription>For development teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-left">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited projects
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Advanced code analysis
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Team collaboration
                  </li>
                </ul>
                <CTAButton
                  href="/signup"
                  className="w-full mt-6 bg-violet-600 hover:bg-violet-700"
                >
                  Start Free Trial
                </CTAButton>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold">Custom</div>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-left">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Dedicated support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    On-premise options
                  </li>
                </ul>
                <CTAButton href="/contact" className="w-full mt-6">
                  Contact Sales
                </CTAButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-8 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-800 dark:to-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Building Better Software Today
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are shipping better code faster
            with DevKitAI. No credit card required for your 14-day trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/signup"
              className="!bg-white !text-violet-600 hover:!bg-violet-50"
            >
              Start Your Free Trial
            </CTAButton>
            <CTAButton
              href="/demo"
              className="!bg-transparent !border-2 !border-white !text-white hover:!bg-violet-700"
            >
              See Live Demo
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
