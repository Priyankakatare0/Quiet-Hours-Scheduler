'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../utils/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // 1️⃣ Exchange the code/hash in the URL for a session
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href)

        if (error) {
          console.error('Auth callback error:', error)
          router.push('/login?error=auth_failed')
          return
        }

        // 2️⃣ Now Supabase has stored the session internally
        if (data.session) {
          router.push('/dashboard') // user is authenticated
        } else {
          router.push('/login') // no session
        }
      } catch (err) {
        console.error('Unexpected auth error:', err)
        router.push('/login?error=unexpected')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#012e2e] to-gray-900 text-gray-200 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Authenticating...</p>
      </div>
    </div>
  )
}
