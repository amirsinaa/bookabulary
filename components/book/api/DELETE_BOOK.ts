import { supabase } from "@/api/supabase-client";

export const DELETE_BOOK = async (id: string) => {
  const { error } = await supabase.from('books').delete().eq('id', id);

  return { error }
}