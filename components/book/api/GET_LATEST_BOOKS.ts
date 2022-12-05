import type { definitions } from "@/types/supabase-open-api";
import { supabase } from "@/api/supabase-client";

export const GET_LATEST_BOOKS = async (limit: number) => {
  const { data, error } = await supabase.from<definitions["books"]>("books").select("*").order("created_at", { ascending: false }).limit(limit);
  return { data, error }
}