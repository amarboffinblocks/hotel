"use client";

import { useCallback, useSyncExternalStore } from "react";

import { createId } from "@/features/admin/lib/id";
import type { Identifiable } from "@/features/admin/lib/types";

type Listener = () => void;

type StoreSnapshot<T> = {
  items: T[];
  ready: boolean;
};

/**
 * In-memory + localStorage resource store.
 * Shared across hook instances for the same storageKey (one source of truth).
 * Swap for API/server actions in Phase 3 without changing ResourceManager UI.
 */
function createLocalResourceStore<T extends Identifiable>(
  storageKey: string,
  seed: () => T[]
) {
  let snapshot: StoreSnapshot<T> = { items: [], ready: false };
  const listeners = new Set<Listener>();

  function emit() {
    for (const listener of listeners) listener();
  }

  function persist(items: T[]) {
    snapshot = { items, ready: true };
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
      window.dispatchEvent(new Event(`grandview-resource:${storageKey}`));
    } catch {
      // Ignore quota / private mode failures — keep in-memory state.
    }
    emit();
  }

  function hydrate() {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as T[];
        if (Array.isArray(parsed)) {
          snapshot = { items: parsed, ready: true };
          emit();
          return;
        }
      }
    } catch {
      // Fall through to seed.
    }
    persist(structuredClone(seed()));
  }

  function subscribe(listener: Listener) {
    listeners.add(listener);
    if (!snapshot.ready) hydrate();
    return () => listeners.delete(listener);
  }

  function getSnapshot() {
    return snapshot;
  }

  function getServerSnapshot(): StoreSnapshot<T> {
    return { items: [], ready: false };
  }

  return {
    subscribe,
    getSnapshot,
    getServerSnapshot,
    create(input: Omit<T, "id"> & { id?: string }) {
      const item = {
        ...input,
        id: input.id ?? createId(storageKey),
      } as T;
      persist([item, ...snapshot.items]);
      return item;
    },
    update(id: string, patch: Partial<T>) {
      persist(
        snapshot.items.map((item) =>
          item.id === id ? ({ ...item, ...patch, id } as T) : item
        )
      );
    },
    remove(id: string) {
      persist(snapshot.items.filter((item) => item.id !== id));
    },
    reset() {
      persist(structuredClone(seed()));
    },
  };
}

const stores = new Map<string, ReturnType<typeof createLocalResourceStore>>();

function getStore<T extends Identifiable>(storageKey: string, seed: () => T[]) {
  let store = stores.get(storageKey) as
    | ReturnType<typeof createLocalResourceStore<T>>
    | undefined;
  if (!store) {
    store = createLocalResourceStore(storageKey, seed);
    stores.set(storageKey, store as ReturnType<typeof createLocalResourceStore>);
  }
  return store;
}

export function useLocalResource<T extends Identifiable>(
  storageKey: string,
  seed: () => T[]
) {
  const store = getStore(storageKey, seed);
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  const create = useCallback(
    (input: Omit<T, "id"> & { id?: string }) => store.create(input),
    [store]
  );
  const update = useCallback(
    (id: string, patch: Partial<T>) => store.update(id, patch),
    [store]
  );
  const remove = useCallback((id: string) => store.remove(id), [store]);
  const reset = useCallback(() => store.reset(), [store]);

  return {
    items: snapshot.items,
    ready: snapshot.ready,
    create,
    update,
    remove,
    reset,
  };
}

/** Lightweight count helper for overview cards without mounting full managers */
export function useResourceCount(storageKey: string, seedLength: number) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const onStorage = (event: StorageEvent) => {
        if (event.key === storageKey) onStoreChange();
      };
      window.addEventListener("storage", onStorage);
      // Also listen to same-tab updates via custom event from our store
      window.addEventListener(
        `grandview-resource:${storageKey}`,
        onStoreChange
      );
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(
          `grandview-resource:${storageKey}`,
          onStoreChange
        );
      };
    },
    () => {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw) as unknown[];
          if (Array.isArray(parsed)) return parsed.length;
        }
      } catch {
        // fall through
      }
      return seedLength;
    },
    () => seedLength
  );
}
