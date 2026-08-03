function UserCard({ name, role, email, location, phone, avatar }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '320px',
      margin: '20px auto',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.18)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
    }}>
      
      {/* Avatar with gradient border */}
      <div style={{
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        margin: '0 auto 12px',
        padding: '4px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <img 
          src={avatar || "https://api.dicebear.com/7.x/micah/svg?seed=John"} //api for generating random avatars
          alt="User Avatar"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            display: 'block',
            objectFit: 'cover',
            background: '#fff'
          }}
        />
      </div>

      {/* Name */}
      <h2 style={{
        textAlign: 'center',
        margin: '0 0 4px',
        fontSize: '20px',
        fontWeight: '700',
        color: '#1a1a2e',
        letterSpacing: '0.5px'
      }}>
        {name}
      </h2>

      {/* Role with badge style */}
      <p style={{
        textAlign: 'center',
        color: '#667eea',
        margin: '0 0 16px',
        fontSize: '13px',
        fontWeight: '600',
        background: 'rgba(102, 126, 234, 0.1)',
        padding: '4px 12px',
        borderRadius: '20px',
        display: 'inline-block',
        width: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        {role}
      </p>

      {/* Divider */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #667eea, transparent)',//took the colors from internet
        margin: '0 0 14px'
      }} />

      {/* Details with icons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 10px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.6)',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}>
          <span style={{ fontSize: '16px' }}>✉</span>
          <span style={{ fontSize: '13px', color: '#333' }}>{email}</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 10px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.6)',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}>
          <span style={{ fontSize: '16px' }}>●</span>
          <span style={{ fontSize: '13px', color: '#333' }}>{location}</span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 10px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.6)',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.6)'}>
          <span style={{ fontSize: '16px' }}>⌂</span>
          <span style={{ fontSize: '13px', color: '#333' }}>{phone}</span>
        </div>
      </div>

      {/* Follow button */}
      <button style={{
        marginTop: '16px',
        padding: '10px 0',
        width: '100%',
        borderRadius: '25px',
        border: 'none',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.02)';
        e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
      }}>
        Follow
      </button>
    </div>
  );
}

export default UserCard;