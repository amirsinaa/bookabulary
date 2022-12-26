import { GET_LATEST_BOOKS } from '@/components/book/api/GET_LATEST_BOOKS';
import { useQuery } from '@tanstack/react-query';

export const useLatestBook = ({ limit }) => {
  return useQuery(['books-list', limit], () => GET_LATEST_BOOKS(limit));
}