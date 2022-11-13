import { ProfileForm } from '@/components/user/profile-form';
import { withPageAuth } from '@supabase/auth-helpers-nextjs'

export default function Profile({ user }) {
  return (
    <>
      <ProfileForm user={user} />
    </>
  )
}

export const getServerSideProps = withPageAuth({
  redirectTo: '/user/auth',
  async getServerSideProps(ctx, supabase) {
    const { data: { session: { user } } } = await supabase.auth.getSession();
    return { props: { user } }
  },
})