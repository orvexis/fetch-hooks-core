export type Listener<T> = (value: T) => void;

export interface Signal<T> {
  value: T;
  listeners: Set<Listener<T>>;
}

export function signal<T>(initial: T): Signal<T> {
  return { value: initial, listeners: new Set() };
}

export function setSignal<T>(s: Signal<T>, value: T) {
  s.value = value;
  for (const fn of s.listeners) fn(value);
}

export function subscribe<T>(s: Signal<T>, fn: Listener<T>) {
  s.listeners.add(fn);
  return () => s.listeners.delete(fn);
}
