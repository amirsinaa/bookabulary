import { Button } from "@/components/common/button";
import Link from "next/link";

const EditBook = ({ book }) => {
  return (
    <Button classOverrides='mx-1 p-2 rounded-lg bg-lime-500 text-white'>
      <Link href={`/books/${(book.id)}/edit`} className='hover:cursor-pointer px-2'>
        Edit
      </Link>
    </Button>
  );
}

export default EditBook;