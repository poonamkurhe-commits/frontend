import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully')
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-content">
                    <Link to="/" className="logo">
                        <span className="logo-icon">📚</span>
                        <span className="logo-text">PrepAce</span>
                    </Link>

                    <div className="nav-links">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                <span className="user-greeting">👋 {user.username}</span>
                                <button onClick={handleLogout} className="btn btn-outline">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline">Login</Link>
                                <Link to="/register" className="btn btn-primary">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
        .navbar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          padding: 16px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.5rem;
          color: #667eea;
        }
        .logo-icon {
          font-size: 2rem;
        }
        .logo-text {
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-link {
          text-decoration: none;
          color: #1a1a2e;
          font-weight: 500;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: #667eea;
        }
        .user-greeting {
          color: #1a1a2e;
          font-weight: 500;
        }
        .btn {
          padding: 8px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
        }
        .btn-outline {
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
        }
        .btn-outline:hover {
          background: #667eea;
          color: white;
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        @media (max-width: 768px) {
          .nav-links {
            gap: 10px;
          }
          .logo-text {
            display: none;
          }
          .user-greeting {
            display: none;
          }
        }
      `}</style>
        </nav>
    )
}

export default Navbar