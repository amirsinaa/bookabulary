import type {
  ProfileState,
  ProfileAction,
  ProfileReducerFunc
} from '@/components/user/types/profile';
import { UPDATE_PROFILE } from '@/components/user/api/UPDATE_PROFILE';
import { GET_PROFILE } from '@/components/user/api/GET_PROFILE';
import type { User } from '@supabase/supabase-js';
import { useEffect, useReducer } from 'react';

function profileReducer(state: ProfileState, action: ProfileAction) {
  const { type, payload } = action
  switch (type) {
    case 'SET_LOADING':
      return { ...state, loading: payload.loading }
    case 'SET_PROFILE':
      return {
        ...state, data: {
          username: payload.data.username,
          website: payload.data.website,
          avatarUrl: payload.data.avatarUrl
        }
      }
    case 'SET_ERROR':
      return { ...state, error: payload.error };
    default:
      throw Error('Unkown action');
  }
}

export function useProfile(user: User) {
  const [profile, profileDispatch] = useReducer<ProfileReducerFunc>(profileReducer, {
    data: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    (async () => {
      try {
        profileDispatch({ type: 'SET_LOADING', payload: { loading: true } });
        const { data, error, status } = await GET_PROFILE(user);
        if (error && status !== 406) {
          profileDispatch({ type: 'SET_ERROR', payload: { error: error.message } });
        }

        if (data) {
          profileDispatch({
            type: 'SET_PROFILE', payload: {
              data: {
                username: data.username,
                avatarUrl: data.avatar_url,
                website: data.website
              }
            }
          });
        }
      } finally {
        profileDispatch({ type: 'SET_LOADING', payload: { loading: false } });
      }

    })();
  }, [user]);

  const update = async (e, profile) => {
    try {
      profileDispatch({ type: 'SET_LOADING', payload: { loading: true } });
      e.preventDefault();

      const updates = {
        avatar_url: profile.avatarUrl,
        username: profile.username,
        website: profile.website,
        id: user.id
      }

      const { error, status } = await UPDATE_PROFILE(user, updates);
      if (error && status !== 200) {
        profileDispatch({ type: 'SET_ERROR', payload: { error: error.message } });
      }

    }
    finally {
      profileDispatch({ type: 'SET_LOADING', payload: { loading: false } });
    }
  }
  return [{ profile }, { update }];
}