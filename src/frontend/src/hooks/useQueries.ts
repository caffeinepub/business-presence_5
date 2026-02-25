import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Rating } from '../backend';

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.submitContactForm(name, email, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
    },
  });
}

export function useGetAllRatings() {
  const { actor, isFetching } = useActor();
  
  return useQuery<Rating[]>({
    queryKey: ['ratings'],
    queryFn: async () => {
      if (!actor) return [];
      const ratingsData = await actor.getAllRatings();
      // Convert from [bigint, Rating][] to Rating[]
      return ratingsData.map(([_, rating]) => rating);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddRating() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      customerName,
      ratingValue,
      comment,
    }: {
      customerName: string;
      ratingValue: number;
      comment: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.addRating(customerName, BigInt(ratingValue), comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ratings'] });
    },
  });
}

export function useUpdateRating() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      customerName,
      ratingValue,
      comment,
    }: {
      id: bigint;
      customerName: string;
      ratingValue: number;
      comment: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateRating(id, customerName, BigInt(ratingValue), comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ratings'] });
    },
  });
}

export function useDeleteRating() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteRating(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ratings'] });
    },
  });
}
