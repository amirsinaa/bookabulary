export const Tag = ({ isLoading = false, children, ...props }) => {
  return (
    <span
      className={`p-1 mx-0 text-sm text-white dark:text-lime-700 rounded-xl bg-lime-700 dark:bg-white ${isLoading ? 'animate-pulse' : ''}`} {...props}>
      {children}
    </span>
  );
}
