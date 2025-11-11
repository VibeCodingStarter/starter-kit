"use client";

import CTAButton from "@/components/generic/cta-button";

export default function DevKitCTA() {
  return (
    <section className="w-full py-20 px-8 bg-blue-600 dark:bg-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Development Process?
          </h2>
          <p className="text-blue-100 mb-8">
            Join thousands of developers and teams who ship better code, faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/signup"
              className="!bg-white !text-blue-600 hover:!bg-blue-50 dark:!bg-white dark:!text-blue-600 dark:hover:!bg-blue-50"
            >
              Start Free Trial
            </CTAButton>
            <CTAButton
              href="/demo"
              className="!bg-transparent !border-2 !border-white !text-white hover:!bg-blue-700"
            >
              Schedule Demo
            </CTAButton>
          </div>
        </div>
      </section>
  );
}
