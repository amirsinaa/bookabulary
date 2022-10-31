import type {
  ProfileForm,
  ProfileState,
  ProfileAction,
  ProfileReducerFunc
} from '@/components/user/types/profile';
import { useProfile } from '@/components/user/hooks/use-profile';
import { supabase } from '@/api/supabase-client'
import { useReducer, useEffect } from 'react';
import { EditAvatar } from './edit-avatar';

function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  const { type, payload } = action
  switch (type) {
    case 'SET_UPDATE_STATUS':
      return { ...state, isUpdating: payload.isUpdating }
    case 'SET_USERNAME':
      return { ...state, username: payload.username }
    case 'SET_WEBSITE':
      return { ...state, website: payload.website }
    case 'SET_AVATAR':
      return { ...state, avatarUrl: payload.avatarUrl }
    case 'SET_ERROR':
      return { ...state, error: payload.error }
    default:
      throw Error('Unkown action');
  }
}

export function ProfileForm({ session }) {
  const [profileState, profileDispatch] = useReducer<ProfileReducerFunc>(profileReducer, {
    username: '',
    website: '',
    avatarUrl: '',
    isUpdating: false,
    error: null
  });

  const { loading, error: profileError, profile } = useProfile(session)
  const { isUpdating, username, website, avatarUrl, error } = profileState;

  useEffect(() => {
    if (profile) {
      if (profileError) {
        profileDispatch({ type: 'SET_ERROR', payload: { error: profileError.message } })
      }
      profileDispatch({ type: 'SET_USERNAME', payload: { username: profile.username } })
      profileDispatch({ type: 'SET_WEBSITE', payload: { website: profile.website } })
      profileDispatch({ type: 'SET_AVATAR', payload: { avatarUrl: profile.avatarUrl } })
    }
  }, [profile])

  async function updateProfile({
    e,
    username,
    website,
    avatarUrl: avatar_url,
  }: ProfileForm) {
    try {
      profileDispatch({
        type: 'SET_UPDATE_STATUS',
        payload: { isUpdating: true }
      })

      e.preventDefault()

      const updates = {
        username,
        website,
        avatar_url,
        id: session.user.id
      }

      const { error } = await supabase.from('profiles').update(updates).eq('id', session.user.id).select("*")

      if (error) {
        throw error
      }
    } catch (error) {
      profileDispatch({ type: 'SET_ERROR', payload: { error: error.message } })

    }
    finally {
      profileDispatch({ type: 'SET_UPDATE_STATUS', payload: { isUpdating: false } })
    }
  }

  if (loading) {
    return <p>Loading…</p>
  }

  if (error) {
    return <p>
      {error.message}
    </p>
  }

  return (
    <>
      <form className={`flex flex-col space-y-4 ${isUpdating ? 'opacity-0' : ''}`}>
        <div className="form-group">
          <EditAvatar url={avatarUrl} onUpload={(url) => profileDispatch({
            type: 'SET_AVATAR', payload: { avatarUrl: url }
          })
          } />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="username">
            Name
          </label>
          <input
            className="field"
            disabled={isUpdating}
            id="username"
            type="text"
            value={username}
            onChange={(e) => profileDispatch({
              type: 'SET_USERNAME', payload: { username: e.target.value }
            })}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="website">
            Website
          </label>
          <input
            className="field"
            disabled={isUpdating}
            id="website"
            type="website"
            value={website}
            onChange={(e) => profileDispatch({
              type: 'SET_WEBSITE', payload: { website: e.target.value }
            })}
          />
        </div>
        <div>
          <button
            className="btn"
            onClick={(e) => updateProfile({ e, username, website, avatarUrl })}
            disabled={isUpdating}
          >
            Update
          </button>
        </div>
      </form>
    </>
  )
}
