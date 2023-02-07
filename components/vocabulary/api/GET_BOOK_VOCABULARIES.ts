import type { definitions } from "@/types/supabase-open-api";
import { supabase } from "@/api/supabase-client";

export const GET_BOOK_VOCABULARIES = async (bookId: string) => {
  const { data, error } = await supabase.from("vocabulary").select("*").eq('book_id', bookId);

  return { data, error }
}