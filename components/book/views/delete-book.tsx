import ClientOnlyPortal from "@/utils/client-only-portals";
import { Input } from "@/components/common/input";
import { ExitIcon } from '@radix-ui/react-icons';
import { Tag } from '@/components/common/tag';
import { Button } from "@/components/common/button";
import { useState } from 'react';

const DeleteBook = ({ book }) => {
  const [deleteWarning, setDeleteWarning] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<string>('');
  return (
    <>
      <Button onClick={() => setDeleteWarning(true)} extraConfig='rounded-sm p-2 bg-red-600 text-white hover:cursor-pointer px-2'>
        Delete
      </Button>
      {deleteWarning &&
        <ClientOnlyPortal selector="#portal">
          <div aria-hidden="true" className="flex justify-center fixed top-0 left-0 w-full h-full bg-gray-700/[0.59]">
            <div className="flex-col min-w-[35%] self-center max-w-2xl md:h-auto bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Deleting <Tag color='text-red-700' background='bg-red-200'>{book.name}</Tag>
                </h3>
                <ExitIcon width={34} height={34} onClick={(prev) => setDeleteWarning(!prev)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" />
              </div>
              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  You are about to delete <b>{book.name}</b> book and all of associated vocabulary collections with it.
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Since this action is irreversible please type the name of this book below exactly as it is.
                  </p>
                  <Input type="text" name="bookName" aria-placeholder={`Type '${book.name}'`} placeholder={`Type '${book.name}'`} value={confirmDelete} classOverrides='mt-4 block w-full py-2 px-2 font-normal text-gray-700 bg-gray-50 rounded-md drop-shadow focus:bg-white' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmDelete(e.target.value)} />
                </p>
              </div>
              <div className="flex justify-between items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button disabled={confirmDelete === book.name ? false : true} type="button" className="disabled:bg-gray-300 disabled:cursor-not-allowed text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
                <button onClick={(prev) => setDeleteWarning(!prev)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
              </div>
            </div>
          </div>
        </ClientOnlyPortal>
      }
    </>
  );
}


export default DeleteBook;