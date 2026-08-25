// app/blog/page.js
import Link from "next/link";

export default async function Blog() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return (
    <div>
      <h1>Blog</h1>
      <p>Welcome to my blog! Here are all my posts:</p>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{   //key
            borderBottom: '1px solid #eee', 
            padding: '1rem 0' 
          }}>
            <Link href={`/CompanyWebsite/blog/${post.id}`} style={{  
              fontSize: '1.2rem', 
              textDecoration: 'none', 
              color: '#0070f3' 
            }}>
              {post.title}
            </Link>
            <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>
              Post ID: {post.id}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}