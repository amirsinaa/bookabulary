import type { definitions } from '@/types/supabase-open-api'
import { supabase } from '@/api/supabase-client'


export const UPDATE_PROFILE = async (user, updates) => {

  const { error, status } = await supabase.from('profiles').update(updates).eq('id', user.id).select();

  return {
    error,
    status
  }
}