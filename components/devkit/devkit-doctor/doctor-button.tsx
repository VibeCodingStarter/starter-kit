import { Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";

interface DoctorButtonProps {
  onClick: () => void;
}

export const DoctorButton = ({ onClick }: DoctorButtonProps) => {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Detect if user is on Mac
    setIsMac(navigator.userAgent.indexOf("Mac") !== -1);
  }, []);

  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-50 flex h-12 items-center gap-2 px-4 rounded-full bg-black dark:bg-white shadow-lg hover:opacity-90 transition-opacity"
      aria-label="Open Devkit Doctor"
    >
      <Stethoscope className="h-6 w-6 stroke-[2px] text-white dark:text-black" />
      <span className="text-sm font-medium text-white dark:text-black">
        {isMac ? "⌘+K" : "CTRL+K"}
      </span>
    </button>
  );
};
