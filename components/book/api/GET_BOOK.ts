import type { definitions } from '@/types/supabase-open-api'
import { supabase } from '@/api/supabase-client'

export const GET_BOOK = async (id) => {
  const { data, error } = await supabase.from<definitions["books"]>('books').select('*').eq('id', id).single();

  return { data, error }
}