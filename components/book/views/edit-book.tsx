import { Pencil1Icon } from '@radix-ui/react-icons';
import { Button } from "@/components/common/button";
import Link from "next/link";

const EditBook = ({ book }) => {
  return (
    <Button classOverrides='mx-1 p-2 rounded-lg bg-lime-500 text-white hover:cursor-pointer px-2 dark:bg-lime-400'>
      <Link className='w-full h-full' href={`/books/${(book.id)}/edit`}>
        <Pencil1Icon width={20} height={20} />
      </Link>
    </Button>
  );
}

export default EditBook;