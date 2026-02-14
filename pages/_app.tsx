import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme, type ThemeOptions } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { light, dark } from "../scss/MaterialTheme";
import { useState, useEffect, useMemo } from "react";

import ScrollToTop from "@/libs/components/ScrollTotop";
import Chat from "@/libs/components/Chat";
import { CartProvider } from "@/libs/context/CartContext";
import {
  ThemeContext,
  getStoredThemeMode,
  storeThemeMode,
  type ThemeMode,
} from "@/libs/context/ThemeContext";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/apollo/client";
import "../scss/app.scss";
import "../scss/pc/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [mode, setMode] = useState<ThemeMode>("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMode(getStoredThemeMode());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    storeThemeMode(mode);
    document.documentElement.classList.toggle("theme-dark", mode === "dark");
  }, [mode, hydrated]);

  const theme = useMemo(
    () => createTheme((mode === "dark" ? dark : light) as ThemeOptions),
    [mode]
  );

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CartProvider>
            <Component {...pageProps} />
            <ScrollToTop />
            <Chat />
          </CartProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </ApolloProvider>
  );
}
