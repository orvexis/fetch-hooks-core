import { useFetch } from "./useFetch";

export function usePoll<T = any>(url: string, intervalMs: number) {
  const state = useFetch<T>(url);

  const id = setInterval(() => {
    state.refresh();
  }, intervalMs);

  return {
    ...state,
    stop: () => clearInterval(id),
  };
}
