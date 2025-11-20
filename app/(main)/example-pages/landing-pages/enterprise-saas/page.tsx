import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function EnterpriseSaasLandingPage() {
  const features = [
    {
      icon: "🔒",
      title: "Enterprise-Grade Security",
      description:
        "Robust security protocols, SSO, and compliance certifications (SOC 2, ISO 27001) to protect your data.",
    },
    {
      icon: "⚖️",
      title: "Scalability & Performance",
      description:
        "Built to handle millions of users and transactions with high availability and low latency.",
    },
    {
      icon: "⚙️",
      title: "Seamless Integrations",
      description:
        "Connect with your existing enterprise systems (CRM, ERP, HRIS) through our extensive API library.",
    },
    {
      icon: "🎨",
      title: "Customization & Control",
      description:
        "Tailor the platform to your specific workflows with custom fields, roles, and branding.",
    },
    {
      icon: "🤝",
      title: "Dedicated Support & SLA",
      description:
        "24/7 premium support, dedicated account managers, and guaranteed service level agreements.",
    },
    {
      icon: "📊",
      title: "Advanced Analytics & Reporting",
      description:
        "Gain deep insights into your operations with comprehensive dashboards and customizable reports.",
    },
  ];

  const caseStudies = [
    {
      company: "GlobalCorp Inc.",
      title: "Streamlining Operations for a Fortune 500 Company",
      excerpt:
        "Discover how GlobalCorp Inc. reduced operational costs by 30% and improved efficiency by 45% using our platform.",
      logoUrl: "/placeholder-logo1.svg", // Replace with actual logo path
    },
    {
      company: "Innovate Solutions Ltd.",
      title: "Powering Scalable Growth for a Tech Unicorn",
      excerpt:
        "Learn how Innovate Solutions scaled their services to 10 million users with our robust infrastructure and support.",
      logoUrl: "/placeholder-logo2.svg", // Replace with actual logo path
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Navigation */}
      <nav className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-md w-full z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                EnterpriseFlow
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a
                  href="#features"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </a>
                <a
                  href="#solutions"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Solutions
                </a>
                <a
                  href="#casestudies"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Case Studies
                </a>
                <a
                  href="#security"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Security
                </a>
                <Button
                  variant="outline"
                  className="ml-4 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800"
                >
                  Login
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Contact Sales
                </Button>
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
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 dark:from-gray-900 to-white dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">The Operating System</span>
            <span className="block text-blue-600 dark:text-blue-400">
              for Your Enterprise
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            EnterpriseFlow provides a secure, scalable, and integrated platform
            to streamline your complex business operations and drive growth.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button
              size="lg"
              className="font-semibold shadow-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Request a Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Explore Solutions
            </Button>
          </div>
          <div className="mt-12">
            <div className="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-2xl p-2 aspect-video max-w-4xl mx-auto">
              {/* Placeholder for product screenshot or video */}
              <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Product Visual Placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Trusted by Leading Enterprises Worldwide
          </p>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="col-span-1 flex justify-center items-center py-4 px-2"
              >
                <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>{" "}
                {/* Placeholder for logo */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Built for the Modern Enterprise
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
              Our platform offers a comprehensive suite of features designed to
              meet the demands of large-scale organizations.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Solutions
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
              Tailored for Your Industry Needs
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 lg:mx-auto">
              EnterpriseFlow adapts to various industries, providing specialized
              tools and workflows.
            </p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {/* Example Solution Cards */}
            {[
              { name: "Financial Services", icon: "💰" },
              { name: "Healthcare", icon: "⚕️" },
              { name: "Manufacturing", icon: "🏭" },
              { name: "Retail & E-commerce", icon: "🛒" },
              { name: "Government", icon: "🏛️" },
              { name: "Telecommunications", icon: "📡" },
            ].map((solution) => (
              <div
                key={solution.name}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="text-3xl mb-3">{solution.icon}</div>
                <h3 className="text-lg font-medium">{solution.name}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Learn how our platform addresses the unique challenges in{" "}
                  {solution.name.toLowerCase()}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="casestudies" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Success Stories from Our Clients
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
              See how leading enterprises leverage EnterpriseFlow to achieve
              their business goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <div
                key={study.company}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-8">
                  {/* Placeholder for company logo */}
                  <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                  <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {study.excerpt}
                  </p>
                  <Button
                    variant="link"
                    className="text-blue-600 dark:text-blue-400 p-0"
                  >
                    Read Full Case Study →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section
        id="security"
        className="py-20 bg-blue-600 dark:bg-blue-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Uncompromising Security & Compliance
              </h2>
              <p className="mt-4 text-xl text-blue-100 dark:text-blue-200">
                We prioritize the security of your data with industry-leading
                practices and certifications.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "SOC 2 Type II Certified",
                  "ISO 27001 Compliant",
                  "GDPR & CCPA Ready",
                  "End-to-End Encryption",
                  "Regular Security Audits",
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 dark:text-green-300 mr-3" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              {/* Placeholder for security badges or graphic */}
              <div className="w-64 h-64 bg-blue-500 dark:bg-blue-700 rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle className="h-32 w-32 text-white opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Ready to Elevate Your Enterprise Operations?
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Schedule a personalized demo to see how EnterpriseFlow can transform
            your business.
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              className="font-semibold shadow-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Request Your Personalized Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-black text-gray-300 dark:text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold text-blue-400 mb-4">
                EnterpriseFlow
              </div>
              <p className="text-sm">
                Empowering enterprises with scalable and secure solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#solutions" className="hover:text-white">
                    Solutions
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#integrations" className="hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Resources
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#casestudies" className="hover:text-white">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 dark:border-gray-600 text-center text-sm">
            <p>
              © {new Date().getFullYear()} EnterpriseFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
