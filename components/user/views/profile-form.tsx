import { useProfile } from "@/components/user/hooks/use-profile";
import { User } from "@/components/user/types/profile";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/common/input";
import ReactQueryUiErrorHandler from "@/components/common/react-query-ui-error";

export function ProfileForm({ user }: User) {
  const [username, setUsername] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [{ profile }, { update }] = useProfile(user.id);
  const { loading, error, data } = profile;

  useEffect(() => {
    if (!!data) {
      setUsername(profile.data.username);
      setWebsite(profile.data.website);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error instanceof Error) return <ReactQueryUiErrorHandler queryKey={data} />;

  return (
    <form
      className="flex flex-col space-y-4" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        return update({ username, website });
      }
      }>
      <div className="form-group">
        <label className="label" htmlFor="username">
          Name
        </label>
        <Input
          disabled={loading}
          id="username"
          name="username"
          type="text"
          isLoading={loading}
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
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
          isLoading={loading}
          value={website}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <button
          className={`w-full btn ${loading ? 'animate-pulse' : ''}`}
          disabled={loading}
        >
          {loading ? 'Updating ...' : 'Update'}
        </button>
      </div>
    </form>
  )
}