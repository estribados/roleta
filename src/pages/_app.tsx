import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { QueryClientProvider } from "react-query";

import { AuthProvider } from "hooks/useAuth";
import { ConfirmProvider } from "hooks/useConfirm";
import { ScriptProvider } from "hooks/useScript";
import { ToastProvider } from "hooks/useToast";
import { WinProvider } from "hooks/useWin";
import apiMp from "services/apiMp";
import { queryClient } from "services/queryClient";
import GlobalStyle from "styles/global";
import Head from "next/head";
import { useRouter } from "next/router";

import "moment/locale/pt-br";
import "../styles/globals.css";
import Header from "components/Header";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a versão sem www se estiver acessando com www
    if (router.asPath.startsWith("www.")) {
      const url = `https://${router.asPath.slice(4)}`;
      window.location.href = url;
    }
  }, [router.asPath]);

  useEffect(() => {
    apiMp
      .get(
        `/v1/payments/52001264346?access_token=APP_USR-4558303275525787-111917-e9a8706468047ca3af9286de9508a3b2-1134907112`
      )
      .then((response) => {});
  }, []);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Roleta</title>
        <link rel="shortcut icon" href="/images/money-bag.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Esse jogo bem divertido onde se pode apostar em uma roleta incrivel, podendo ganhar ate 10x mais do valor jogado em varias roletas de valores diferentes"
        ></meta>
      </Head>
      <NextNProgress height={2} color="gold" />
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthProvider>
            <ConfirmProvider>
              <WinProvider>
                <ScriptProvider>
                  <GlobalStyle />
                  <Header />
                  <Component {...pageProps} />
                </ScriptProvider>
              </WinProvider>
            </ConfirmProvider>
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
