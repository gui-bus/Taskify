import { Header } from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isErrorPage = router.pathname === "/_error";

  const isSignInPage = router.pathname === "/signin";

  return (
    <SessionProvider session={pageProps.session}>
      {!isErrorPage && !isSignInPage && <Header />}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
