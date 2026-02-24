import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme, type ThemeOptions } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { light, dark } from "../scss/MaterialTheme";
import { useState, useEffect, useMemo } from "react";

import ScrollToTop from "@/libs/components/ScrollTotop";
import Chat from "@/libs/components/Chat";
import AIChatBot from "@/libs/components/AIChatBot";
import { CartProvider } from "@/libs/context/CartContext";
import {
  ThemeContext,
  getStoredThemeMode,
  storeThemeMode,
  type ThemeMode,
} from "@/libs/context/ThemeContext";
import {
  LocaleContext,
  getStoredLocale,
  storeLocale,
  type Locale,
} from "@/libs/context/LocaleContext";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/apollo/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../scss/app.scss";
import "../scss/pc/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [mode, setMode] = useState<ThemeMode>("light");
  const [locale, setLocaleState] = useState<Locale>("en");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMode(getStoredThemeMode());
    setLocaleState(getStoredLocale());
    setHydrated(true);
  }, []);

  // Hydrate user state from stored token so header shows My Page / Logout after refresh or login (client-only to avoid SSR loading auth/sweetAlert)
  useEffect(() => {
    import("@/libs/auth").then(({ getJwtToken, updateUserInfo }) => {
      const token = getJwtToken();
      if (token) updateUserInfo(token);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    storeThemeMode(mode);
    document.documentElement.classList.toggle("theme-dark", mode === "dark");
  }, [mode, hydrated]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    storeLocale(next);
  };

  const theme = useMemo(
    () => createTheme((mode === "dark" ? dark : light) as ThemeOptions),
    [mode]
  );

  const apolloClient = useApollo(pageProps.initialApolloState);
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
    <ApolloProvider client={apolloClient}>
      <ThemeContext.Provider value={{ mode, setMode }}>
        <LocaleContext.Provider value={{ locale, setLocale }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CartProvider>
            <Component {...pageProps} />
            <ScrollToTop />
            <Chat />
            <AIChatBot />
          </CartProvider>
        </ThemeProvider>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    </ApolloProvider>
    </GoogleOAuthProvider>
  );
}
