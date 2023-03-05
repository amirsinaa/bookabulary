export const Tag = ({
  isLoading = false,
  color = 'text-white',
  size = 'sm',
  background = 'bg-lime-700',
  children,
  ...props }) => {
  return (
    <span
      className={`p-1 px-2 m-0 text-${size} ${color} ${background} rounded-xl ${isLoading ? 'animate-pulse' : ''}`} {...props}>
      {children}
    </span>
  );
}
