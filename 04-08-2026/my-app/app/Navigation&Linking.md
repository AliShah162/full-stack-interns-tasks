**Excellent!** Let's dive into **Navigation** and **Linking** in Next.js. This is how users move around your app! 🚀

---

## 🎯 Navigation in Next.js

Next.js provides two main ways to navigate:

| Method | Component | Use Case |
| :--- | :--- | :--- |
| **Client-Side Navigation** | `<Link>` | Fast, SPA-like navigation |
| **Programmatic Navigation** | `useRouter` | Navigate from code (after form submit, etc.) |
| **Regular Navigation** | `<a>` | ❌ Avoid - causes full page reload |

---

## 📝 1. The `<Link>` Component (Client-Side Navigation)

### Basic Usage
```jsx
// app/CompanyWebsite/layout.js
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <nav>
        {/* ✅ Client-side navigation - NO page reload! */}
        <Link href="/">Home</Link>
        <Link href="/CompanyWebsite/about">About</Link>
        <Link href="/CompanyWebsite/blog">Blog</Link>
        <Link href="/CompanyWebsite/products">Products</Link>
        <Link href="/CompanyWebsite/contact">Contact</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
```

---

## 🎨 Advanced Link Features

### 1. **Active Link Styling**
```jsx
// app/CompanyWebsite/layout.js
'use client'; // ✅ Need client component for usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <div>
      <nav style={{ display: 'flex', gap: '2rem' }}>
        {/* ✅ Highlight active link */}
        <Link 
          href="/" 
          style={{ 
            color: pathname === '/' ? '#0070f3' : '#333',
            fontWeight: pathname === '/' ? 'bold' : 'normal'
          }}
        >
          Home
        </Link>
        
        <Link 
          href="/CompanyWebsite/about"
          style={{ 
            color: pathname === '/CompanyWebsite/about' ? '#0070f3' : '#333',
            fontWeight: pathname === '/CompanyWebsite/about' ? 'bold' : 'normal'
          }}
        >
          About
        </Link>
        
        <Link 
          href="/CompanyWebsite/blog"
          style={{ 
            color: pathname === '/CompanyWebsite/blog' ? '#0070f3' : '#333',
            fontWeight: pathname === '/CompanyWebsite/blog' ? 'bold' : 'normal'
          }}
        >
          Blog
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
```

### 2. **Replace Prop** (Replace History)
```jsx
// app/CompanyWebsite/auth/login/page.js
import Link from "next/link";

export default function Login() {
  return (
    <div>
      {/* ✅ Replace: No back button to login page */}
      <Link href="/CompanyWebsite/dashboard" replace>
        Go to Dashboard
      </Link>
    </div>
  );
}
```

### 3. **Scroll Prop** (Control Scrolling)
```jsx
// app/CompanyWebsite/blog/page.js
import Link from "next/link";

export default function Blog() {
  return (
    <div>
      {/* ✅ Scroll to top on navigation (default) */}
      <Link href="/CompanyWebsite/blog/post1" scroll={true}>
        Go to Post 1
      </Link>
      
      {/* ❌ Don't scroll to top */}
      <Link href="/CompanyWebsite/blog/post2" scroll={false}>
        Go to Post 2 (stay in position)
      </Link>
    </div>
  );
}
```

### 4. **Prefetching** (Load in Background)
```jsx
// app/CompanyWebsite/products/page.js
import Link from "next/link";

export default function Products() {
  return (
    <div>
      {/* ✅ Prefetch: Loads in background (default) */}
      <Link href="/CompanyWebsite/products/1" prefetch={true}>
        View Product 1
      </Link>
      
      {/* ❌ Don't prefetch (for large pages) */}
      <Link href="/CompanyWebsite/products/2" prefetch={false}>
        View Product 2
      </Link>
    </div>
  );
}
```

### 5. **Dynamic Links**
```jsx
// app/CompanyWebsite/blog/page.js
import Link from "next/link";

export default async function Blog() {
  const posts = await fetchPosts();

  return (
    <div>
      {/* ✅ Dynamic links */}
      {posts.map((post) => (
        <Link 
          key={post.id} 
          href={`/CompanyWebsite/blog/${post.slug}`}
        >
          {post.title}
        </Link>
      ))}
    </div>
  );
}
```

### 6. **Link with Query Params**
```jsx
// app/CompanyWebsite/products/page.js
import Link from "next/link";

export default function Products() {
  return (
    <div>
      {/* ✅ Links with query parameters */}
      <Link href="/CompanyWebsite/products?category=electronics">
        Electronics
      </Link>
      <Link href="/CompanyWebsite/products?category=clothing">
        Clothing
      </Link>
      <Link href="/CompanyWebsite/products?sort=price&order=asc">
        Sort by Price
      </Link>
    </div>
  );
}
```

---

## 📝 2. Programmatic Navigation (`useRouter`)

### Basic Usage
```jsx
// app/CompanyWebsite/components/LoginForm.jsx
'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // ✅ Navigate programmatically
    router.push('/CompanyWebsite/dashboard');
    // router.replace('/CompanyWebsite/dashboard'); // No back button
    // router.back(); // Go back
    // router.forward(); // Go forward
  };

  return (
    <form onSubmit={handleLogin}>
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### `useRouter` Methods
```jsx
'use client';
import { useRouter } from "next/navigation";

export default function NavigationButtons() {
  const router = useRouter();

  return (
    <div>
      {/* Navigate to a page */}
      <button onClick={() => router.push('/CompanyWebsite/about')}>
        Go to About
      </button>
      
      {/* Replace (no back button) */}
      <button onClick={() => router.replace('/CompanyWebsite/dashboard')}>
        Replace with Dashboard
      </button>
      
      {/* Go back */}
      <button onClick={() => router.back()}>
        Go Back
      </button>
      
      {/* Go forward */}
      <button onClick={() => router.forward()}>
        Go Forward
      </button>
      
      {/* Refresh current page */}
      <button onClick={() => router.refresh()}>
        Refresh Page
      </button>
    </div>
  );
}
```

---

## 🎨 Complete Example: Navigation with Active Styles

```jsx
// app/CompanyWebsite/layout.js
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }) {
  const pathname = usePathname();

  // ✅ Navigation links with active styles
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/CompanyWebsite/about', label: 'About' },
    { href: '/CompanyWebsite/blog', label: 'Blog' },
    { href: '/CompanyWebsite/products', label: 'Products' },
    { href: '/CompanyWebsite/contact', label: 'Contact' },
  ];

  return (
    <div>
      <nav style={{
        background: '#333',
        padding: '1rem',
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center'
      }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: isActive ? '#0070f3' : 'white',
                fontWeight: isActive ? 'bold' : 'normal',
                borderBottom: isActive ? '2px solid #0070f3' : 'none',
                paddingBottom: '0.25rem',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      <main style={{ padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
```

---

## 🧠 Link vs `useRouter`

| Feature | `<Link>` | `useRouter` |
| :--- | :--- | :--- |
| **Use Case** | Navigation links in UI | Navigate from code |
| **When to use** | Buttons, menus, cards | After form submit, API calls |
| **Prefetching** | ✅ Automatic | ❌ Manual |
| **Active styles** | ✅ Easy | ⚠️ With `usePathname` |
| **Example** | `<Link href="/about">` | `router.push('/about')` |

---

## 🔍 Navigating with Query Params

### Reading Query Params
```jsx
// app/CompanyWebsite/products/page.js
'use client';

import { useSearchParams } from "next/navigation";

export default function Products() {
  const searchParams = useSearchParams();
  
  // ✅ Get query parameters
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  
  return (
    <div>
      <p>Category: {category || 'All'}</p>
      <p>Sort: {sort || 'default'}</p>
    </div>
  );
}
```

### Setting Query Params with Link
```jsx
// app/CompanyWebsite/products/page.js
import Link from "next/link";

export default function Products() {
  return (
    <div>
      <Link href="/CompanyWebsite/products?category=electronics">
        Electronics
      </Link>
      <Link href="/CompanyWebsite/products?category=clothing">
        Clothing
      </Link>
      <Link href="/CompanyWebsite/products?sort=price&order=asc">
        Sort by Price
      </Link>
    </div>
  );
}
```

---

## 🎯 Best Practices

### ✅ DO:
```jsx
// ✅ Use Link for navigation
<Link href="/about">About</Link>

// ✅ Use useRouter for programmatic navigation
const router = useRouter();
router.push('/dashboard');

// ✅ Use 'replace' for redirects after login
router.replace('/dashboard');

// ✅ Use dynamic href with template literals
<Link href={`/blog/${post.slug}`}>Read More</Link>

// ✅ Use pathname for active styles
const pathname = usePathname();
const isActive = pathname === '/about';
```

### ❌ DON'T:
```jsx
// ❌ Don't use <a> tags for internal navigation
<a href="/about">About</a> // Full page reload!

// ❌ Don't use window.location
window.location.href = '/about'; // Full page reload!

// ❌ Don't use router.push without 'use client'
const router = useRouter(); // ❌ Must be in client component

// ❌ Don't forget the 'use client' directive
'use client'; // Required for useRouter and usePathname
```

---

## 📊 Performance Comparison

| Navigation Type | Speed | Page Reload | SEO |
| :--- | :--- | :--- | :--- |
| **`<Link>` (Client)** | ⚡ Fast | ❌ No | ✅ Good |
| **`useRouter`** | ⚡ Fast | ❌ No | ✅ Good |
| **`<a>` tag** | 🐢 Slow | ✅ Yes | ✅ Good |
| **`window.location`** | 🐢 Slow | ✅ Yes | ✅ Good |

---

## 🎯 Summary

| Feature | What It Does |
| :--- | :--- |
| **`<Link>`** | Client-side navigation with prefetching |
| **`useRouter`** | Programmatic navigation from code |
| **`usePathname`** | Get current path for active styles |
| **`useSearchParams`** | Read query parameters |
| **`prefetch`** | Load pages in background |
| **`replace`** | Navigate without adding to history |
| **`scroll`** | Control scroll position |
| **`back()`** | Go back in history |
| **`refresh()`** | Refresh current page |

---

**Next.js navigation is fast, smooth, and SEO-friendly!** 🚀🎯