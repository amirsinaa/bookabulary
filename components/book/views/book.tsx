export const Book = ({ book, children }) => {
  return (
    <article className="flex-row">
      <h1 className="flex justify-center text-3xl divide-y-2 border-b-3 border-lime-600">{book?.data?.name}</h1>
      <p className="flex justify-center py-4 text-justify text-md">{book?.data?.description}</p>
      {children}
    </article>
  )
}