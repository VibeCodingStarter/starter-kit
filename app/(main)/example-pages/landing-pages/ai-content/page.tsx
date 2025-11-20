"use client";

import CTAButton from "@/components/generic/cta-button";
import InfoBox from "@/components/generic/info-box";
import PageHeader from "@/components/generic/page-header";
import { useState } from "react";

export default function AIContentLandingPage() {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("blog_intro");
  const [generatedText, setGeneratedText] = useState(
    "Your AI-generated content will appear here..."
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateContent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic.trim()) {
      setGeneratedText("Please enter a topic to generate content.");
      return;
    }
    setIsLoading(true);
    setGeneratedText("Generating content, please wait...");

    // Simulate AI response
    setTimeout(() => {
      let exampleContent = "";
      switch (contentType) {
        case "blog_intro":
          exampleContent = `Introducing ${topic}: A deep dive into how it's changing the landscape. In this article, we'll explore its key aspects and future implications.`;
          break;
        case "ad_headline":
          exampleContent = `Unlock the Power of ${topic} Today!`;
          break;
        case "product_description":
          exampleContent = `Discover our new product related to ${topic}, designed to provide exceptional value and performance. Experience the difference.`;
          break;
        default:
          exampleContent = `Generated content for ${topic} based on ${contentType}.`;
      }
      setGeneratedText(exampleContent);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-20 px-8 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-800 dark:to-pink-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <PageHeader
                title="Create Compelling Content Instantly"
                description="Generate high-quality marketing copy, blog posts, social media updates, and more with our advanced AI content creation tool."
              >
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <CTAButton
                    href="/signup"
                    className="!bg-white !text-purple-600 hover:!bg-purple-50"
                  >
                    Try For Free
                  </CTAButton>
                  <CTAButton
                    href="#examples"
                    className="!bg-transparent !border-2 !border-white !text-white hover:!bg-purple-600"
                  >
                    See Examples
                  </CTAButton>
                </div>
              </PageHeader>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="p-4 bg-purple-500 dark:bg-purple-700 text-white">
                <h3 className="font-medium">Generate Content</h3>
              </div>
              <form onSubmit={handleGenerateContent} className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Topic / Keywords
                  </label>
                  <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., 'sustainable energy solutions'"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contentType"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Content Type
                  </label>
                  <select
                    id="contentType"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700"
                  >
                    <option value="blog_intro">Blog Introduction</option>
                    <option value="ad_headline">Ad Headline</option>
                    <option value="product_description">
                      Product Description
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Generating..." : "Generate"}
                </button>
                <div className="mt-4 p-4 h-32 bg-gray-50 dark:bg-gray-700 rounded-md overflow-y-auto text-sm text-gray-600 dark:text-gray-300">
                  {generatedText}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section
        id="features"
        className="w-full py-20 px-8 bg-white dark:bg-gray-800"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our AI Content Generator?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <InfoBox>
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">
                Versatile Content Types
              </h3>
              <p>
                From blog articles and ad copy to social media posts and email
                drafts, generate diverse content formats tailored to your needs.
              </p>
            </InfoBox>
            <InfoBox>
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">SEO Optimized</h3>
              <p>
                Create content that is not only engaging but also optimized for
                search engines to help you rank higher and drive organic
                traffic.
              </p>
            </InfoBox>
            <InfoBox>
              <div className="text-3xl mb-4">🗣️</div>
              <h3 className="text-xl font-semibold mb-2">
                Brand Voice Consistency
              </h3>
              <p>
                Maintain your unique brand voice across all generated content.
                Our AI learns your style for consistent messaging.
              </p>
            </InfoBox>
          </div>
        </div>
      </section>

      {/* Use Cases / Examples */}
      <section
        id="examples"
        className="w-full py-20 px-8 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Unlock Your Content Potential
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="h-64 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold mb-2">
                  Blog & Article Writing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Generate entire blog posts, articles, or just sections like
                  introductions and outlines. Overcome writer&apos;s block and
                  publish content faster.
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>✓ Create engaging long-form content</li>
                  <li>✓ Generate topic ideas and outlines</li>
                  <li>✓ Improve readability and flow</li>
                </ul>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="h-64 bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  ></path>
                </svg>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold mb-2">Marketing Copy</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Craft persuasive ad copy, product descriptions, email
                  campaigns, and social media updates that convert.
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>✓ High-converting ad headlines</li>
                  <li>✓ Compelling product descriptions</li>
                  <li>✓ Engaging social media captions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full py-20 px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">
            Flexible Pricing for Every Creator
          </h2>
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto">
            Choose a plan that scales with your content needs. All plans include
            a 7-day free trial.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Pricing Plan 1: Basic */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden p-8">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="text-3xl font-bold">
                $19
                <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                  /month
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Ideal for individuals and small projects.
              </p>
              <ul className="space-y-3 my-6 text-sm">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  20,000 words/month
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Basic content templates
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Standard support
                </li>
              </ul>
              <CTAButton href="/signup" className="w-full" variant="secondary">
                Get Started
              </CTAButton>
            </div>

            {/* Pricing Plan 2: Pro (Most Popular) */}
            <div className="bg-purple-500 text-white rounded-xl shadow-xl overflow-hidden p-8 relative transform md:scale-105 z-10">
              <div className="absolute top-0 right-0 bg-yellow-400 text-purple-700 px-3 py-1 text-xs font-bold rounded-bl-lg">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-3xl font-bold">
                $49
                <span className="text-base font-normal text-purple-200">
                  /month
                </span>
              </div>
              <p className="text-purple-100 mt-2">
                For professionals and growing businesses.
              </p>
              <ul className="space-y-3 my-6 text-sm">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  100,000 words/month
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Advanced content templates
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  SEO optimization tools
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-2"
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
              </ul>
              <CTAButton
                href="/signup"
                className="w-full !bg-white !text-purple-600 hover:!bg-purple-50"
              >
                Choose Pro
              </CTAButton>
            </div>

            {/* Pricing Plan 3: Business */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden p-8">
              <h3 className="text-2xl font-bold mb-2">Business</h3>
              <div className="text-3xl font-bold">
                $99
                <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                  /month
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                For teams and agencies with high volume needs.
              </p>
              <ul className="space-y-3 my-6 text-sm">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Unlimited words
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  All templates & tools
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Team collaboration features
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-purple-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Dedicated account manager
                </li>
              </ul>
              <CTAButton href="/contact" className="w-full" variant="secondary">
                Contact Sales
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-8 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-800 dark:to-pink-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Revolutionize Your Content Strategy?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Start creating amazing, high-quality content with the power of AI
            today. Boost your productivity and engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/signup"
              className="!bg-white !text-purple-600 hover:!bg-purple-50"
            >
              Start Your Free Trial
            </CTAButton>
            <CTAButton
              href="/contact"
              className="!bg-transparent !border-2 !border-white !text-white hover:!bg-purple-600"
            >
              Request a Demo
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
