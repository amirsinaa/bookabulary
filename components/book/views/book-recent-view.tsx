import {
  LoadingContentSkeleton
} from '@/components/common/loading-content-skeleton';
import { BookCard } from '@/components/book/views/book-card';
import { useLatestBook } from '@/components/book/hooks/use-latest-book';

export function RecentBooks({ limit }) {
  const books = useLatestBook(limit);

  if (books.error instanceof Error) return <p>{books.error.message}</p>;

  return (
    <section className="flex flex-col flex-wrap justify-center p-4 my-8 border md:p-12 md:my-10 rounded-xl border-lime-100 bg-lime-100 drop-shadow-xl">
      <h3 className='pb-10 text-4xl font-bold text-center text-teal-800'>Most recent books</h3>
      <div className="flex flex-row flex-wrap justify-center book-search-result">
        {books.isLoading && <LoadingContentSkeleton format={limit} />}
        {books.data?.data.map(book => <BookCard key={book.id} book={book} showDescription={true} />)}
      </div>
    </section>
  );
}
