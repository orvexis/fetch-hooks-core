import { signal, setSignal, Signal } from "./signals";

interface UseFetchResult<T> {
  loading: Signal<boolean>;
  data: Signal<T | null>;
  error: Signal<Error | null>;
  refresh: () => Promise<void>;
  abort: () => void;
}

interface UseFetchOptions extends RequestInit {
  /**
   * Whether to automatically execute the fetch on hook creation
   * @default true
   */
  autoFetch?: boolean;

  /**
   * Timeout in milliseconds after which the request will be aborted
   * @default 10000 (10 seconds)
   */
  timeout?: number;
}

export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchResult<T> {
  const { autoFetch = true, timeout = 10000, ...fetchOptions } = options;

  const loading = signal(autoFetch);
  const data = signal<T | null>(null);
  const error = signal<Error | null>(null);

  let controller: AbortController | null = null;
  let timeoutId: number | null = null;

  const abort = () => {
    if (controller) {
      controller.abort();
      controller = null;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const run = async (): Promise<void> => {
    // Abort any ongoing request
    abort();

    setSignal(loading, true);
    setSignal(error, null);

    controller = new AbortController();

    // Set up timeout
    timeoutId = window.setTimeout(() => {
      if (controller) {
        controller.abort();
        setSignal(error, new Error("Request timeout"));
        setSignal(loading, false);
      }
    }, timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = (await response.json()) as T;
      setSignal(data, responseData);
    } catch (err: unknown) {
      // Only update error state if not aborted by user
      if (
        !controller?.signal.aborted ||
        (err instanceof Error && err.name !== "AbortError")
      ) {
        setSignal(error, err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      setSignal(loading, false);
      abort(); // Clean up
    }
  };

  const refresh = async (): Promise<void> => {
    return run();
  };

  // Auto-fetch on mount if enabled
  if (autoFetch) {
    run();
  }

  return {
    loading,
    data,
    error,
    refresh,
    abort,
  };
}

// Optional: Hook with manual execution
export function useLazyFetch<T = any>(
  url: string,
  options: Omit<UseFetchOptions, "autoFetch"> = {}
): UseFetchResult<T> & { execute: () => Promise<void> } {
  const result = useFetch<T>(url, { ...options, autoFetch: false });

  return {
    ...result,
    execute: result.refresh,
  };
}
