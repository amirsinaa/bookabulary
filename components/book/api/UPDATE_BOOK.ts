import { supabase } from "@/api/supabase-client";

export const UPDATE_BOOK = async (id, updates) => {
  const { data, error } = await supabase.from('books').upsert(updates).eq('id', id).select();

  return { data, error }
}