import DeleteBook from "./delete-book";
import EditBook from "./edit-book";
import Link from "next/link";

export const BookListItem = ({ book }) => {
  return (
    <li className="flex flex-row justify-between w-full p-10 m-2 dark:bg-lime-700 bg-white rounded-lg md:w-5/12 min-h-24 drop-shadow-md grow">
      <h4 className="mx-0 text-2xl font-semibold pb-4">
        <Link href={`/books/${(book.id)}`} className='hover:cursor-pointer'>
          {book.name}
        </Link>
      </h4>
      <div className='book-actions flex-row justify-evenly'>
        <EditBook book={book} />
        <DeleteBook book={book} />
      </div>
    </li>
  )
}