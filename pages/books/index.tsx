import { QueryClient, useQuery, dehydrate } from '@tanstack/react-query';
import { GET_BOOKS_LIST } from '@/components/book/api/GET_BOOKS_LIST';
import { BooksList } from '@/components/book/views/book-list';

const queryClient = new QueryClient();
export const getServerSideProps = async () => {

  await queryClient.prefetchQuery(['books'], () => GET_BOOKS_LIST());

  return {
    props: {
      dehydratedState: JSON.stringify(dehydrate(queryClient))
    },
  }
}

const BooksPage = () => {
  const { isLoading, data, error } = useQuery(['books'], () => GET_BOOKS_LIST());

  console.log(data)
  { error && <p>error</p> }
  { isLoading ? 'Loading ...' : '' }

  return (
    <section className='books-page'>
      <BooksList books={data} />
    </section>
  );
};

export default BooksPage;
