type InputProps = {
  isLoading?: boolean,
  classOverrides?: string | null,
  [props: string]: unknown
}

export const Input = ({ isLoading = false, classOverrides = null, ...props }: InputProps) => {
  return (
    <input className={`${classOverrides ?? 'block w-full py-5 pl-12 pr-4 font-bold text-gray-700 bg-gray-100 rounded-lg shadow focus:outline-none focus:bg-white'}`}  {...props} />
  );
}