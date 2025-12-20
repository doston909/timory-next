import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { light } from "../scss/MaterialTheme";
import { useState } from "react";
import "../scss/app.scss";
import "../scss/pc/main.scss";
import ScrollToTop from "@/libs/components/ScrollTotop";
import { CartProvider } from "@/libs/context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const [theme, setTheme] = useState(createTheme(light));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Component {...pageProps} />
        <ScrollToTop />
      </CartProvider>
    </ThemeProvider>
  );
}