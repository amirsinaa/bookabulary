import { Input } from "@/components/common/input";

export const ToggleCheckbox = ({ title, checked, ...props }) => {
  return (
    <div className="absolute top-10 right-4">
      <label className="relative inline-flex items-center cursor-pointer">
        <Input type="checkbox" value="" className="sr-only peer" checked={checked ? true : false} {...props} />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-lime-300 dark:peer-focus:ring-lime-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-lime-500"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{title}</span>
      </label>
    </div>
  );
}