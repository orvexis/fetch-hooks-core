export function useRetry<T>(
  fn: () => Promise<T>,
  opts: { retries?: number; delay?: number } = {}
) {
  const { retries = 3, delay = 200 } = opts;

  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function run(): Promise<T> {
    let attempt = 0;
    while (true) {
      try {
        return await fn();
      } catch (err) {
        attempt++;
        if (attempt > retries) throw err;
        await sleep(delay * attempt);
      }
    }
  }

  return { run };
}
