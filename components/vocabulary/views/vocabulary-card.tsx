import { Tag } from "@/components/common/tag"

export const VocabularyCard = ({ data, ...props }) => {
  const { dictionary, title, updated_at } = data;
  const date = new Date(updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col justify-center p-4 m-2 bg-white rounded-lg md:p-10 md:w-5/12 min-h-24 drop-shadow-md grow hover:cursor-pointer" {...props}>
      <h3 className="w-full mx-0 text-2xl font-bold">{title}</h3>
      <span className="text-xs text-slate-500">Last updated at: {date}</span>
      <p className="mt-2 text-justify vocab-description">This collection contains <Tag>{Object.keys(dictionary.data).length}</Tag> words 🌐</p>
    </div>
  );
};