// app/blog/[slug]/page.js
export default async function BlogPost({ params }) {
  const { slug } = await params;
  
  // In a real app, fetch from database or API
  // const post = await getPostBySlug(slug);
  
  // Mock data for demonstration
  const posts = {
    'hello-world': { 
      title: 'Hello World!', 
      content: 'Welcome to my blog! This is my first post.' 
    },
    'nextjs-guide': { 
      title: 'Next.js Guide', 
      content: 'Learn Next.js step by step. Build amazing apps!' 
    },
    'react-tips': { 
      title: 'React Tips & Tricks', 
      content: 'Useful React patterns to improve your code.' 
    },
  };

  const post = posts[slug];

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <a href="/blog" style={{ color: '#0070f3', textDecoration: 'none' }}>
        ← Back to all posts
      </a>
    </div>
  );
}