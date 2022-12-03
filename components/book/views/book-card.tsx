import { GET_PROFILE } from '@/components/user/api/GET_PROFILE';
import { useQuery } from '@tanstack/react-query';
import Link from "next/link";


export const BookCard = ({ book, showDescription = false }) => {

  const { isLoading, data: bookAdmin } = useQuery([`${book.name}${book.profile_id}-book-admin`], () => GET_PROFILE(book.profile_id));

  return (
    <article className="flex flex-col justify-center w-full p-4 m-2 bg-white rounded-lg md:p-10 md:w-5/12 min-h-24 drop-shadow-md grow">
      <div className="flex justify-between book-info-wrapper">
        <h1 className="mx-0 text-2xl font-bold">
          <Link href={`/books/${(book.id)}`} className='hover:cursor-pointer'>
            {book.name}
          </Link>
        </h1>
        <span
          className={`flex items-center px-2 mx-0 text-sm text-white rounded-xl bg-lime-700 ${isLoading ? 'animate-pulse' : ''}`}>
          Added by: {bookAdmin?.data?.username}
        </span>
      </div>
      {showDescription && <p className="mt-2 text-justify book-description">{book.description}</p>}
    </article>
  )
}