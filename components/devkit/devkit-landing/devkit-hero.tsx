"use client";

import PageHeader from "@/components/generic/page-header";
import CTAButton from "@/components/generic/cta-button";

export default function DevkitHero() {
  return (
    <>
      <section className="w-full py-24 px-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <PageHeader
            title="Dev Kit for AI: Supercharge Your Development"
            description="Building blocks for AI-enabled SaaS applications: AI Text, Image, Video, Chat, Voice generations. OpenAI, Google, Anthropic, and other AI integrations. Payment gateways, user management, admin dashboards."
          >
            <div className="flex gap-4 justify-center mt-8">
              <CTAButton href="https://www.appbaza.com/aikit" variant="primary">
                Get Dev Kit for AI 🔐
              </CTAButton>
              <CTAButton href="https://www.appbaza.com/dev-kit-for-ai" variant="secondary">
                Take Special Free Course 🎓
              </CTAButton>
            </div>
          </PageHeader>
        </div>
      </section>
    </>
  );
};
