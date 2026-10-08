"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  api,
  type ApiResourceKey,
} from "@/features/admin/api/client";
import type { Identifiable } from "@/features/admin/lib/types";

export function resourceQueryKey(resource: ApiResourceKey) {
  return ["admin", resource] as const;
}

export function useResourceList<T extends Identifiable>(
  resource: ApiResourceKey
) {
  return useQuery({
    queryKey: resourceQueryKey(resource),
    queryFn: () => api.list<T>(resource),
  });
}

export function useResourceMutations<T extends Identifiable>(
  resource: ApiResourceKey
) {
  const queryClient = useQueryClient();
  const key = resourceQueryKey(resource);

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: key });

  const create = useMutation({
    mutationFn: (body: Omit<T, "id"> & { id?: string }) =>
      api.create<T>(resource, body),
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: ({ id, ...body }: Partial<T> & { id: string }) =>
      api.update<T>(resource, id, body),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.remove(resource, id),
    onSuccess: invalidate,
  });

  const reset = useMutation({
    mutationFn: async () => {
      // Reset = re-seed on server; for now refetch after telling user to run seed
      // Client-side: delete all then user re-seeds via API seed endpoint later.
      // Temporary: just refetch.
      await invalidate();
    },
  });

  return { create, update, remove, reset, invalidate };
}
