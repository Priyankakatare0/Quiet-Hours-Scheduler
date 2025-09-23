'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabaseClient';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Parse hash from URL
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    // Get access token
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');

    // Optionally, set Supabase session
    if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token });
    }

    // Redirect to dashboard
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
