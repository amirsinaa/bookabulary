import { Tag } from "@/components/common/tag"
import Link from "next/link";

export const VocabularyCard = ({ data, ...props }) => {
  const { dictionary, title, updated_at, is_private } = data;
  const date = new Date(updated_at)?.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col justify-center p-4 m-2 bg-white dark:bg-gray-600 rounded-lg md:p-10 md:w-5/12 min-h-24 drop-shadow-md grow" {...props}>
      <Link
        key={data?.id}
        href={{ pathname: "/books/vocabulary/[id]", query: { id: data?.id } }}
        className="hover:cursor-pointer flex justify-between">
        <h3 className="w-full mx-0 text-2xl font-bold">{title}</h3>
        {!!is_private && <Tag
          className="flex items-center px-2 mx-0 text-sm text-white rounded-xl bg-red-600 font-bold">
          Private
        </Tag>}
      </Link>
      <span className="text-xs text-slate-500 dark:text-white">Last updated at: {date}</span>
      <p className="mt-2 text-justify vocab-description">This collection contains <Tag>{Object.keys(dictionary?.data)?.length}</Tag> words 🌐</p>
    </div>
  );
};