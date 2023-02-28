import Link from "next/link";

export const BookListItem = ({ book }) => {
  return (
    <li className="flex flex-col justify-center w-full p-1 m-1 md:p-2 md:w-5/12 min-h-24 grow">
      <h4 className="mx-0 text-2xl font-semibold border-b-2 pb-4">
        <Link href={`/books/${(book.id)}`} className='hover:cursor-pointer'>
          {book.name}
        </Link>
      </h4>
    </li>
  )
}