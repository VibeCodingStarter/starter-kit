"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Terminal,
  Copy,
  CheckCircle,
  ArrowRight,
  Github,
  FileCode,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDeploymentMode } from "@/lib/auth-context";

export default function GetStarted() {
  const deploymentMode = useDeploymentMode();
  const isLocal = deploymentMode.mode === "project";
  const getStartedLink = isLocal ? "/dashboard" : "/console";

  const [copied, setCopied] = useState(false);
  const [isWindows, setIsWindows] = useState(false);

  useEffect(() => {
    setIsWindows(navigator.platform.toLowerCase().includes("win"));
  }, []);

  const unixCommand = `printf "Project name (default: my-ai-app): " && read PROJECT_NAME && PROJECT_NAME=\${PROJECT_NAME:-my-ai-app} && git clone https://github.com/VibeCodingStarter/starter-kit.git $PROJECT_NAME && cd $PROJECT_NAME && npm install && cp .env.example .env.local && npm run dev`;

  const windowsCommand = `$PROJECT_NAME = Read-Host "Project name (default: my-ai-app)"; if (!$PROJECT_NAME) { $PROJECT_NAME = "my-ai-app" }; git clone https://github.com/VibeCodingStarter/starter-kit.git $PROJECT_NAME; cd $PROJECT_NAME; npm install; Copy-Item .env.example .env.local; npm run dev`;

  const installCommand = isWindows ? windowsCommand : unixCommand;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const steps = [
    {
      step: "1",
      title: "Clone the repo",
      description: "Get started with a single command",
      time: "30 seconds",
    },
    {
      step: "2",
      title: "Configure your keys",
      description: "Add your API keys to .env file",
      time: "2 minutes",
    },
    {
      step: "3",
      title: "Start building",
      description: "Run the dev server and customize",
      time: "Unlimited",
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-white dark:bg-[#0A0A0F] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get started in minutes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            No complex setup. No backend configuration. Just clone and start
            building.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Command section */}
          <Card className="border-0 bg-gray-900 dark:bg-white/5 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-green-400" />
                <span className="text-gray-400 font-mono text-sm">
                  Terminal
                </span>
              </div>

              <div className="bg-black/50 rounded-lg p-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1 font-mono text-sm">
                      <div className="text-green-400">
                        <span className="text-gray-500">$</span> git clone
                        https://github.com/VibeCodingStarter/starter-kit.git{" "}
                        <span className="text-blue-400">
                          [your-project-name]
                        </span>
                      </div>
                      <div className="text-green-400">
                        <span className="text-gray-500">$</span> cd{" "}
                        <span className="text-blue-400">
                          [your-project-name]
                        </span>
                      </div>
                      <div className="text-green-400">
                        <span className="text-gray-500">$</span> npm install
                      </div>
                      <div className="text-green-400">
                        <span className="text-gray-500">$</span> cp .env.example
                        .env.local
                      </div>
                      <div className="text-green-400">
                        <span className="text-gray-500">$</span> npm run dev
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="flex-shrink-0 text-gray-400 hover:text-white"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Click Copy to get the one-line command for your terminal
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                      {step.step}
                    </div>
                    <h3 className="text-white font-semibold mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{step.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="border-0 bg-white dark:bg-white/5 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mx-auto">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    View Source
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Explore the codebase on GitHub
                  </p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href="https://github.com/VibeCodingStarter/starter-kit"
                    target="_blank"
                  >
                    GitHub Repo
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white dark:bg-white/5 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mx-auto">
                  <FileCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Documentation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Read the full setup guide
                  </p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="https://docs.devkit4ai.com" target="_blank">
                    View Docs
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-600 to-purple-600 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white mx-auto">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Start Now</h3>
                  <p className="text-sm text-blue-100">
                    Jump into your dashboard
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Link href={getStartedLink}>
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
