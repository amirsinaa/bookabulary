import { GET_BOOKS_LIST } from "@/components/book/api/GET_BOOKS_LIST";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/use-debounce";

export const useBookSearch = ({ bookName }) => {
  const debounce = useDebounce<string>(bookName, 1100);

  return useQuery(
    ["book-finder-result", debounce],
    () => GET_BOOKS_LIST(bookName),
    {
      enabled: !!bookName
    }
  );
}