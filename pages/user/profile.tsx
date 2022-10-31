import { ProfileForm } from '@/components/user/profile-form';
import { withPageAuth } from '@supabase/auth-helpers-nextjs'

export default function ProtectedPage({ session }) {

  return (
    <>
      <ProfileForm session={session} />
    </>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/user/auth',
  async getServerSideProps(ctx, supabase) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return { props: { session } }
  },
})