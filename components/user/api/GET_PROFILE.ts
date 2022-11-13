import type { definitions } from '@/types/supabase-open-api'
import { supabase } from '@/api/supabase-client'


export const GET_PROFILE = async (user) => {
  const { data, error, status } = await supabase
    .from<definitions["profiles"]>('profiles')
    .select(`username, website, avatar_url`)
    .eq('id', user.id)
    .single()

  return {
    data,
    error,
    status
  }
}