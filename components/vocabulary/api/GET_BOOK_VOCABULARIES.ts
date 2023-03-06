import { supabase } from "@/api/supabase-client";

export const GET_BOOK_ALL_VOCABULARIES = async (bookId: string) => {
  const { data, error } = await supabase.from("vocabulary").select("*").eq('book_id', bookId);

  return { data, error }
}

export const GET_BOOK_PUBLIC_VOCABULARIES = async (bookId: string) => {
  const { data, error } = await supabase.from("vocabulary").select("*").eq('book_id', bookId).eq('is_private', false);

  return { data, error }
}