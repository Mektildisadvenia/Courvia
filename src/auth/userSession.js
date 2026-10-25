import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function getCurrentSession() {
  return supabase.auth.getSession();
}

export function getCurrentUser() {
  return supabase.auth.getUser();
}

export function logoutUser() {
  return supabase.auth.signOut();
}

export function useAuthSession() {
  const [authState, setAuthState] = useState({
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    let receivedAuthEvent = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      receivedAuthEvent = true;

      if (isMounted) {
        setAuthState({ session, loading: false, error: null });
      }
    });

    getCurrentSession()
      .then(({ data, error }) => {
        if (!isMounted || receivedAuthEvent) {
          return;
        }

        setAuthState({
          session: data.session,
          loading: false,
          error,
        });
      })
      .catch((error) => {
        if (!isMounted || receivedAuthEvent) {
          return;
        }

        console.error("Gagal memeriksa session Supabase:", error);
        setAuthState({ session: null, loading: false, error });
      });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    ...authState,
    user: authState.session?.user ?? null,
  };
}
