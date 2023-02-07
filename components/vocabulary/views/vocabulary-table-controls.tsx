import ReactTablePaginationInfo from '../views/react-table-pagination-info'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import ReactTableLimit from '../views/react-table-limit'
import { Button } from '@/components/common/button';

const VocabularyFormControls = ({ table }) => {
  return (
    <div className='flex items-center gap-2 justify-between mt-4'>
      <Button
        extraConfig='rounded p-1 btn-light'
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon width={34} height={34} />
      </Button>

      <div className='flex gap-2'>
        <ReactTablePaginationInfo table={table} />
        <ReactTableLimit table={table} />
      </div>

      <Button
        className='rounded p-1 btn-light'
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon width={34} height={34} />
      </Button>
    </div>
  );
}

export default VocabularyFormControls;