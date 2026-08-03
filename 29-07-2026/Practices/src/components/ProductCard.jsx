function ProductCard({ name, price, image, description, rating }) {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '16px',
      maxWidth: '280px',
      margin: '20px auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      fontFamily: 'Arial, sans-serif',
      background: '#ffffff'
    }}>
      {/* Product Image */}
      <img 
        src={image || "https://placehold.co/280x200/eee/999?text=Product"} 
        alt={name}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '12px'
        }}
      />

      {/* Product Name */}
      <h3 style={{
        margin: '0 0 6px',
        fontSize: '16px',
        fontWeight: '700',
        color: '#1a1a2e'
      }}>
        {name}
      </h3>

      {/* Rating */}
      <div style={{
        margin: '0 0 6px',
        fontSize: '13px',
        color: '#f5a623'
      }}>
        {'★'.repeat(Math.floor(rating || 4))}
        {'☆'.repeat(5 - Math.floor(rating || 4))}
        <span style={{ color: '#888', marginLeft: '6px', fontSize: '12px' }}>
          ({rating || 4.0})
        </span>
      </div>

      {/* Description */}
      <p style={{
        margin: '0 0 12px',
        fontSize: '13px',
        color: '#666',
        lineHeight: '1.5'
      }}>
        {description || 'No description available'}
      </p>

      {/* Price and Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #eee',
        paddingTop: '12px'
      }}>
        <span style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#2e7d32'
        }}>
          ${price || 0}
        </span>
        
        <button style={{
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          background: '#3b82f6',
          color: '#fff',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = '#2563eb'}
        onMouseLeave={(e) => e.target.style.background = '#3b82f6'}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;