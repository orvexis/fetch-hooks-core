# fetch-hooks-core

<p align="center">
  <img src="./logo.svg" width="60%">
</p>

<p align="center">
  <strong>Tiny, universal React-style hooks for fetch()</strong><br/>
  Works in Node · Bun · Deno · Cloudflare Workers · Edge Runtimes
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/fetch-hooks-core">
    <img src="https://img.shields.io/npm/v/fetch-hooks-core?color=38bdf8&label=version&style=for-the-badge" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/fetch-hooks-core">
    <img src="https://img.shields.io/npm/dt/fetch-hooks-core?color=0ea5e9&style=for-the-badge" alt="downloads">
  </a>
  <a href="https://github.com/devforgetech/fetch-hooks-core/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/devforgetech/fetch-hooks-core?color=14b8a6&style=for-the-badge" alt="license">
  </a>
  <a href="https://github.com/devforgetech/fetch-hooks-core/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/devforgetech/fetch-hooks-core/ci.yml?style=for-the-badge&color=8b5cf6" alt="CI Status">
  </a>
  <a href="https://bundlephobia.com/package/fetch-hooks-core">
    <img src="https://img.shields.io/bundlephobia/minzip/fetch-hooks-core?style=for-the-badge&color=f472b6" alt="bundle size">
  </a>
</p>

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

## 📦 GitHub Repository

You can find the full source code, issues, discussions, and documentation here:

👉 **https://github.com/devforgetech/fetch-hooks-core**
