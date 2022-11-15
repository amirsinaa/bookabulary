import { ProfileForm } from '@/components/user/views/profile-form';
import { withPageAuth } from '@supabase/auth-helpers-nextjs'

export const getServerSideProps = withPageAuth({
  redirectTo: '/user/auth',
  async getServerSideProps(ctx, supabase) {
    const { data: { session: { user } } } = await supabase.auth.getSession();
    return { props: { user } }
  },
})

export default function Profile({ user }) {
  return (
    <>
      <ProfileForm user={user} />
    </>
  )
}