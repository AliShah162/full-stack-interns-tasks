// app/(users)/layout.js - USERS LAYOUT (applies ONLY to pages inside (users))
export default function UsersLayout({ children }) {
  return (
    <>
       {/* This navbar is just not for about page becaue its outside the users folder */}
      <nav style={{ background: '#333', padding: '1rem', color: 'white' }}>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
          <li><a href="/services" style={{ color: 'white' }}>Services</a></li>
          <li><a href="/contact" style={{ color: 'white' }}>Contact</a></li>
          <li><a href="/blog" style={{ color: 'white' }}>Blog</a></li>
          <li><a href="/about" style={{ color: 'white' }}>About</a></li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
}