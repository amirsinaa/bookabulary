
import { LoadingSpinner } from '@/components/common/loading-spinner';

export const Input = ({ isLoading = false, ...props }) => {
  return (
    <div className="relative">
      {isLoading && <LoadingSpinner color="text-teal-800" />}
      <input className={`block w-full py-5 pl-12 pr-4 font-bold text-gray-700 bg-gray-100 rounded-lg shadow focus:outline-none focus:bg-white }`} {...props} />
    </div>
  );
}