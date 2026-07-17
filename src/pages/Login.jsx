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
            toast.error('Please fill in all fields')
            return
        }

        setLoading(true)
        try {
            await login(email, password)
            toast.success('Welcome back! 🎉')
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="container">
                <div className="auth-card fade-in">
                    <div className="auth-header">
                        <h2>Welcome Back</h2>
                        <p>Sign in to continue your learning journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .auth-page {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 0;
        }
        .auth-card {
          background: white;
          border-radius: 20px;
          padding: 50px;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .auth-header h2 {
          font-size: 2rem;
          color: #1a1a2e;
        }
        .auth-header p {
          color: #666;
          margin-top: 8px;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-group label {
          font-weight: 500;
          color: #1a1a2e;
        }
        .form-group input {
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        .form-group input:focus {
          outline: none;
          border-color: #667eea;
        }
        .btn {
          padding: 14px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1rem;
        }
        .btn-block {
          width: 100%;
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .auth-footer {
          text-align: center;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid #f0f0f0;
        }
        .auth-footer a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }
        .auth-footer a:hover {
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .auth-card {
            padding: 30px 20px;
            margin: 0 20px;
          }
        }
      `}</style>
        </div>
    )
}

export default Login