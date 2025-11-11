import * as Dialog from "@radix-ui/react-dialog";
import { DoctorContent } from "./doctor-content";
import { X } from "lucide-react";

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DoctorModal = ({ isOpen, onClose }: DoctorModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[850px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white dark:bg-gray-900 p-6 shadow-lg focus:outline-none overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
            DevKit Doctor
          </Dialog.Title>

          <div className="absolute right-4 top-4">
            <Dialog.Close asChild>
              <button
                className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-6">
            <DoctorContent onClose={onClose} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
