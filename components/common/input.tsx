import { forwardRef } from "react";

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  isLoading?: boolean,
  classOverrides?: string | null,
  [inputProps: string]: unknown
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isLoading = false, classOverrides = null, ...inputProps }, ref) => {

    return (
      <input className={`${classOverrides ?? 'block w-full py-5 pl-12 pr-4 font-bold text-gray-700 bg-gray-100 rounded-lg shadow focus:bg-white'}`}  {...inputProps} ref={ref} />
    )
  }
);

Input.displayName = 'CustomTailwindInput';