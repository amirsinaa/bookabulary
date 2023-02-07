const ReactTableLimit = ({ table }) => {
  return (
    <select
      value={table.getState().pagination.pageSize}
      className='block p-4 font-normal text-gray-700 bg-gray-100 rounded-md shadow focus:outline-none focus:bg-gray-300 hover:bg-gray-300 hover:cursor-pointer'
      onChange={e => {
        table.setPageSize(Number(e.target.value))
      }}
    >
      {
        [10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize} >
            Show {pageSize}
          </option>
        ))
      }
    </select>
  );
}

export default ReactTableLimit;