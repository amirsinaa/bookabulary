import { GET_PROFILE } from '@/components/user/api/GET_PROFILE';
import { useQuery } from '@tanstack/react-query';

export const useAuthor = (id: string) => {
  return useQuery([id], () => GET_PROFILE(id))
}