import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import { QueryClientProvider } from 'react-query';

import { AuthProvider } from 'hooks/useAuth';
import { ConfirmProvider } from 'hooks/useConfirm';
import { ScriptProvider } from 'hooks/useScript';
import { ToastProvider } from 'hooks/useToast';
import { WinProvider } from 'hooks/useWin';
import apiMp from 'services/apiMp';
import { queryClient } from 'services/queryClient';
import GlobalStyle from 'styles/global';

import 'moment/locale/pt-br';
import '../styles/globals.css';

function MyApp({ Component,
   pageProps:{ session ,...pageProps} }: any) {

    useEffect(() =>{

      apiMp.get(`/v1/payments/52001264346?access_token=APP_USR-4558303275525787-111917-e9a8706468047ca3af9286de9508a3b2-1134907112`)
      .then((response) =>{
      })
    },[])

  return (
    <SessionProvider session={session}>
      <NextNProgress height={2} color="gold" />
      <QueryClientProvider client ={queryClient}>
        <ToastProvider>
          <AuthProvider>
            <ConfirmProvider>
              <WinProvider>
                <ScriptProvider>
                  <GlobalStyle/>
                  <Component {...pageProps} />
                </ScriptProvider>
              </WinProvider>
            </ConfirmProvider>
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
