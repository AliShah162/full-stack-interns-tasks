import Link from "next/link";

//  Server-side data fetching


export const metadata={
    title:"Ali", //this will be shown on title at the top.
    description:"This is ali's website"
}
export default async function Blog() {
  // Fetch all posts from JSONPlaceholder
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        📝 Blog Posts
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Showing {posts.length} posts
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {posts.map((post) => (
          <article 
            key={post.id}
            style={{
              border: '1px solid #e0e0e0',
              padding: '1.5rem',
              borderRadius: '8px',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
          >
            <Link 
              href={`/Assignment/blog/${post.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h2 style={{ 
                fontSize: '1.5rem', 
                marginBottom: '0.5rem',
                color: '#0070f3',
                transition: 'color 0.2s'
              }}>
                {post.title}
              </h2>
            </Link>
            
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              Post #{post.id} • User ID: {post.userId}
            </p>
            
            <p style={{ lineHeight: '1.6' }}>
              {post.body.substring(0, 150)}...
            </p>
            
            <Link 
              href={`/Assignment/blog/${post.id}`}
              style={{
                display: 'inline-block',
                marginTop: '1rem',
                color: '#0070f3',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Read More →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}