import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { GetServerSidePropsContext, GetServerSideProps, NextPage } from "next";
import { BookList } from "@/components/book/views/book-list";
import { Button } from "@/components/common/button";
import { User } from "@/components/user/types/profile";
import Link from "next/link";


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
const Archive: NextPage = ({ user }: { user: User }) => {
  return (
    <section className="book-archive-page">
      <h4 className='my-4 text-4xl font-bold text-center text-teal-800'>Your books</h4>
      <div className="book-archive-page flex flex-row flex-wrap justify-center p-2 my-8 md:p-12 md:my-4 rounded-xl bg-lime-100 drop-shadow-xl">
        <BookList user={user} />
      </div>
      <Button classOverrides="btn my-4 flex-col w-full"><Link href="/books/create" className="hover:cursor-pointer"> New Book </Link></Button>
    </section>
  );
}

export default Archive;
