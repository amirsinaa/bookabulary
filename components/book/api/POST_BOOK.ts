import type { definitions } from '@/types/supabase-open-api';
import { supabase } from '@/api/supabase-client';

export const POST_BOOK = async (book) => {
  const { data, error } = await supabase.from<definitions["books"]>('books').upsert(book).single();

  return { data, error }
}