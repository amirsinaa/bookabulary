import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSidePropsContext, GetServerSideProps, NextPage } from "next";
import { BookList } from "@/components/book/views/book-list";
import { Button } from "@/components/common/button";
import Link from "next/link";

import { ProfileForm } from "@/components/user/views/profile-form";
import { User } from "@/components/user/types/profile";


export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/user/auth',
        permanent: false
      }
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    }
  };
};
const ProfilePage: NextPage = ({ user }: { user: User }) => {
  return (
    <>
      <Button extraConfig="btn"><Link href="/books/create" className="hover:cursor-pointer">New Book</Link></Button>
      <BookList user={user} />
      <ProfileForm user={user} />
    </>
  );
}

export default ProfilePage;
