import { PostgrestError } from '@supabase/supabase-js';
import type { Action } from '@/types/react';

export interface Profile {
  data: {
    username?: string,
    website?: string,
    avatarUrl?: string
  };
}

export interface ProfileError {
  error: PostgrestError | string;
}

export interface ProfileLoading {
  loading: boolean
}

export type ProfileState = (Profile & ProfileError & ProfileLoading) | null;

export type ProfileAction =
  | Action<'SET_PROFILE', Profile>
  | Action<'SET_LOADING', ProfileLoading>
  | Action<'SET_ERROR', ProfileError>;



export type ProfileReducerFunc = (state: ProfileState, action: ProfileAction) => ProfileState;

export interface ProfileForm extends Profile {
  e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>
}