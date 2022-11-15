import Link from 'next/link';

export const Button = ({ children, ...props }) => {
  return (
    <button className='h-12 px-4 rounded-md button' {...props}>
      {children}
    </button>
  );
}