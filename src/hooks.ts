import { ReactiveStore, UpdateFn } from './store';
import { useCallback, useEffect, useState } from 'react';

export function useReactiveStore<TData>(store: ReactiveStore<TData>) {
  const [data, setData] = useState<TData>(store.get());

  useEffect(() => {
    const unsubscribe = store.subscribe(setData);
    return unsubscribe;
  }, [store]);

  const update = useCallback((updateFn: UpdateFn<TData>) => {
    store.update(updateFn);
  }, []);

  const set = useCallback((data: TData) => {
    store.set(data);
  }, []);

  return [data, set, update] as const;
}
