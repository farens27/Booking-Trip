"use client";

import { useEffect, useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const themeCycle = ["light", "dark", "system"] as const;

const themeMeta = {
  light: { label: "Switch to dark theme", icon: Sun },
  dark: { label: "Use system theme", icon: Moon },
  system: { label: "Switch to light theme", icon: Laptop },
};

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme = "system", setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "light" || theme === "dark" ? theme : "system";
  const Icon = mounted ? themeMeta[currentTheme].icon : Laptop;

  const cycleTheme = () => {
    const currentIndex = themeCycle.indexOf(currentTheme);
    setTheme(themeCycle[(currentIndex + 1) % themeCycle.length]);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="rounded-full text-foreground/70 hover:text-primary"
      aria-label={mounted ? themeMeta[currentTheme].label : "Toggle theme"}
      title={mounted ? `Theme: ${currentTheme}` : "Toggle theme"}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </Button>
  );
}
