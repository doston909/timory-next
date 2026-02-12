import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { light } from "../scss/MaterialTheme";
import { useState } from "react";

import ScrollToTop from "@/libs/components/ScrollTotop";
import { CartProvider } from "@/libs/context/CartContext";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/apollo/client";
import "../scss/app.scss";
import "../scss/pc/main.scss";

export default function App({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const [theme, setTheme] = useState(createTheme(light));
  const apolloClient = useApollo(pageProps.initialApolloState);

  // Socket.io. Redux, Mui, Apollo Client ...
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <Component {...pageProps} />
          <ScrollToTop />
        </CartProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
