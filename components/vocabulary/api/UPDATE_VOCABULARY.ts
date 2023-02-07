import type { definitions } from "@/types/supabase-open-api";
import { supabase } from "@/api/supabase-client";

export const UPDATE_VOCABULARY = async (vocabulary) => {
  const { vocabularyId, bookId, updates } = vocabulary
  const { data, error } = await supabase.from<definitions["vocabulary"]>('vocabulary').update(updates).eq('id', vocabularyId).eq('book_id', bookId).select();

  return { data, error }
}