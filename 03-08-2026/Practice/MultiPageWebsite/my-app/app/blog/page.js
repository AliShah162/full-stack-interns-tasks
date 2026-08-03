// app/blog/page.js
export default function Blog() {
  // List of all blog posts
  const posts = [
    { slug: 'hello-world', title: 'Hello World!', date: '2026-08-03' },
    { slug: 'nextjs-guide', title: 'Next.js Guide', date: '2026-08-02' },
    { slug: 'react-tips', title: 'React Tips & Tricks', date: '2026-08-01' },
  ];

  return (
    <div>
      <h1>Blog</h1>
      <p>Welcome to my blog! Here are all my posts:</p>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ 
            borderBottom: '1px solid #eee', 
            padding: '1rem 0' 
          }}>
            <a href={`/blog/${post.slug}`} style={{ 
              fontSize: '1.2rem', 
              textDecoration: 'none', 
              color: '#0070f3' 
            }}>
              {post.title}
            </a>
            <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>{post.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}