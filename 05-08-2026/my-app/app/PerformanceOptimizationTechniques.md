Here’s a curated list of the **most impactful performance optimization techniques** for React and Next.js, categorized by when and where they apply.

---

## 1. Core React Optimization (Component-Level)

### ✅ Use `React.memo` for Pure Components
- Prevents re-rendering if props haven’t changed.
- Best for frequently rendered, expensive components.

```jsx
const ExpensiveComponent = React.memo(({ data }) => { ... });
```

### ✅ Use `useMemo` for Expensive Calculations
- Memoizes computed values between renders.

```jsx
const filteredData = useMemo(() => data.filter(...), [data]);
```

### ✅ Use `useCallback` for Stable Function References
- Prevents child components from re-rendering due to function identity changes.

```jsx
const handleClick = useCallback(() => { ... }, [deps]);
```

### ✅ Lazy Loading with `React.lazy` + `Suspense`
- Splits code at the component level.

```jsx
const LazyComponent = React.lazy(() => import('./HeavyComponent'));
```

---

## 2. Next.js-Specific Optimizations

### ✅ Image Optimization (`next/image`)
- Automatically serves WebP/AVIF, lazy loads, and resizes images.

```jsx
import Image from 'next/image';
<Image src="..." width={800} height={600} alt="..." />
```

### ✅ Link Prefetching (`next/link`)
- Prefetches pages in the background when they enter the viewport.

```jsx
<Link href="/dashboard" prefetch>Dashboard</Link>
```

### ✅ Dynamic Imports (`next/dynamic`)
- Load components only when needed (client-side).

```jsx
const HeavyChart = dynamic(() => import('./Chart'), { ssr: false });
```

### ✅ Static Generation (SSG) over SSR
- Use `getStaticProps` for data that doesn’t change often.

```jsx
export async function getStaticProps() { ... }
```

### ✅ Incremental Static Regeneration (ISR)
- Rebuild static pages at runtime without full rebuild.

```jsx
export async function getStaticProps() {
  return { props: {...}, revalidate: 60 };
}
```

---

## 3. Data Fetching & State Management

### ✅ Use SWR or React Query
- Caches data, dedupes requests, and revalidates automatically.

```jsx
const { data } = useSWR('/api/user', fetcher);
```

### ✅ Avoid Prop Drilling with Context/Zustand
- Prevents unnecessary re-renders caused by passing props deep down.

### ✅ Batch State Updates
- Group multiple `setState` calls together (React 18 does this automatically in event handlers).

---

## 4. Bundle Size Optimization

### ✅ Tree Shaking
- Use named imports instead of default imports from large libraries.

```jsx
// Bad
import _ from 'lodash';

// Good
import debounce from 'lodash/debounce';
```

### ✅ Remove Unused Dependencies
- Use tools like `depcheck` or `@next/bundle-analyzer`.

### ✅ Use ES Modules over CommonJS
- Better tree-shaking support.

---

## 5. Rendering Performance

### ✅ Virtualize Long Lists
- Use `react-window` or `react-virtualized` to render only visible items.

```jsx
import { FixedSizeList } from 'react-window';
```

### ✅ Avoid Inline Functions in Render
- Creates new functions on every render → breaks `React.memo`.

### ✅ Use `useDeferredValue` / `useTransition` (React 18)
- Keep UI responsive during expensive updates.

```jsx
const [isPending, startTransition] = useTransition();
startTransition(() => setFilter(input));
```

---

## 6. Next.js Advanced

### ✅ Middleware Optimization
- Keep middleware lightweight — runs on every request.

### ✅ Use `output: 'standalone'`
- Reduces deployment size in Docker/self-hosted setups.

### ✅ Edge Runtime for Low-Latency
- For serverless functions that need speed over Node.js features.

---

## 7. Monitoring & Measurement

### ✅ Lighthouse / Chrome DevTools
- Measure Core Web Vitals (LCP, FID, CLS).

### ✅ Next.js Built-in Analytics
- Use `next/script` with `strategy="lazyOnload"` for third-party scripts.

### ✅ React DevTools Profiler
- Identify which components are re-rendering and why.

---

## 📊 Priority Cheat Sheet

| **Technique** | **Impact** | **Effort** |
|---------------|------------|------------|
| Image optimization | High | Low |
| Code splitting / lazy loading | High | Medium |
| Memoization (`memo`, `useMemo`) | Medium | Low |
| Virtualized lists | High (for long lists) | Medium |
| SSG / ISR | High | Medium |
| Bundle analysis | Medium | Low |
| React Query / SWR | High | Medium |

---

Would you like a deep dive into any of these (e.g., **ISR vs SSR**, **React 18 concurrent features**, or **bundle analysis setup**)?