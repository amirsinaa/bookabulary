export const Tag = ({ isLoading = false, children, ...props }) => {
  return (
    <span
      className={`p-1 mx-0 text-sm text-white rounded-xl bg-lime-700 ${isLoading ? 'animate-pulse' : ''}`} {...props}>
      {children}
    </span>
  );
}
