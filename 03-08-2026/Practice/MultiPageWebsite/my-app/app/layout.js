// app/layout.js
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "My Awesome Website",
  description: "A multi-page website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/*  NAVBAR  */}
        <nav style={{ 
          background: '#333', 
          padding: '1rem',
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center'
        }}>
          <Link href="/" style={{ color: 'white' }}>Home</Link>
          <Link href="/about" style={{ color: 'white' }}>About</Link>
          <Link href="/services" style={{ color: 'white' }}>Services</Link>
          <Link href="/blog" style={{ color: 'white' }}>Blog</Link>
          <Link href="/contact" style={{ color: 'white' }}>Contact</Link>
          <Link href="/products" style={{ color: 'white' }}>Products</Link>
        </nav>

        <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </main>

        {/* FOOTER  */}
        <footer style={{ 
          background: '#333', 
          color: 'white', 
          padding: '1rem',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <p>© 2026 My Website. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}