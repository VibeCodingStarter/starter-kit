"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          "transition-colors"
        )}
      >
        {theme === "light" ? (
          <Sun size={ICON_SIZE} className="text-muted-foreground" />
        ) : theme === "dark" ? (
          <Moon size={ICON_SIZE} className="text-muted-foreground" />
        ) : (
          <Laptop size={ICON_SIZE} className="text-muted-foreground" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="min-w-[10rem]"
      >
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => {
            setTheme(value);
            setOpen(false);
          }}
        >
          <DropdownMenuRadioItem value="light" className="gap-2">
            <Sun size={ICON_SIZE} className="text-muted-foreground" />
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className="gap-2">
            <Moon size={ICON_SIZE} className="text-muted-foreground" />
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" className="gap-2">
            <Laptop size={ICON_SIZE} className="text-muted-foreground" />
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
