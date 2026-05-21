import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePlayHistory, getRecentPlayHistory } from '../../shared/api/media-api';
import type { PlayHistoryDto } from '../../shared/api/types';

export function useRecentPlays() {
  const queryClient = useQueryClient();
  const query = useQuery<PlayHistoryDto[]>({
    queryKey: ['recent-plays'],
    queryFn: ({ signal }) => getRecentPlayHistory(signal),
  });
  const deleteMutation = useMutation({
    mutationFn: (historyId: number) => deletePlayHistory(historyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recent-plays'] });
    },
  });

  return {
    data: query.data ?? null,
    loading: query.isPending,
    error: query.isError ? (query.error instanceof Error ? query.error : new Error('Failed to fetch recent plays')) : null,
    deleteRecentPlay: deleteMutation.mutateAsync,
    deletingHistoryId: deleteMutation.variables ?? null,
    deleting: deleteMutation.isPending,
    deleteError: deleteMutation.isError
      ? (deleteMutation.error instanceof Error ? deleteMutation.error : new Error('Failed to delete recent play'))
      : null,
  };
}
