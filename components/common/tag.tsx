export const Tag = ({
  isLoading = false,
  color = 'text-white',
  background = 'bg-lime-700',
  children,
  ...props }) => {
  return (
    <span
      className={`p-1 px-2 m-0 text-sm ${color} ${background} rounded-xl ${isLoading ? 'animate-pulse' : ''}`} {...props}>
      {children}
    </span>
  );
}
