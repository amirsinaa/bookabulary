import Link from 'next/link';

export const BookCard = ({ book }) => {
  return (
    <article className='flex w-full p-10 mt-2 bg-white rounded-lg min-h-24 drop-shadow-md'>
      <div className="flex-row">
        <div className="flex book-info-wrapper">
          <h1 className="text-2xl font-bold">
            <Link href={`/books/${(book.id)}`} className='hover:cursor-pointer'>
              {book.name}
            </Link>
          </h1>
          <span
            className="flex items-center px-2 mx-2 text-sm text-white rounded-xl bg-lime-700">{book.publish_year}
          </span>
        </div>
        <p className="mt-2 text-justify book-description">{book.description}</p>
      </div>
    </article>
  )
}