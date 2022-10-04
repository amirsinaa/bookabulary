import { ProfileForm } from '@/components/user/profile-form';
import { useSession } from '@/hooks/use-session';

export default function ProfilePage() {
  const session = useSession()

  if (!session) return null

  return <ProfileForm session={session} />
}
