"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PageHeader from "@/components/generic/page-header";
import CTAButton from "@/components/generic/cta-button";

interface Generation {
  id: string;
  instructions: string;
  status: "pending" | "processing" | "completed" | "failed";
  generated_image_url?: string;
  created_at: string;
  example_images: string[];
}

const MAX_FILE_COUNT = 5;
const FILE_SIZE_LIMIT_BYTES = 10 * 1024 * 1024; // 10MB
const FILE_SIZE_LIMIT_MB = (FILE_SIZE_LIMIT_BYTES / 1024 / 1024).toFixed(1);
const INSTRUCTIONS_CHAR_LIMIT = 1000;

// Get API base URL from environment or default to localhost
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export default function ImageGenUseCasePage() {
  const [instructions, setInstructions] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > MAX_FILE_COUNT) {
      setError(`Maximum ${MAX_FILE_COUNT} files allowed`);
      return;
    }

    // Validate file sizes
    for (const file of selectedFiles) {
      if (file.size > FILE_SIZE_LIMIT_BYTES) {
        setError(`File ${file.name} exceeds ${FILE_SIZE_LIMIT_MB}MB limit`);
        return;
      }
    }

    setFiles(selectedFiles);
    setError(null);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (
      !currentGeneration?.id ||
      currentGeneration.status === "completed" ||
      currentGeneration.status === "failed"
    ) {
      return;
    }

    const pollStatus = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/generation/anonymous-generations/${currentGeneration.id}/status`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to check status`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format - expected JSON");
        }

        const data = await response.json();
        setCurrentGeneration((prev) => (prev ? { ...prev, ...data } : data));

        if (data.status === "completed" || data.status === "failed") {
          setIsGenerating(false);
        }
      } catch (err) {
        console.error("Status polling failed:", err);
        setError(
          `Failed to check generation status: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
        setIsGenerating(false);
      }
    };

    const intervalId = setInterval(pollStatus, 2000);

    return () => clearInterval(intervalId);
  }, [currentGeneration?.id, currentGeneration?.status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructions.trim()) {
      setError("Instructions are required");
      return;
    }
    if (instructions.trim().length > INSTRUCTIONS_CHAR_LIMIT) {
      setError(
        `Instructions must be ${INSTRUCTIONS_CHAR_LIMIT} characters or less`
      );
      return;
    }
    if (files.length === 0) {
      setError("At least one example image is required");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setCurrentGeneration(null);

    try {
      const formData = new FormData();
      formData.append("instructions", instructions.trim());
      files.forEach((file) => formData.append("files", file));

      const response = await fetch(
        `${API_BASE_URL}/generation/generate-anonymous`,
        {
          method: "POST",
          body: formData,
        }
      );

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: Generation failed`;

        if (contentType && contentType.includes("application/json")) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorMessage;
          } catch {
            // If JSON parsing fails, use the default message
          }
        } else {
          // If response is not JSON, read as text for debugging
          const errorText = await response.text();
          console.error("Non-JSON error response:", errorText);
          errorMessage = `${errorMessage} - Check backend logs for details`;
        }

        throw new Error(errorMessage);
      }

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format - expected JSON");
      }

      const generation = await response.json();
      setCurrentGeneration(generation);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Generation failed";
      setError(errorMessage);
      setIsGenerating(false);
      console.error("Generation error:", err);
    }
  };

  const resetForm = () => {
    setInstructions("");
    setFiles([]);
    setCurrentGeneration(null);
    setError(null);
    setIsGenerating(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* Header Section */}
      <section className="w-full py-20 px-8 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <PageHeader
            title="Image Generation Use Case"
            description="Build powerful image generation and modification applications with AI models."
          >
            <div className="flex gap-4 justify-center mt-8">
              <CTAButton href="/dashboard" variant="primary">
                Try Live Demo
              </CTAButton>
              <CTAButton href="/example-pages/use-cases" variant="secondary">
                Back to Use Cases
              </CTAButton>
            </div>
          </PageHeader>
        </div>
      </section>

      {/* Generation Interface */}
      <section className="w-full py-12 px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          {/* Debug Information */}
          {error && error.includes("404") && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h3 className="text-yellow-800 dark:text-yellow-400 font-semibold mb-2">
                Troubleshooting 404 Error:
              </h3>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 ml-4 list-disc">
                <li>Verify the FastAPI backend is running on {API_BASE_URL}</li>
                <li>
                  Check that the generation endpoints are implemented in your
                  backend
                </li>
                <li>
                  Ensure CORS is configured to allow requests from this domain
                </li>
                <li>Review backend logs for endpoint registration</li>
              </ul>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Generate Your Image
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Instructions Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Instructions ({instructions.length}/1000)
                  </label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Describe what you want to generate or how to modify the uploaded images..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                    rows={4}
                    maxLength={1000}
                    disabled={isGenerating}
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {`Example Images (1-${MAX_FILE_COUNT} files, max ${FILE_SIZE_LIMIT_MB}MB each)`}
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    disabled={isGenerating}
                  />
                </div>

                {/* File Preview */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Selected files:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                            {file.name} ({(file.size / 1024 / 1024).toFixed(1)}
                            MB)
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                            disabled={isGenerating}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={
                    isGenerating || !instructions.trim() || files.length === 0
                  }
                  className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? "Generating..." : "Generate Image"}
                </button>
              </form>

              {currentGeneration && (
                <button
                  onClick={resetForm}
                  className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Start New Generation
                </button>
              )}
            </div>

            {/* Results Display */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Generation Result
              </h2>

              {!currentGeneration && !isGenerating && (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your generated image will appear here
                  </p>
                </div>
              )}

              {currentGeneration && (
                <div className="space-y-4">
                  {/* Status */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status:
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        currentGeneration.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : currentGeneration.status === "failed"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}
                    >
                      {currentGeneration.status}
                    </span>
                  </div>

                  {/* Generated Image */}
                  {currentGeneration.generated_image_url ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Generated Image:
                      </p>
                      <Image
                        src={currentGeneration.generated_image_url}
                        alt="Generated image"
                        width={800}
                        height={600}
                        className="w-full rounded-lg shadow-lg"
                        style={{ objectFit: "contain" }}
                        unoptimized
                      />
                    </div>
                  ) : currentGeneration.status === "processing" ? (
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Generating your image...
                      </p>
                    </div>
                  ) : null}

                  {/* Example Images */}
                  {currentGeneration.example_images.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Example Images:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {currentGeneration.example_images.map((url, index) => (
                          <Image
                            key={index}
                            src={url}
                            alt={`Example ${index + 1}`}
                            width={200}
                            height={96}
                            className="w-full h-24 object-cover rounded-lg"
                            unoptimized
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Instructions */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Instructions:
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {currentGeneration.instructions}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
