import Link from "next/link";

export const BookCard = ({ book, showDescription = false }) => {
  return (
    <article className="flex flex-col justify-center w-full p-4 m-2 bg-white rounded-lg md:p-10 md:w-5/12 min-h-24 drop-shadow-md grow">
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
      {showDescription && <p className="mt-2 text-justify book-description">{book.description}</p>}
    </article>
  )
}