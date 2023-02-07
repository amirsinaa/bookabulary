import { flexRender } from '@tanstack/react-table';
const VocabularyTableRow = ({ table }) => {
  return (
    table.getRowModel().rows.map(row => {
      return (
        <tr key={row.id} className='border-b-2 p-0'>
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
        </tr>
      )
    })

  );
}
export default VocabularyTableRow