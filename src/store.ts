export type Subscriber<TData> = (value: TData) => void;

export type UpdateFn<TData> = (previous: TData) => TData;

export class ReactiveStore<TData> {
  #subscribers: Subscriber<TData>[];
  #data: TData;

  constructor(initial: TData) {
    this.#subscribers = [];
    this.#data = initial;
  }

  subscribe(subscriber: Subscriber<TData>) {
    this.#subscribers.push(subscriber);
    return () => {
      this.#subscribers.splice(this.#subscribers.indexOf(subscriber), 1);
    };
  }

  get() {
    return this.#data;
  }

  set(data: TData) {
    this.#data = data;
    this.#notify();
  }

  update(updateFn: UpdateFn<TData>) {
    this.#data = updateFn(this.#data);
    this.#notify();
  }

  #notify() {
    this.#subscribers.forEach((subscriber) => subscriber(this.#data));
  }
}
