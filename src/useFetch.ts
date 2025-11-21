import { signal, setSignal } from "./signals";

export function useFetch<T = any>(url: string, init?: RequestInit) {
  const loading = signal(true);
  const data = signal<T | null>(null);
  const error = signal<Error | null>(null);

  const controller = new AbortController();

  async function run() {
    setSignal(loading, true);
    try {
      const res = await fetch(url, {
        ...init,
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = (await res.json()) as T;
      setSignal(data, json);
      setSignal(error, null);
    } catch (err: any) {
      setSignal(error, err);
    } finally {
      setSignal(loading, false);
    }
  }

  run();

  return {
    loading,
    data,
    error,
    refresh: run,
    abort: () => controller.abort(),
  };
}
