const VocabularyTableTitle = ({ table, children }) => {
  return (
    <tr key={table.getCenterHeaderGroups()[0].id}>
      {table.getCenterHeaderGroups()[0].headers.map(mainHeader => {
        return (<th
          key={mainHeader.id}
          colSpan={mainHeader.colSpan}
          className='p-0 border-0 rounded-t-md'
        >
          {children}
        </th>)
      }
      )}
    </tr>
  )
}
export default VocabularyTableTitle