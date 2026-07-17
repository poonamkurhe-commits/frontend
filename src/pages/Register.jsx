import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        full_name: ''
    })
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, email, password } = formData

        if (!username || !email || !password) {
            toast.error('Please fill in all required fields')
            return
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setLoading(true)
        try {
            await register(formData)
            toast.success('Account created! Welcome to PrepAce 🎉')
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="container">
                <div className="auth-card fade-in">
                    <div className="auth-header">
                        <h2>Create Account</h2>
                        <p>Start your exam preparation journey today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Full Name (Optional)</label>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label>Username *</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="johndoe123"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password *</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Min 6 characters"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
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
          gap: 18px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-weight: 500;
          color: #1a1a2e;
          font-size: 0.95rem;
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

export default Register