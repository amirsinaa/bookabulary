import { ChangeEventHandler, useEffect, useState } from 'react'
import { useSessionContext } from '@supabase/auth-helpers-react'

export interface Props {
  url: string
  onUpload: (path: string) => void
}

export function EditAvatar({ url, onUpload }: Props) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabaseClient.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data!)
      setAvatarUrl(url)
    } catch (error: any) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar: ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabaseClient.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-row justify-center">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="object-cover w-48 h-48 border rounded-full"
        />
      ) : (
        <div className="w-48 h-48 border rounded-full" />
      )}
      <div className="self-center px-2">
        <label className="btn-link" htmlFor="single">
          {uploading ? 'Uploading…' : 'Change'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}
