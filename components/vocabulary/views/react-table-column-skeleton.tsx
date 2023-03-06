import type { DictionaryData } from '../types/vocabulary';
import { Input } from '@/components/common/input';
import { ColumnDef } from '@tanstack/react-table';
import { useState, useEffect } from 'react'

const ReactTableColumnSkeleton: Partial<ColumnDef<DictionaryData>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(initialValue)
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(initialValue)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValue])
    return (
      <Input
        type='text'
        classOverrides='block w-full py-2 text-center font-normal text-md text-black bg-slate-50 focus:outline-none focus:bg-lime-50'
        value={value as string}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onBlur={onBlur}
        disabled={table.options.meta?.tableOwner() ? false : true}
        placeholder='Type something ...'
      />
    )
  },
}

export default ReactTableColumnSkeleton