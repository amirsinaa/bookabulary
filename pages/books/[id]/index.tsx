import { QueryClient, useQuery, dehydrate } from '@tanstack/react-query';
import { GET_BOOK } from '@/components/book/api/GET_BOOK';
import { Button } from '@/components/common/button';
import { Book } from '@/components/book/views/book';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  await queryClient.prefetchQuery(['book', id], () => GET_BOOK(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const BooksPage: NextPage = ({ }) => {
  const router = useRouter();
  const { query: { id } } = router;

  const { isLoading, data, error } = useQuery(['book', id], () => GET_BOOK(id));

  console.log("is loading" + isLoading)
  { error && <p>error</p> }
  { isLoading ? 'Loading ...' : '' }

  return (
    <section className='book-page'>
      <Button onClick={() => router.back()}>Go back</Button>
      <Book book={data} />
    </section>
  );
};

export default BooksPage;
