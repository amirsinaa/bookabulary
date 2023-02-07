const ReactQueryUiErrorHandler = ({ queryKey }) => {
  return (
    (queryKey.isError && queryKey.error instanceof Error) && <p className='mb-8 text-sm text-red-500'>{queryKey.error.message}</p>
  );
}

export default ReactQueryUiErrorHandler;