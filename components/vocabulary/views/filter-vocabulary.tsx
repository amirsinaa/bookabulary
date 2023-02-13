import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/common/input';
import { Column } from '@tanstack/react-table';

export default function Filter({
  column
}: {
  column: Column<any, any>
}) {
  const [filterVisibility, setFilterVisibility] = useState<boolean>(false);
  const columnFilterValue = column.getFilterValue();
  const searchInputElementRef = useRef<HTMLInputElement>(null);

  // ################################################## //

  //TODO: fix row search and edit bug when using in/out bound component click listener
  //Below code check that if user clicks outside of the search input automaticly close search input and removes the search query
  //but due to a bug that makes a conflict in search and instant edit this piece of code is temporarily disabled

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (filterVisibility) {
  //       if (searchInputElementRef.current && !searchInputElementRef.current.contains(event.target)) {
  //         column.setFilterValue(null)
  //         setFilterVisibility(false)
  //       }
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [searchInputElementRef, filterVisibility])

  // ################################################## //

  useEffect(() => {
    if (filterVisibility) {
      searchInputElementRef.current?.focus()
    }
  }, [filterVisibility])

  return (
    filterVisibility ?
      <>
        <Input
          type='text'
          value={(columnFilterValue ?? '') as string}
          onChange={e => column.setFilterValue(e.target.value)}
          ref={searchInputElementRef}
          placeholder={`Search...`}
          classOverrides='h-16 min-h-full flex-row w-full py-2 px-0 absolute text-center font-normal text-md text-black focus:outline-none'
        />
        <span className='absolute top-5 right-4' onClick={() => {
          column.setFilterValue(null)
          setFilterVisibility(prev => !prev)
        }}><Cross1Icon width={24} height={24} className='hover:cursor-pointer' /></span>
      </> : <span onClick={() => setFilterVisibility(prev => !prev)
      }><MagnifyingGlassIcon width={24} height={24} className='hover:cursor-pointer' /></span>
  )
}