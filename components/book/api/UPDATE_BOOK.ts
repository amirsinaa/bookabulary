import type { Book } from "@/components/book/types/book";
import { supabase } from "@/api/supabase-client";

export const UPDATE_BOOK = async (id, updates) => {
  console.log(id)
  const { data, error } = await supabase.from('books').upsert(updates).eq('id', id).select();

  return { data, error }
}