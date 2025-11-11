"use client";

import { useState, useEffect } from "react";
import { DoctorButton } from "./doctor-button";
import { DoctorModal } from "./doctor-modal";

export const DevkitDoctor = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <DoctorButton onClick={() => setIsOpen(true)} />
      <DoctorModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
