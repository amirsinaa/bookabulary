import type { definitions } from '@/types/supabase-open-api'
import { supabase } from '@/api/supabase-client'


export const UPDATE_PROFILE = async (id, updates) => {

  const { error, status } = await supabase.from('profiles').upsert(updates).eq('id', id).select();

  return {
    error,
    status
  }
}