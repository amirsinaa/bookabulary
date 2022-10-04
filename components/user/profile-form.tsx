import { AuthSession } from '@supabase/supabase-js';
import { useProfile } from '@/hooks/use-profile';
import { supabase } from '@/api/supabase-client';
import { useState, useEffect } from 'react';
import { EditAvatar } from './edit-avatar';

export interface Props {
  session: AuthSession
}

export function ProfileForm({ session }: Props) {
  const [updating, setUpdating] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [avatar_url, setAvatarUrl] = useState<string>('')
  const { loading, error, profile } = useProfile(session)

  useEffect(() => {
    if (profile) {
      setUsername(profile.username)
      setWebsite(profile.website)
      setAvatarUrl(profile.avatarUrl)
    }
  }, [profile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setUpdating(true)
      const user = supabase.auth.user()!

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return <p>Loading…</p>
  }

  if (error) {
    return <p>An error occured when fetching your profile information.</p>
  }

  return (
    <form className="flex flex-col space-y-4">
      <div className="form-group">
        <EditAvatar url={avatar_url} onUpload={(url) => setAvatarUrl(url)} />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="field"
          id="email"
          type="text"
          value={session.user!.email}
          disabled
        />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="username">
          Name
        </label>
        <input
          className="field"
          disabled={updating}
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="website">
          Website
        </label>
        <input
          className="field"
          disabled={updating}
          id="website"
          type="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <button
          className="btn"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={updating}
        >
          {updating ? 'Updating…' : 'Update'}
        </button>
      </div>
    </form>
  )
}
