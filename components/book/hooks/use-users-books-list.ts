import { GET_USERS_BOOKS_LIST } from '@/components/book/api/GET_USERS_BOOKS_LIST';
import { useQuery } from '@tanstack/react-query';

export const useUsersBooksList = (userId) => {
  return useQuery(['books-list', userId], () => GET_USERS_BOOKS_LIST(userId));
}