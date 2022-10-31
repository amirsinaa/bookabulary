import { PostgrestError } from '@supabase/supabase-js';
import type { Action } from '@/types/react';

export interface Profile {
  username?: string,
  website?: string,
  avatarUrl?: string
}

export type ProfileAction =
  | Action<'SET_UPDATE_STATUS', { isUpdating: boolean }>
  | Action<'SET_USERNAME', { username: string }>
  | Action<'SET_WEBSITE', { website: string }>
  | Action<'SET_AVATAR', { avatarUrl: string }>
  | Action<'SET_ERROR', { error: PostgrestError }>;

interface ProfileState extends Profile {
  isUpdating?: boolean,
  error?: PostgrestError
}

export type ProfileReducerFunc = (state: ProfileState, action: ProfileAction) => ProfileState;

export interface ProfileForm extends Profile {
  e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
}