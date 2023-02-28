import { supabase } from "@/api/supabase-client";

export const GET_USERS_BOOKS_LIST = async (userId) => {
  const { data, error } = await supabase.from("books").select("*").eq('profile_id', userId).order("created_at", { ascending: false });
  return { data, error }
}