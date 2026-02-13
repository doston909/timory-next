import React, { createContext, useContext, ReactNode } from "react";

const THEME_STORAGE_KEY = "timory-theme-mode";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode | ((prev: ThemeMode) => ThemeMode)) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

export function getStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

export function storeThemeMode(mode: ThemeMode) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, mode);
}

export { ThemeContext, THEME_STORAGE_KEY };
