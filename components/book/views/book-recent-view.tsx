import { GET_LATEST_BOOKS } from '@/components/book/api/GET_LATEST_BOOKS';
import { BookCard } from '@/components/book/views/book-card';
import { LoadingContentSkeleton } from '@/components/common/loading-content-skeleton';
import { useQuery } from '@tanstack/react-query';

export function RecentBooks({ limit }) {
  const { isLoading, data: recentBooks, error } = useQuery(['recent-books'], () => GET_LATEST_BOOKS(limit));

  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <section className="flex flex-col flex-wrap justify-center p-4 my-8 border md:p-12 md:my-10 rounded-xl border-lime-600 bg-lime-50 drop-shadow-xl">
      <h3 className='pb-10 text-4xl font-bold text-center text-teal-800'>Most recent books</h3>
      <div className="flex flex-row flex-wrap justify-center book-search-result">

        {isLoading && <LoadingContentSkeleton format={limit} />}
        {recentBooks?.data.map(book => {
          return (
            <BookCard key={book.id} book={book} showDescription={true} />
          )
        })}
      </div>
    </section>
  );
}
