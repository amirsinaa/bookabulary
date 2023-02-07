import { flexRender } from '@tanstack/react-table';
import Filter from './filter-vocabulary';

const VocabularyTableColumnsTitle = ({ table }) => {
  return (
    <tr key={table.getCenterHeaderGroups()[1].id}>
      {table.getCenterHeaderGroups()[1].headers.map(internalHeader => {
        return (<th
          key={internalHeader.id}
          colSpan={internalHeader.colSpan}
          className='p-0'
        >
          <div className='h-16 min-h-full flex space-x-1 justify-center relative items-center text-lg font-medium bg-slate-200 dark:text-black'>
            {flexRender(
              internalHeader.column.columnDef.header,
              internalHeader.getContext()
            )}
            {internalHeader.column.getCanFilter() ? (
              <Filter column={internalHeader.column} />
            ) : null}
          </div>
        </th>)
      }
      )}
    </tr>
  )
}

export default VocabularyTableColumnsTitle;