import { flexRender } from '@tanstack/react-table';
import { Cross1Icon } from '@radix-ui/react-icons';

const VocabularyTableRow = ({ table, tableCache, cacheDispatcher, isOwner }) => {
  return (
    table.getRowModel().rows.map(row => {
      return (
        <tr key={row.id} className='relative border-b-2 p-0'>
          {row.getVisibleCells().map(cell => {
            return (
              <td key={cell.id} className='border-x-2 p-0'>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            )
          })}
          {isOwner && <span
            key={`delete-row-${row.id}`}
            className="hover:cursor-pointer absolute right-2 mt-1"
            onClick={() => {
              const dataCopy = [...tableCache];
              dataCopy.splice(row.id, 1);
              cacheDispatcher(dataCopy);
            }}
          >
            <Cross1Icon width={34} height={34} type="button" className="text-red-500 bg-transparent hover:text-red-800 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" />
          </span>}
        </tr>
      )
    })
  );
}
export default VocabularyTableRow