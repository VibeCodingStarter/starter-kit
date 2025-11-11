"use client";

interface InfoBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function InfoBox({ children }: InfoBoxProps) {
  return (
    <div className="w-full max-w-5xl mx-auto m-4 px-8 py-12 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="text-lg leading-relaxed">
        {children}
      </div>
    </div>
  );
}
