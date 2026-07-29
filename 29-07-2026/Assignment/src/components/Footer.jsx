function Footer() {
  return (
    <footer style={{
      background: '#1a1a2e',
      color: '#fff',
      padding: '30px 24px 20px',
      fontFamily: 'Arial, sans-serif',
      marginTop: '40px'
    }}>
      {/* Main Footer Content */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingBottom: '20px',
        borderBottom: '1px solid #333'
      }}>
        {/* Company Info */}
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h3 style={{
            fontSize: '18px',
            margin: '0 0 10px',
            color: '#667eea'
          }}>
            MyStore
          </h3>
          <p style={{
            fontSize: '13px',
            color: '#aaa',
            lineHeight: '1.6',
            margin: '0'
          }}>
            Your one-stop shop for quality products.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ flex: '1', minWidth: '120px' }}>
          <h4 style={{
            fontSize: '14px',
            margin: '0 0 10px',
            color: '#fff'
          }}>
            Quick Links
          </h4>
          <ul style={{
            listStyle: 'none',
            padding: '0',
            margin: '0'
          }}>
            <li style={{ marginBottom: '6px' }}>
              <a href="#" style={{
                color: '#aaa',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#667eea'}
              onMouseLeave={(e) => e.target.style.color = '#aaa'}>
                Home
              </a>
            </li>
            <li style={{ marginBottom: '6px' }}>
              <a href="#" style={{
                color: '#aaa',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#667eea'}
              onMouseLeave={(e) => e.target.style.color = '#aaa'}>
                Products
              </a>
            </li>
            <li style={{ marginBottom: '6px' }}>
              <a href="#" style={{
                color: '#aaa',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#667eea'}
              onMouseLeave={(e) => e.target.style.color = '#aaa'}>
                About
              </a>
            </li>
            <li style={{ marginBottom: '6px' }}>
              <a href="#" style={{
                color: '#aaa',
                textDecoration: 'none',
                fontSize: '13px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#667eea'}
              onMouseLeave={(e) => e.target.style.color = '#aaa'}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ flex: '1', minWidth: '150px' }}>
          <h4 style={{
            fontSize: '14px',
            margin: '0 0 10px',
            color: '#fff'
          }}>
            Contact
          </h4>
          <p style={{
            fontSize: '13px',
            color: '#aaa',
            margin: '0 0 6px'
          }}>
            ✉ info@mystore.com
          </p>
          <p style={{
            fontSize: '13px',
            color: '#aaa',
            margin: '0 0 6px'
          }}>
            ⌂ +1 234 567 8900
          </p>
          <p style={{
            fontSize: '13px',
            color: '#aaa',
            margin: '0'
          }}>
            ● 123 Main St, NY
          </p>
        </div>

        {/* Social Links */}
        <div style={{ flex: '1', minWidth: '120px' }}>
          <h4 style={{
            fontSize: '14px',
            margin: '0 0 10px',
            color: '#fff'
          }}>
            Follow Us
          </h4>
          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <a href="#" style={{
              color: '#aaa',
              fontSize: '18px',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#667eea'}
            onMouseLeave={(e) => e.target.style.color = '#aaa'}>
              f
            </a>
            <a href="#" style={{
              color: '#aaa',
              fontSize: '18px',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#667eea'}
            onMouseLeave={(e) => e.target.style.color = '#aaa'}>
              t
            </a>
            <a href="#" style={{
              color: '#aaa',
              fontSize: '18px',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#667eea'}
            onMouseLeave={(e) => e.target.style.color = '#aaa'}>
              i
            </a>
            <a href="#" style={{
              color: '#aaa',
              fontSize: '18px',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#667eea'}
            onMouseLeave={(e) => e.target.style.color = '#aaa'}>
              y
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        textAlign: 'center',
        paddingTop: '16px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <p style={{
          fontSize: '12px',
          color: '#666',
          margin: '0'
        }}>
          &copy; 2024 MyStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;