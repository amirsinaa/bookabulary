import type { definitions } from "@/types/supabase-open-api";
import { supabase } from "@/api/supabase-client";

export const CREATE_VOCABULARY = async (vocabulary) => {
  const { bookId, updates } = vocabulary
  const { data, error } = await supabase.from<definitions["vocabulary"]>('vocabulary').upsert(updates).eq('book_id', bookId).single();

  return { data, error }
}