import type { definitions } from "@/types/supabase-open-api";
import { supabase } from "@/api/supabase-client";

export const GET_BOOKS_LIST = async (title: string) => {
  const { data, error } = await supabase.from<definitions["books"]>("books").select().textSearch("name", `"${title}"`, {
    type: "websearch",
    config: "english"
  });
  return { data, error }
}