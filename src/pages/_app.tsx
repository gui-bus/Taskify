import { Header } from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { Footer } from "@/components/footer";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isErrorPage = router.pathname === "/_error";

  const isSignInPage = router.pathname === "/signin";

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col min-h-screen">
        {!isErrorPage && !isSignInPage && <Header />}
        <div className="flex-grow">
          <Component {...pageProps} />
        </div>

        {!isErrorPage && !isSignInPage && <Footer />}
      </div>
    </SessionProvider>
  );
}

