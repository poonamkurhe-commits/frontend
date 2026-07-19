import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'

const Register = () => {
  const [data, setData] = useState({ username: '', email: '', password: '', full_name: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!data.username || !data.email || !data.password) return toast.error('Please fill all fields')
    if (data.password.length < 6) return toast.error('Password must be 6+ characters')
    setLoading(true)
    try {
      await api.post('/auth/register', data)
      toast.success('Account created! Please login 🎉')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a1a' }}>
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '2.5rem' }}>📚</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Create Account</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Start your learning journey</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input type="text" name="full_name" placeholder="Full Name" value={data.full_name} onChange={(e) => setData({ ...data, full_name: e.target.value })} style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: 'white', fontSize: '1rem', outline: 'none' }} />
          <input type="text" name="username" placeholder="Username *" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: 'white', fontSize: '1rem', outline: 'none' }} />
          <input type="email" name="email" placeholder="Email *" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} style={{ width: '100%', padding: '14px', marginBottom: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: 'white', fontSize: '1rem', outline: 'none' }} />
          <input type="password" name="password" placeholder="Password * (min 6)" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} style={{ width: '100%', padding: '14px', marginBottom: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: 'white', fontSize: '1rem', outline: 'none' }} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.transform = 'scale(1.02)'; e.target.style.boxShadow = '0 8px 25px rgba(102,126,234,0.3)' }} onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none' }}>{loading ? 'Creating...' : 'Create Account'}</button>
        </form>

        <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: '20px' }}>Already have account? <Link to="/login" style={{ color: '#667eea', textDecoration: 'none' }}>Login</Link></p>
      </div>
    </div>
  )
}

export default Register