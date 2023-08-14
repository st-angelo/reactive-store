import { ReactiveStore } from './store';

export function reactiveStore<TData>(initial: TData) {
  return new ReactiveStore(initial);
}
