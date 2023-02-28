import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GET_LATEST_BOOKS } from "@/components/book/api/GET_LATEST_BOOKS";
import { RecentBooks } from "@/components/book/views/book-recent-view";
import { BookFinder } from "@/components/book/views/book-finder";
import REACT_QUERY_DEFAULT_OPTIONS from "@/constant/react-query-options";
import type { GetServerSideProps, NextPage } from "next";

const queryClient = new QueryClient(REACT_QUERY_DEFAULT_OPTIONS);
export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery(["recent-books"], () => GET_LATEST_BOOKS(10));

  return {
    props: {
      dehydratedState: JSON.stringify(dehydrate(queryClient))
    },
  }
}

const BooksPage: NextPage = () => {
  return (
    <section className="books-page">
      <BookFinder />
      <RecentBooks limit={3} />
    </section>
  );
};

export default BooksPage;