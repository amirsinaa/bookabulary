import DeleteBook from "./delete-book";
import EditBook from "./edit-book";
import Link from "next/link";

export const BookListItem = ({ book }) => {
  return (
    <li className="flex flex-row justify-between w-full p-1 m-1 md:p-2 md:w-5/12 min-h-24 grow border-b-2">
      <h4 className="mx-0 text-2xl font-semibold pb-4">
        <Link href={`/books/${(book.id)}`} className='hover:cursor-pointer'>
          {book.name}
        </Link>
      </h4>
      <div className='book-actions flex-row justify-evenly self-center'>
        <EditBook book={book} />
        <DeleteBook book={book} />
      </div>
    </li>
  )
}