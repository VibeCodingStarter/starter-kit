"use client";

import InfoBox from "@/components/generic/info-box";

export default function DevKitAiFeatures() {
  return (
    <>
      <section className="w-full py-20 px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            AI-Powered Development Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <InfoBox className="!text-left">
              <h3 className="text-xl font-semibold mb-2">
                Smart Code Generation
              </h3>
              <p>
                Our AI analyzes your codebase to suggest and generate code that
                matches your patterns and standards.
              </p>
            </InfoBox>
            <InfoBox className="!text-left">
              <h3 className="text-xl font-semibold mb-2">
                Intelligent Debugging
              </h3>
              <p>
                Identify and fix bugs faster with AI-powered analysis that
                points to the root cause and suggests solutions.
              </p>
            </InfoBox>
            <InfoBox className="!text-left">
              <h3 className="text-xl font-semibold mb-2">Automated Testing</h3>
              <p>
                Generate comprehensive test suites automatically based on your
                code&apos;s functionality and edge cases.
              </p>
            </InfoBox>
          </div>
        </div>
      </section>
    </>
  );
}
