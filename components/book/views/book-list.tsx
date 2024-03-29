import {
  useUsersBooksList
} from '@/components/book/hooks/use-users-books-list';
import {
  LoadingContentSkeleton
} from '@/components/common/loading-content-skeleton';
import { BookListItem } from '@/components/book/views/book-list-item';
import ReactQueryUiErrorHandler from '@/components/common/react-query-ui-error';

export function BookList({ user }) {
  const owner = user.id;
  const books = useUsersBooksList(owner);

  if (books.error instanceof Error) return <ReactQueryUiErrorHandler queryKey={books} />;

  return (
    <ul className='flex flex-row flex-wrap justify-center w-full book-search-result'>
      {books.isLoading && <LoadingContentSkeleton format={2} />}
      {books.data?.data.map(
        book => <BookListItem key={book.id} book={book} />
      )}
    </ul>
  );
}
