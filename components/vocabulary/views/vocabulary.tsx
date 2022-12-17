export const Vocabulary = ({ vocabulary, children }) => {
  const { data: { title, dictionary } } = vocabulary;
  return (
    <article className="flex-row">
      <h1 className="flex justify-center text-3xl divide-y-2 border-b-3 border-lime-600">{title}</h1>
      {children}
    </article>
  );
}