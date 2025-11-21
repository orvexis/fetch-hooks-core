# fetch-hooks-core

### Tiny, universal React-style hooks for `fetch()`.

**Works in Node · Bun · Deno · Cloudflare Workers · Edge Runtimes**

![npm](https://img.shields.io/npm/v/fetch-hooks-core)
![downloads](https://img.shields.io/npm/dt/fetch-hooks-core)
![license](https://img.shields.io/github/license/yourname/fetch-hooks-core)
![ci](https://img.shields.io/github/actions/workflow/status/yourname/fetch-hooks-core/ci.yml?branch=main)

---

## 🚀 Why?

Fetch is universal — but handling:

- loading states
- retries
- aborting
- concurrency
- polling

…is boilerplate-heavy everywhere outside of React.

**fetch-hooks-core** brings a familiar hook-like API to any JavaScript runtime:

```ts
const { data, loading, error, refresh } = await useFetch("/api");
```

No React.  
No dependencies.  
No runtime lock-in.

---

## 📦 Installation

```bash
npm install fetch-hooks-core
```

---

## ✨ Features

- React-style fetch hooks
- Tiny ( <2 KB ) & dependency-free
- Works in Node, Bun, Deno, Workers
- Built on signals — not React
- Supports retry logic
- Built-in concurrency helpers
- TypeScript-first

---

## 🔧 Usage

### `useFetch()`

```ts
import { useFetch } from "fetch-hooks-core";

const { data, loading, error, refresh } = await useFetch(
  "https://api.example.com"
);

console.log(data.value);
```

---

### `useRetry()`

```ts
import { useRetry } from "fetch-hooks-core";

const retry = useRetry(() => fetch("https://api.com"), {
  retries: 3,
  delay: 200,
});

const res = await retry.run();
```

---

### `usePoll()`

```ts
import { usePoll } from "fetch-hooks-core";

const state = usePoll("/metrics", 1000);

// stop polling after 5s
setTimeout(() => state.stop(), 5000);
```

---

### `useConcurrent()`

```ts
const { results } = await useConcurrent(
  [
    () => fetch("/1").then((r) => r.json()),
    () => fetch("/2").then((r) => r.json()),
    () => fetch("/3").then((r) => r.json()),
  ],
  { concurrency: 2 }
);
```

---

## 🧪 Testing

```bash
npm test
```

---

## 📄 License

MIT © 2025

---

## ⭐️ Show your support

If this project helps you, consider giving it a **star** on GitHub!
