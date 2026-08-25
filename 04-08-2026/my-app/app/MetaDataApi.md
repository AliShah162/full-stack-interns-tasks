**Excellent!** The Metadata API is how Next.js handles SEO (Search Engine Optimization) and page information. Let me break it down simply! 🚀

---

## 🎯 What is the Metadata API?

**Metadata API** is Next.js's built-in way to add SEO tags (title, description, etc.) to your pages. It automatically generates `<head>` tags for each page!

---

## 📊 Two Ways to Use Metadata

| Method | Use Case | Example |
| :--- | :--- | :--- |
| **Static Metadata** | For simple, non-dynamic pages | About page, Contact page |
| **Dynamic Metadata** | When data comes from an API | Blog post, Product page |

---

## 📝 1. Static Metadata (Simple Pages)

```jsx
// app/CompanyWebsite/about/page.js

// ✅ Static metadata - same for every visit
export const metadata = {
  title: "About Us | My Company",
  description: "Learn more about our company and mission",
  keywords: "company, about, mission",
};

export default function About() {
  return <h1>About Us</h1>;
}
```

---

## 📝 2. Dynamic Metadata (Pages with Data)

```jsx
// app/CompanyWebsite/blog/[slug]/page.js
import { notFound } from 'next/navigation';

// ✅ Dynamic metadata - changes based on the post
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const post = await res.json();

  return {
    title: post.title,
    description: post.body.substring(0, 150),
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const post = await res.json();

  return <h1>{post.title}</h1>;
}
```

---

## 🧠 Metadata Properties You Can Use

```jsx
export const metadata = {
  // 🏷️ Basic Tags
  title: "My Page Title",
  description: "This is my page description",
  keywords: "nextjs, react, web development",
  
  // 👁️ Open Graph (for social media sharing)
  openGraph: {
    title: "My Page Title",
    description: "This is my page description",
    url: "https://mywebsite.com/page",
    siteName: "My Website",
    images: [
      {
        url: "https://mywebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // 🐦 Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "My Page Title",
    description: "This is my page description",
    site: "@mywebsite",
    creator: "@mywebsite",
    images: ["https://mywebsite.com/og-image.jpg"],
  },
  
  // 🔗 Canonical URL
  alternates: {
    canonical: "https://mywebsite.com/page",
  },
  
  // 🤖 Robots
  robots: {
    index: true,
    follow: true,
    noarchive: true,
  },
  
  // 📱 Viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  
  // 🎨 Theme Color
  themeColor: "#0070f3",
  
  // ⚡ Icons
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
  },
};
```

---

## 📝 Complete Example: Company Website

### 1. **Root Layout** (`app/layout.js`) - Global Metadata
```jsx
// app/layout.js
export const metadata = {
  title: {
    default: "My Company", // Used as fallback
    template: "%s | My Company", // %s gets replaced by page title
  },
  description: "Welcome to My Company - Building amazing web experiences",
  keywords: "company, web development, services",
  openGraph: {
    title: "My Company",
    description: "Building amazing web experiences",
    url: "https://mycompany.com",
    siteName: "My Company",
    images: [
      {
        url: "https://mycompany.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mycompany",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### 2. **About Page** (`app/CompanyWebsite/about/page.js`)
```jsx
// app/CompanyWebsite/about/page.js

// ✅ Static metadata
export const metadata = {
  title: "About Us", // Becomes: "About Us | My Company"
  description: "Learn about our company history and mission",
};

export default function About() {
  return <h1>About Us</h1>;
}
```

### 3. **Blog Listing** (`app/CompanyWebsite/blog/page.js`)
```jsx
// app/CompanyWebsite/blog/page.js
export const metadata = {
  title: "Blog", // Becomes: "Blog | My Company"
  description: "Read our latest blog posts and updates",
};

export default async function Blog() {
  // ... blog listing code
}
```

### 4. **Blog Post** (`app/CompanyWebsite/blog/[slug]/page.js`)
```jsx
// app/CompanyWebsite/blog/[slug]/page.js
import { notFound } from 'next/navigation';

// ✅ Dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  
  if (!res.ok) {
    return {
      title: "Post Not Found",
    };
  }
  
  const post = await res.json();

  return {
    title: post.title,
    description: post.body.substring(0, 150),
    openGraph: {
      title: post.title,
      description: post.body.substring(0, 150),
      type: "article",
    },
    twitter: {
      title: post.title,
      description: post.body.substring(0, 150),
    },
  };
}

export default async function BlogPost({ params }) {
  // ... blog post code
}
```

---

## 📊 How Title Templating Works

### In Root Layout:
```jsx
// app/layout.js
export const metadata = {
  title: {
    default: "My Company",
    template: "%s | My Company", // ← %s gets replaced
  },
};
```

### In Pages:
| Page | Metadata | Final Title |
| :--- | :--- | :--- |
| About | `title: "About Us"` | "About Us | My Company" |
| Blog | `title: "Blog"` | "Blog | My Company" |
| Blog Post | `title: post.title` | "Post Title | My Company" |
| Home | (none) | "My Company" (default) |

---

## 🔄 Metadata vs generateMetadata

```jsx
// ✅ For STATIC pages
export const metadata = {
  title: "About Us",
  description: "Learn about us",
};

// ✅ For DYNAMIC pages
export async function generateMetadata({ params }) {
  const data = await fetchData(params.id);
  return {
    title: data.title,
    description: data.description,
  };
}
```

---

## 📱 Viewport Metadata (Next.js 14+)

```jsx
// app/layout.js
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// Or in page:
export const viewport = {
  themeColor: "#0070f3",
};
```

---

## 🎯 Best Practices

### ✅ Good:
```jsx
// app/layout.js (Global)
export const metadata = {
  title: {
    default: "My Company",
    template: "%s | My Company",
  },
  description: "Company description",
};

// app/blog/page.js (Page-specific)
export const metadata = {
  title: "Blog", // Overrides the default
  description: "Read our blog posts",
};
```

### ❌ Avoid:
```jsx
// ❌ Don't duplicate metadata
export const metadata = {
  title: "Home | My Company", // Already have template
};

// ❌ Don't forget og:image for social sharing
export const metadata = {
  title: "My Page",
  // Missing openGraph
};
```

---

## 🎯 Summary

| Feature | What It Does |
| :--- | :--- |
| **`export const metadata`** | Static metadata for pages |
| **`export async function generateMetadata`** | Dynamic metadata from API |
| **`title.template`** | Formats page titles consistently |
| **`openGraph`** | Social media sharing preview |
| **`twitter`** | Twitter card preview |
| **`robots`** | Search engine indexing rules |

---

## 🚀 Why Use Metadata API?

1. ✅ **Automatic `<head>` generation** - No manual `<Head>` component needed
2. ✅ **SEO optimized** - Better search engine rankings
3. ✅ **Social sharing** - Beautiful previews on Twitter/Facebook
4. ✅ **TypeScript support** - Autocomplete for all properties
5. ✅ **Clean code** - No messy `<head>` tags everywhere

---

**Now your pages will be SEO-friendly and look great when shared on social media!** 🚀🎯