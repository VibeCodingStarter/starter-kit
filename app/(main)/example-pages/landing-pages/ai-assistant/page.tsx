"use client";

import CTAButton from "@/components/generic/cta-button";
import InfoBox from "@/components/generic/info-box";
import PageHeader from "@/components/generic/page-header";
import { useState } from "react";

export default function AIAssistantLandingPage() {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm AskAI, your intelligent virtual assistant. How can I help you today?",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: chatInput,
      },
    ]);

    // Simulate AI response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Thanks for your message! This is a simulated response. In a real implementation, this would connect to an AI API to generate relevant responses based on your query.",
        },
      ]);
    }, 1000);

    setChatInput("");
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-20 px-8 bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-800 dark:to-blue-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <PageHeader
                title="AskAI: Your Intelligent Assistant"
                description="The AI-powered assistant that understands context, remembers conversations, and helps you get more done with natural language interactions."
              >
                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <CTAButton
                    href="/signup"
                    className="!bg-white !text-teal-600 hover:!bg-teal-50"
                  >
                    Try For Free
                  </CTAButton>
                  <CTAButton
                    href="#demo"
                    className="!bg-transparent !border-2 !border-white !text-white hover:!bg-teal-600"
                  >
                    See Demo
                  </CTAButton>
                </div>
              </PageHeader>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="p-4 bg-teal-500 dark:bg-teal-700 text-white">
                <h3 className="font-medium">AskAI Assistant</h3>
              </div>
              <div className="p-4 h-80 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                          message.role === "user"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-100 dark:bg-gray-700 rounded-bl-none"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask AskAI anything..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
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
            Why Leading Companies Choose AskAI
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <InfoBox>
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">
                Contextual Understanding
              </h3>
              <p>
                Unlike rule-based chatbots, AskAI understands context and
                maintains conversation history to provide relevant responses.
              </p>
            </InfoBox>

            <InfoBox>
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2">
                Seamless Integration
              </h3>
              <p>
                Easily integrate with your existing tools like Slack, Teams,
                your website, or mobile apps with our simple API.
              </p>
            </InfoBox>

            <InfoBox>
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">
                Enterprise-Grade Security
              </h3>
              <p>
                Your data stays private with end-to-end encryption. Choose
                between cloud hosting or on-premise deployment.
              </p>
            </InfoBox>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full py-20 px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Power Your Business with AI
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="h-64 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
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
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.479m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Provide 24/7 support without increasing headcount. AskAI
                  handles routine queries, freeing your team to focus on complex
                  issues.
                </p>
                <div className="font-medium text-teal-600 dark:text-teal-400">
                  Results from our customers:
                </div>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>70% reduction in response time</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>30% increase in customer satisfaction</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="h-64 bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
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
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold mb-2">
                  Internal Knowledge Base
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Connect AskAI to your company documents, wikis, and knowledge
                  bases. Employees get instant answers to their questions about
                  company policies and procedures.
                </p>
                <div className="font-medium text-teal-600 dark:text-teal-400">
                  Results from our customers:
                </div>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>85% time saved finding information</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>40% reduction in support tickets</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section
        id="demo"
        className="w-full py-20 px-8 bg-white dark:bg-gray-800"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">See AskAI in Action</h2>

          {/* Video/Demo Placeholder */}
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl mb-8 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400">
              <svg
                className="w-20 h-20 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-lg">Demo Video - Click to Play</p>
            </div>
          </div>

          <CTAButton href="/signup" variant="primary" className="mx-auto">
            Start Your Free Trial
          </CTAButton>
        </div>
      </section>

      {/* Pricing */}
      <section className="w-full py-20 px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto">
            Choose the plan that&apos;s right for your business. All plans include a
            14-day free trial.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="text-3xl font-bold">
                  $29
                  <span className="text-base font-normal text-gray-500">
                    /month
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Perfect for small businesses just getting started with AI.
                </p>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-3 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Up to 1,000 AI interactions per month</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-3 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Website integration</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-3 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Basic analytics</span>
                  </li>
                </ul>
                <CTAButton href="/signup" className="w-full" variant="primary">
                  Start Free Trial
                </CTAButton>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden relative transform scale-105 border-2 border-teal-500 z-10">
              <div className="absolute top-0 right-0 bg-teal-500 text-white px-4 py-1 text-sm font-semibold">
                Most Popular
              </div>
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="text-3xl font-bold">
                  $79
                  <span className="text-base font-normal text-gray-500">
                    /month
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  For growing businesses with higher AI interaction needs.
                </p>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-3 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Up to 5,000 AI interactions per month</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-3 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Website & Slack integration</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-3 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Advanced analytics & custom training</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-3 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Priority support</span>
                  </li>
                </ul>
                <CTAButton
                  href="/signup"
                  className="w-full !bg-teal-500 hover:!bg-teal-600"
                >
                  Start Free Trial
                </CTAButton>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold">Custom</div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  For large organizations with advanced requirements.
                </p>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-3 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Unlimited AI interactions</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-3 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>All integrations + custom APIs</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-3 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>On-premise deployment option</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-teal-500 mr-3 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                <CTAButton
                  href="/contact"
                  className="w-full"
                  variant="secondary"
                >
                  Contact Sales
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-8 bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-800 dark:to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Customer Experience?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of businesses that use AskAI to provide better
            service, save time, and reduce costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/signup"
              className="!bg-white !text-teal-600 hover:!bg-teal-50"
            >
              Start Your Free Trial
            </CTAButton>
            <CTAButton
              href="/contact"
              className="!bg-transparent !border-2 !border-white !text-white hover:!bg-teal-600"
            >
              Schedule a Demo
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
