import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('❌ Please fill in all fields', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontWeight: 'bold',
          padding: '16px 24px',
          borderRadius: '12px'
        }
      })
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      toast.success('✅ Welcome back! Login successful 🎉', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#10b981',
          color: '#fff',
          fontWeight: 'bold',
          padding: '16px 24px',
          borderRadius: '12px'
        },
        icon: '👋'
      })
      setTimeout(() => {
        navigate('/dashboard')
      }, 500)
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Login failed. Please try again.'
      toast.error('❌ ' + errorMsg, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#ff6b6b',
          color: '#fff',
          fontWeight: 'bold',
          padding: '16px 24px',
          borderRadius: '12px'
        }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card fade-in">
          <div className="login-header">
            <div className="logo-icon">📚</div>
            <h1>Welcome Back</h1>
            <p>Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/register">Create Account</Link></p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .login-container {
          width: 100%;
          max-width: 420px;
        }
        .login-card {
          background: white;
          border-radius: 24px;
          padding: 45px 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: slideUp 0.6s ease;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .login-header {
          text-align: center;
          margin-bottom: 35px;
        }
        .logo-icon {
          font-size: 3.5rem;
          margin-bottom: 10px;
        }
        .login-header h1 {
          font-size: 2rem;
          color: #1a1a2e;
          margin-bottom: 8px;
        }
        .login-header p {
          color: #666;
          font-size: 0.95rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-weight: 600;
          color: #1a1a2e;
          font-size: 0.9rem;
        }
        .form-group input {
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s;
          background: #f8f9fa;
        }
        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }
        .form-group input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .btn-login {
          padding: 14px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          margin-top: 10px;
        }
        .btn-login:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        .btn-login:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        .login-footer {
          text-align: center;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 2px solid #f0f0f0;
        }
        .login-footer p {
          color: #666;
        }
        .login-footer a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
        }
        .login-footer a:hover {
          color: #764ba2;
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .login-card {
            padding: 30px 20px;
          }
          .login-header h1 {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Login