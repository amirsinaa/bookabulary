import { PostgrestError } from '@supabase/supabase-js';
import { User } from "@supabase/supabase-js";
import type { Action } from '@/types/react';

export type User = {
  user: User & {
    id: string;
    aud: string;
    role: string;
    email: string;
    email_confirmed_at: string;
    phone: string;
    confirmation_sent_at: string;
    confirmed_at: string;
    recovery_sent_at: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
  }
}

export interface Profile {
  data: {
    username?: string;
    website?: string;
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