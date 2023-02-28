import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { Vocabulary } from "@/components/vocabulary/views/vocabulary";
import type { GetServerSidePropsContext, GetServerSideProps, NextPage } from "next";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/common/button";
import { useRouter } from "next/router";
import FatherLessVocabulary from '@/components/vocabulary/views/fatherless-vocabulary';

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

  const refererBook = ctx.req.headers.referer;

  return {
    props: {
      initialSession: session,
      user: session.user,
      refererBookId: refererBook.substring(refererBook.length - 36) ?? null
    }
  };
};

export type Referer = {
  refererBookId: string
}

const CreateVocabularyPage: NextPage = (refererBookId: Referer, { user }: { user: User }) => {
  const router = useRouter();
  { }
  return (
    <section className="vocabulary-page">
      {!refererBookId ? <FatherLessVocabulary /> : <>
        <Button
          onClick={() => router.back()}
          extraConfig="ease-in-out duration-150 hover:drop-shadow-xl hover:scale-110"
        >
          <ArrowLeftIcon className="mt-5" width={45} height={45} />
        </Button>
        <Vocabulary
          profileId={user.id}
          vocabularyOwner={user.id}
          bookId={refererBookId}
          dictionary={[]}
        />
      </>}
    </section >
  );
};

export default CreateVocabularyPage;