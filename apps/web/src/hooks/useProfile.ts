import { useQuery } from '@tanstack/react-query';
import { getProfile } from '#/api/profile';

export function useProfile(id: string) {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id),
    enabled: !!id,
  });
}
