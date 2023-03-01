import { Button } from "@/components/common/button";
import Link from "next/link";

const EditBook = ({ book }) => {
  return (
    <Button extraConfig='p-2 rounded-sm bg-orange-400 text-white'>
      <Link href={`/books/${(book.id)}/edit`} className='hover:cursor-pointer px-2'>
        Edit
      </Link>
    </Button>
  );
}

export default EditBook;