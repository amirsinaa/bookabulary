import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Vocabulary } from "@/components/vocabulary/views/vocabulary";
import type { GetServerSideProps, NextPage } from "next";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/common/button";
import { useRouter } from "next/router";
import FatherLessVocabulary from '@/components/vocabulary/views/fatherless-vocabulary';
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/user/auth",
  async getServerSideProps(ctx) {
    const refererBook = ctx.req.headers.referer ?? null;
    const refererBookId = refererBook.substring(refererBook.length - 36);
    return { props: { refererBookId } }
  },
})

export type Referer = {
  refererBookId: string
}

const CreateVocabularyPage: NextPage = ({ refererBookId }: Referer) => {
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
        <Vocabulary bookId={refererBookId} dictionary={[]} /></>}
    </section >
  );
};

export default CreateVocabularyPage;