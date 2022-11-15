import { BookCard } from '@/components/book/views/book-card';

export function BooksList({ books }) {
  return (
    <>
      {books?.data?.map(book => {
        return (
          <BookCard key={book.id} book={book} />
        )
      })}
    </>
  );
}
