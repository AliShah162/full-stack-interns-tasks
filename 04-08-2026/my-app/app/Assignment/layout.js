import Link from "next/link";

export default function BlogLayout({ children }) {
  return (
    <div>
      <nav style={{
        background: '#1a1a1a',
        padding: '1rem 2rem',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
        borderBottom: '2px solid #0070f3'
      }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          🏠 Home
        </Link>
        <Link href="/Assignment/blog" style={{ color: 'white', textDecoration: 'none' }}>
          📝 Blog
        </Link>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {children}
      </main>

      <footer style={{
        background: '#1a1a1a',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <p>© 2026 My Blog App. Built with Next.js</p>
      </footer>
    </div>
  );
}