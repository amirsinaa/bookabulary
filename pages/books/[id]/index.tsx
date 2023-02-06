import {
  GET_BOOK_VOCABULARIES
} from "@/components/vocabulary/api/GET_BOOK_VOCABULARIES";
import {
  LoadingContentSkeleton
} from "@/components/common/loading-content-skeleton";
import { VocabularyCard } from "@/components/vocabulary/views/vocabulary-card";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import { GET_BOOK } from "@/components/book/api/GET_BOOK";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/common/button";
import { Book } from "@/components/book/views/book";
import { useRouter } from "next/router";
import Link from "next/link";

const queryClient = new QueryClient();
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  await queryClient.prefetchQuery(["book", id], () => GET_BOOK(String(id)));
  await queryClient.prefetchQuery(["book-vocabularies", id], () => GET_BOOK_VOCABULARIES(String(id)));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const BooksPage: NextPage = () => {
  const router = useRouter();
  const { query: { id } } = router;

  const { isLoading, data: book, error } = useQuery(["book", id], () => GET_BOOK(String(id)));

  const { isLoading: vocabulariesIsLoading, data: vocabularies, error: vocabulariesError } = useQuery(["book-vocabularies", id], () => GET_BOOK_VOCABULARIES(String(id)));

  if (error instanceof Error) return <p>{error.message}</p>;
  { isLoading ? "Loading ..." : "" }

  return (
    <section className="book-page">
      <Button onClick={() => router.back()} extraConfig="ease-in-out duration-150 hover:drop-shadow-xl hover:scale-110"><ArrowLeftIcon className="mt-5" width={45} height={45} /></Button>
      <Book book={book}>
        {vocabulariesIsLoading && <LoadingContentSkeleton format={4} />}
        {vocabulariesError instanceof Error && <p>{vocabulariesError.message}</p>}
        <section className="flex flex-row flex-wrap justify-center p-2 my-8 md:p-12 md:my-10 rounded-xl bg-lime-100 drop-shadow-xl">
          {vocabularies?.data?.map(vocabulary => {
            return (
              <Link
                key={vocabulary.id}
                href={{ pathname: "/books/vocabulary/[id]", query: { id: vocabulary.id } }}
                className="hover:cursor-pointer">
                <VocabularyCard data={vocabulary} />
              </Link>
            )
          })}
        </section>
      </Book>
    </section>
  );
};

export default BooksPage;
