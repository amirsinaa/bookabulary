import type { Profile } from '@/components/user/types/profile';
import type { definitions } from '@/types/supabase-open-api'
import type { AuthSession } from '@supabase/supabase-js'
import { supabase } from '@/api/supabase-client'
import { useEffect, useState } from 'react'


export function useProfile(session: AuthSession) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    (async function () {
      try {
        setLoading(true)

        const { data, error, status } = await supabase
          .from<definitions["profiles"]>('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', session.user.id)
          .single()


        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setProfile({
            username: data.username,
            avatarUrl: data.avatar_url,
            website: data.website
          })
        }
      } catch (error: any) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [session])

  return { loading, error, profile }
}