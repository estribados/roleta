import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';
import { QueryClientProvider } from 'react-query';

import { AuthProvider } from 'hooks/useAuth';
import { ConfirmProvider } from 'hooks/useConfirm';
import { ScriptProvider } from 'hooks/useScript';
import { ToastProvider } from 'hooks/useToast';
import { WinProvider } from 'hooks/useWin';
import { queryClient } from 'services/queryClient';
import GlobalStyle from 'styles/global';

import '../styles/globals.css';
import 'moment/locale/pt-br';

function MyApp({ Component,
   pageProps:{ session ,...pageProps} }: any) {

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
