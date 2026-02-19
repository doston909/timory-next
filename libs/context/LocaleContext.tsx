import React, { createContext, useContext } from "react";

const LOCALE_STORAGE_KEY = "timory-locale";

export type Locale = "en" | "ko" | "ru";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (ctx === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === "ko" || stored === "ru") return stored;
  return "en";
}

export function storeLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

export { LocaleContext, LOCALE_STORAGE_KEY };
