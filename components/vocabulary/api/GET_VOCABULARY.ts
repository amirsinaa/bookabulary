import type { definitions } from "@/types/supabase-open-api";
import { supabase } from "@/api/supabase-client";

export const GET_VOCABULARY = async (vocabularyId: string) => {
  const { data, error } = await supabase.from("vocabulary").select("*").eq('id', vocabularyId).single();

  return { data, error }
}