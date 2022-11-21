import type { ProfileForm } from '@/components/user/types/profile';
import { useProfile } from '@/components/user/hooks/use-profile';
import { EditAvatar } from '@/components/user/views/edit-avatar';
import { Input } from "@/components/common/input";
import { useState, useEffect } from 'react';

export function ProfileForm({ user }) {
  const [{ profile }, { update }] = useProfile(user);
  const { loading, error, data } = profile;

  const [avatarUrl, setAvatarUrl] = useState('');
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    if (!!data) {
      setAvatarUrl(profile.data.avatarUrl);
      setUsername(profile.data.username);
      setWebsite(profile.data.website);
    }
  }, [data]);

  if (loading) return <p>Loading…</p>;

  if (error) return <p>{error.toString()}</p>;

  return (
    <>
      <form className={`flex flex-col space-y-4 ${loading ? 'opacity-0' : ''}`}>
        <div className="form-group">
          <EditAvatar url={avatarUrl} onUpload={(url) => setAvatarUrl(url)} />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="username">
            Name
          </label>
          <Input
            disabled={loading}
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="website">
            Website
          </label>
          <Input
            disabled={loading}
            id="website"
            name="website"
            type="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
          <button
            className="w-full btn"
            onClick={(e) => update(e, { username, website, avatarUrl })}
            disabled={loading}
          >
            Update
          </button>
        </div>
      </form>
    </>
  )
}
