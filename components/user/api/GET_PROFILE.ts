import type { definitions } from '@/types/supabase-open-api'
import { supabase } from '@/api/supabase-client'


export const GET_PROFILE = async (user: string) => {
  const { data, error, status } = await supabase
    .from<definitions["profiles"]>('profiles')
    .select(`username, website`)
    .eq('id', user)
    .single();

  return {
    data,
    error,
    status
  }
}