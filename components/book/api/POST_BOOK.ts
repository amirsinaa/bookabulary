import type { definitions } from "@/types/supabase-open-api";
import type { Book } from "@/components/book/types/book";
import { supabase } from "@/api/supabase-client";

export const POST_BOOK = async (book: Book) => {
  const { data, error } = await supabase.from("books").upsert(book).single();

  return { data, error }
}