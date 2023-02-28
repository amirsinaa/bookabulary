import {
  createServerSupabaseClient,
  User
} from "@supabase/auth-helpers-nextjs";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage
} from "next";
import { GET_VOCABULARY } from "@/components/vocabulary/api/GET_VOCABULARY";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";
import { Vocabulary } from "@/components/vocabulary/views/vocabulary";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/common/button";
import REACT_QUERY_DEFAULT_OPTIONS from "@/constant/react-query-options";
import { useRouter } from "next/router";

const queryClient = new QueryClient(REACT_QUERY_DEFAULT_OPTIONS);
export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const { id } = ctx.params;
  await queryClient.prefetchQuery(["vocabulary", id], () => GET_VOCABULARY(String(id)));

  return {
    props: {
      initialSession: session,
      dehydratedState: dehydrate(queryClient),
      user: session?.user ?? { user: 'not-authed' }
    }
  };
};

const VocabularyPage: NextPage = ({ user }: { user: User }) => {
  const router = useRouter();
  const { query: { id } } = router;

  const { isLoading, data: vocabulary, error } = useQuery(["vocabulary", id], () => GET_VOCABULARY(String(id)));
  { error && <p>error</p> }
  { isLoading ? "Loading ..." : "" }

  return (
    <section className="vocabulary-page">
      <Button
        onClick={() => router.back()}
        extraConfig="ease-in-out duration-150 hover:drop-shadow-xl hover:scale-110"
      >
        <ArrowLeftIcon className="mt-5" width={45} height={45} />
      </Button>
      <Vocabulary
        dictionary={vocabulary.data.dictionary.data}
        vocabularyOwner={vocabulary.data.profile_id}
        vocabularyId={vocabulary.data.id}
        bookId={vocabulary.data.book_id}
        title={vocabulary.data.title}
        profileId={user.id}
      />
    </section>
  );
};

export default VocabularyPage;
