import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
    const { user } = useAuth()

    return (
        <div className="home-page">
            <div className="container">
                <div className="hero fade-in">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Ace Your Exams with <span className="gradient-text">PrepAce</span>
                        </h1>
                        <p className="hero-subtitle">
                            Master any subject with interactive MCQ, Viva, and Coding practice.
                            Get instant feedback and track your progress.
                        </p>
                        <div className="hero-buttons">
                            {user ? (
                                <Link to="/dashboard" className="btn btn-primary btn-large">
                                    Go to Dashboard →
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register" className="btn btn-primary btn-large">
                                        Get Started Free
                                    </Link>
                                    <Link to="/login" className="btn btn-outline btn-large">
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Questions</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Subjects</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">3</span>
                            <span className="stat-label">Modes</span>
                        </div>
                    </div>
                </div>

                <div className="features">
                    <div className="feature-card fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="feature-icon">📝</div>
                        <h3>MCQ Practice</h3>
                        <p>Test your knowledge with multiple choice questions and get detailed explanations.</p>
                    </div>
                    <div className="feature-card fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="feature-icon">🎤</div>
                        <h3>Viva Preparation</h3>
                        <p>Practice answering oral questions with AI-powered feedback and suggestions.</p>
                    </div>
                    <div className="feature-card fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="feature-icon">💻</div>
                        <h3>Coding Challenges</h3>
                        <p>Solve programming problems with real-time code execution and testing.</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .home-page {
          min-height: calc(100vh - 80px);
          padding: 60px 0;
          display: flex;
          align-items: center;
        }
        .hero {
          text-align: center;
          margin-bottom: 60px;
        }
        .hero-content {
          max-width: 700px;
          margin: 0 auto;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: white;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .gradient-text {
          background: linear-gradient(135deg, #f093fb, #f5576c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.9);
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .hero-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          padding: 14px 35px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          font-size: 1.05rem;
        }
        .btn-large {
          padding: 16px 40px;
          font-size: 1.1rem;
        }
        .btn-primary {
          background: white;
          color: #667eea;
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255,255,255,0.3);
        }
        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        .btn-outline:hover {
          background: white;
          color: #667eea;
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin-top: 50px;
          padding: 30px;
          background: rgba(255,255,255,0.1);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        .stat {
          text-align: center;
        }
        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
        }
        .stat-label {
          color: rgba(255,255,255,0.8);
          font-size: 0.95rem;
        }
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }
        .feature-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          color: white;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .feature-icon {
          font-size: 3rem;
          margin-bottom: 15px;
        }
        .feature-card h3 {
          margin-bottom: 10px;
        }
        .feature-card p {
          opacity: 0.9;
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-stats {
            gap: 30px;
            flex-wrap: wrap;
          }
          .stat-number {
            font-size: 2rem;
          }
        }
      `}</style>
        </div>
    )
}

export default Home