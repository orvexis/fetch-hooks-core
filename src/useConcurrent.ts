export async function useConcurrent<T>(
  tasks: Array<() => Promise<T>>,
  opts: { concurrency?: number } = {}
) {
  const { concurrency = 4 } = opts;

  const results: T[] = [];
  let index = 0;
  let active = 0;

  return new Promise<{ results: T[] }>((resolve, reject) => {
    function runNext() {
      if (index >= tasks.length && active === 0) {
        return resolve({ results });
      }

      while (active < concurrency && index < tasks.length) {
        const i = index++;
        const task = tasks[i];

        active++;

        task()
          .then((res) => {
            results[i] = res;
          })
          .catch(reject)
          .finally(() => {
            active--;
            runNext();
          });
      }
    }

    runNext();
  });
}
