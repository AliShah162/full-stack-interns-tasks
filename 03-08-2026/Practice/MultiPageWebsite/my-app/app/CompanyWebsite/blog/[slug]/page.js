// app/CompanyWebsite/blog/[slug]/page.js
import Link from "next/link";

export default async function BlogPost({ params }) {
  const { slug } = await params;
  
  // Fetch the specific post
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  
  // If post doesn't exist
  if (!res.ok) {
    return (
      <div>
        <h1>Post not found!</h1>
        <p>We couldnt find the blog post you are looking for.</p>
        <Link href="/CompanyWebsite/blog">← Back to all posts</Link>
      </div>
    );
  }
  
  const post = await res.json();

  return (
    <div>
      <Link href="/CompanyWebsite/blog" style={{ color: '#0070f3', textDecoration: 'none' }}>
        ← Back to all posts
      </Link>

      <div style={{ marginTop: '2rem' }}>
        <h1 style={{ textTransform: 'capitalize' }}>{post.title}</h1>
        <p style={{ color: '#666' }}>Post ID: {post.id}</p>
        <p style={{ 
          marginTop: '1rem', 
          lineHeight: '1.8',
          fontSize: '1.1rem' 
        }}>
          {post.body}
        </p>
      </div>
    </div>
  );
}