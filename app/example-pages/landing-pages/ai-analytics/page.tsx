import { Button } from "@/components/ui/button";

export default function AIAnalyticsLandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm w-full z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                DataInsight.ai
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a
                  href="#features"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </a>
                <a
                  href="#demo"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Demo
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Testimonials
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Pricing
                </a>
                <Button variant="outline" className="ml-4">
                  Login
                </Button>
                <Button>Get Started</Button>
              </div>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 dark:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block text-gray-900 dark:text-white">
                  Transform your data with
                </span>
                <span className="block text-indigo-600 dark:text-indigo-400">
                  AI-Powered Insights
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
                DataInsight.ai turns complex data into actionable intelligence
                in real-time. Uncover hidden patterns, predict trends, and make
                smarter decisions with our advanced AI analytics platform.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-semibold shadow-lg">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Watch Demo
                </Button>
              </div>
              <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                No credit card required · 14-day free trial · Cancel anytime
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-2xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative h-[400px]">
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm mx-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="mt-4 text-xl font-medium">
                        See DataInsight.ai in action
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base font-medium text-gray-500 dark:text-gray-400">
            Trusted by innovative companies worldwide
          </p>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="col-span-1 flex justify-center opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Advanced Analytics, Simplified
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
              Our AI-powered platform makes complex data analysis accessible to
              everyone on your team.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Predictive Analytics",
                description:
                  "Forecast trends and outcomes with machine learning models that learn from your historical data.",
                icon: "📈",
              },
              {
                title: "Automated Insights",
                description:
                  "Receive intelligent notifications about anomalies, opportunities, and changing patterns.",
                icon: "💡",
              },
              {
                title: "Natural Language Queries",
                description:
                  "Ask questions in plain English and get instant data visualizations and answers.",
                icon: "🔍",
              },
              {
                title: "Real-time Dashboards",
                description:
                  "Monitor KPIs and metrics with live dashboards that update automatically as new data comes in.",
                icon: "⚡",
              },
              {
                title: "Data Integration",
                description:
                  "Connect to all your data sources with our 100+ pre-built connectors and APIs.",
                icon: "🔄",
              },
              {
                title: "Customizable Reports",
                description:
                  "Create and schedule custom reports tailored to different stakeholders and departments.",
                icon: "📊",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section
        id="demo"
        className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              See Our Analytics Platform in Action
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
              Interactive demo of how DataInsight.ai transforms raw data into
              actionable insights.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="font-semibold">
              Try Interactive Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Loved by Data Teams Everywhere
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
              See how DataInsight.ai is transforming how organizations work with
              data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "DataInsight.ai has completely transformed how we make decisions. What used to take our analysts days now happens automatically in minutes.",
                author: "Sarah Johnson",
                role: "CTO, TechCorp Inc.",
              },
              {
                quote:
                  "The predictive analytics feature helped us identify market trends months before our competitors, giving us a significant advantage.",
                author: "Michael Chen",
                role: "Head of Data Science, GrowthMetrics",
              },
              {
                quote:
                  "I was skeptical about AI analytics, but the ROI we've seen is incredible. Our marketing efficiency increased by 47% in just three months.",
                author: "Emma Rodriguez",
                role: "VP Marketing, BrandLeaders",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
              Choose the plan that&apos;s right for your team&apos;s needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$49",
                features: [
                  "Up to 5 team members",
                  "10,000 data points per month",
                  "5 data sources",
                  "Basic predictive analytics",
                  "Standard dashboards",
                  "Email support",
                ],
                highlighted: false,
              },
              {
                name: "Professional",
                price: "$149",
                features: [
                  "Up to 20 team members",
                  "1 million data points per month",
                  "Unlimited data sources",
                  "Advanced AI predictions",
                  "Custom dashboards",
                  "Priority support",
                  "API access",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  "Unlimited team members",
                  "Unlimited data processing",
                  "Advanced security features",
                  "Dedicated account manager",
                  "Custom AI model training",
                  "On-premise deployment option",
                  "24/7 phone support",
                ],
                highlighted: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`
                  bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 
                  ${
                    plan.highlighted
                      ? "ring-2 ring-indigo-600 dark:ring-indigo-400 shadow-xl"
                      : ""
                  }
                `}
              >
                {plan.highlighted && (
                  <div className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.name !== "Enterprise" && (
                    <span className="ml-1 text-xl text-gray-600 dark:text-gray-300">
                      /month
                    </span>
                  )}
                </div>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-800 dark:bg-indigo-600"
                    }`}
                  >
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Start Free Trial"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "How does the AI-powered analytics work?",
                answer:
                  "Our platform uses machine learning algorithms that analyze your data to identify patterns, anomalies, and predictions. The AI continuously learns from new data, making its insights increasingly accurate over time.",
              },
              {
                question: "What kind of data sources can I connect?",
                answer:
                  "DataInsight.ai integrates with databases, cloud storage, SaaS applications, and APIs. We support SQL and NoSQL databases, spreadsheets, CRM systems, marketing platforms, and custom data sources through our API.",
              },
              {
                question: "Do I need a data science team to use this platform?",
                answer:
                  "No. Our platform is designed to be user-friendly for business users without technical expertise. The natural language interface lets you ask questions in plain English, while our automated insights surface important findings without manual analysis.",
              },
              {
                question: "How secure is my data?",
                answer:
                  "We implement bank-level security with SOC 2 and GDPR compliance. All data is encrypted both in transit and at rest. Enterprise plans include advanced security features like SSO, role-based access control, and audit logs.",
              },
              {
                question: "Can I try before I buy?",
                answer:
                  "Yes! We offer a 14-day free trial with no credit card required. You'll get full access to all features to evaluate if DataInsight.ai is right for your needs.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 pb-8"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 dark:bg-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to transform your data into actionable insights?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-indigo-100 mx-auto">
            Join thousands of data-driven companies making smarter decisions
            every day.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="font-semibold bg-white text-indigo-600 hover:bg-indigo-50"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold text-white border-white hover:bg-indigo-700"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold text-indigo-400 mb-4">
                DataInsight.ai
              </div>
              <p className="text-gray-400">
                Transforming complex data into actionable intelligence with AI.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2023 DataInsight.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
