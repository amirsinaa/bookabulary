import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/common/input';
import { Column } from '@tanstack/react-table';
import { useState } from 'react';

export default function Filter({
  column
}: {
  column: Column<any, any>
}) {
  const [filterVisibility, setFilterVisibility] = useState<boolean>(false);
  const columnFilterValue = column.getFilterValue();
  return (
    filterVisibility ?
      <>
        <Input
          type='text'
          value={(columnFilterValue ?? '') as string}
          onChange={e => column.setFilterValue(e.target.value)}
          placeholder={`Search...`}
          classOverrides='h-16 min-h-full flex-row w-full py-2 px-0 absolute text-center font-normal text-md text-black focus:outline-none'
        />
        <span className='absolute top-5 right-4' onClick={() => setFilterVisibility(prev => !prev)}><Cross1Icon width={24} height={24} className='hover:cursor-pointer' /></span>
      </> : <span onClick={() => setFilterVisibility(prev => !prev)}><MagnifyingGlassIcon width={24} height={24} className='hover:cursor-pointer' /></span>
  )
}