function Navbar() {
  return (
    <nav style={{
      background: '#1a1a2e',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Logo */}
      <div style={{
        color: '#fff',
        fontSize: '20px',
        fontWeight: '700',
        letterSpacing: '1px'
      }}>
        MyStore
      </div>

      {/* Navigation Links */}
      <div style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'center'
      }}>
        <a href="#" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500',
          padding: '6px 0',
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.borderColor = '#667eea'}
        onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}>
          Home
        </a>

        <a href="#" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500',
          padding: '6px 0',
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.borderColor = '#667eea'}
        onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}>
          Products
        </a>

        <a href="#" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500',
          padding: '6px 0',
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.borderColor = '#667eea'}
        onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}>
          About
        </a>

        <a href="#" style={{
          color: '#fff',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500',
          padding: '6px 0',
          borderBottom: '2px solid transparent',
          transition: 'border-color 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.borderColor = '#667eea'}
        onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}>
          Contact
        </a>

        {/* Cart Icon */}
        <button style={{
          background: 'transparent',
          border: '1px solid #667eea',
          borderRadius: '6px',
          padding: '6px 14px',
          color: '#fff',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = '#667eea'}
        onMouseLeave={(e) => e.target.style.background = 'transparent'}>
          🛒 Cart
        </button>
      </div>
    </nav>
  );
}

export default Navbar;