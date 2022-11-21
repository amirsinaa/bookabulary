export const Button = ({ children, ...props }) => {
  return (
    <button className='mx-2 rounded-sm btn' {...props}>
      {children}
    </button>
  );
}