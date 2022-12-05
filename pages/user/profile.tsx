import { ProfileForm } from "@/components/user/views/profile-form";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { User } from "@/components/user/types/profile";
import type { GetServerSideProps, NextPage } from "next";


export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/user/auth",
  async getServerSideProps(ctx, supabase) {
    const { data: { session: { user } } } = await supabase.auth.getSession();
    return { props: { user } }
  },
})

const ProfilePage: NextPage = ({ user }: User) => {
  return <ProfileForm user={user} />
}

export default ProfilePage;
