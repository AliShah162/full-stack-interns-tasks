import Link from "next/link";
import { notFound } from 'next/navigation';

export default async function BlogPost({params}){
    const {slug}=await params

    const res=await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)
    if (!res.ok) {
    notFound();//this is the not found page from nextjs
  }
const post=await res.json()//jsonify><><><><><><


return(
    <div>
      {/* Back Button */}
      <Link 
        href="/Assignment/blog"
        style={{
          display: 'inline-block',
          marginBottom: '2rem',
          color: '#0070f3',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        ← Back to all posts
      </Link>

      {/* Post Content */}
      <article style={{
        background: '#f9f9f9',
        padding: '2rem',
        borderRadius: '8px',
        color:'black',
        border: '1px solid #e0e0e0'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          {post.title}
        </h1>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          color: '#666',
          fontSize: '0.9rem',
          marginBottom: '1.5rem'
        }}>
          <span>📌 Post #{post.id}</span>
          <span>👤 User ID: {post.userId}</span>
        </div>
        
        <p style={{
          lineHeight: '1.8',
          fontSize: '1.1rem',
          color: '#333'
        }}>
          {post.body}
        </p>
      </article>
    </div>
  );




}