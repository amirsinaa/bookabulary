const ReactTablePaginationInfo = ({ table }) => {
  return (
    <span className='flex items-center gap-1'>
      <div>Page</div>
      <strong>
        {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </strong>
    </span>
  );
}

export default ReactTablePaginationInfo