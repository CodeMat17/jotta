import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import NavHeader from '../components/NavHeader';
import { supabase } from '../lib/supabaseClient';
import  theme  from '../theme';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const user = supabase.auth.user();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthSession(event, session);
        if (event === 'SIGNED_IN') {
          const signedInUser = supabase.auth.user();
          const userId = signedInUser.id;
          supabase
            .from('profiles')
            .upsert({ id: userId })
            .then((_data, error) => {
              if (!error) {
                router.push('/');
              }
            });
        }
        if (event === 'SIGNED_OUT') {
          router.push('/auth/signin');
        }
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (user) {
      if (router.pathname === '/auth/signin') {
        router.push('/');
      }
    }
  }, [router, user]);

  const handleAuthSession = async (event, session) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <NavHeader />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
