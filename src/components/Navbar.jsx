import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(10, 10, 26, 0.9)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '14px 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <span style={{ fontSize: '1.8rem' }}>📚</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>PrepAce</span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>Dashboard</Link>
              <Link to="/subjects" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}>Subjects</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 12px 6px 6px', borderRadius: '50px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.85rem' }}>{user?.full_name?.[0] || user?.username?.[0]}</div>
                <span style={{ color: 'white', fontWeight: 500 }}>{user?.full_name || user?.username}</span>
              </div>
              <button onClick={handleLogout} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', padding: '8px 20px', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.background = 'rgba(239,68,68,0.2)'; e.target.style.transform = 'scale(1.05)' }} onMouseLeave={(e) => { e.target.style.background = 'rgba(239,68,68,0.1)'; e.target.style.transform = 'scale(1)' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline" style={{ padding: '8px 24px' }}>Login</Link>
              <Link to="/register" className="btn-primary" style={{ padding: '8px 24px' }}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar