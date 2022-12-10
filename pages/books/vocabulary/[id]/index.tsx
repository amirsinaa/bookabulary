import { GET_VOCABULARY } from "@/components/vocabulary/api/GET_VOCABULARY";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";
import { Vocabulary } from "@/components/vocabulary/views/vocabulary";
import type { GetServerSideProps, NextPage } from "next";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/common/button";
import { useRouter } from "next/router";

const queryClient = new QueryClient();
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  await queryClient.prefetchQuery(["vocabulary", id], () => GET_VOCABULARY(String(id)));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const VocabularyPage: NextPage = () => {
  const router = useRouter();
  const { query: { id } } = router;

  const { isLoading, data: vocabulary, error } = useQuery(["vocabulary", id], () => GET_VOCABULARY(String(id)));
  { error && <p>error</p> }
  { isLoading ? "Loading ..." : "" }

  return (
    <section className="vocabulary-page">
      <Button onClick={() => router.back()} extraConfig="ease-in-out duration-150 hover:drop-shadow-xl hover:scale-110"><ArrowLeftIcon className="mt-5" width={45} height={45} /></Button>
      <Vocabulary vocabulary={vocabulary}>
      </Vocabulary>
    </section>
  );
};

export default VocabularyPage;
