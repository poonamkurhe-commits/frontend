import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import toast from 'react-hot-toast'
import ResultCard from '../components/ResultCard'

const Dashboard = () => {
    const { user } = useAuth()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)

    const subjects = [
        { name: 'Mathematics', icon: '📐', color: '#667eea' },
        { name: 'Physics', icon: '⚡', color: '#f5576c' },
        { name: 'Chemistry', icon: '🧪', color: '#f093fb' },
        { name: 'Computer Science', icon: '💻', color: '#4facfe' },
        { name: 'Biology', icon: '🧬', color: '#43e97b' },
        { name: 'English', icon: '📖', color: '#fa709a' }
    ]

    useEffect(() => {
        fetchResults()
    }, [])

    const fetchResults = async () => {
        try {
            const response = await api.get('/results/history')
            setResults(response.data)
        } catch (error) {
            toast.error('Failed to fetch results')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header fade-in">
                    <div>
                        <h1>Welcome back, {user?.full_name || user?.username}!</h1>
                        <p>Choose a subject to start practicing</p>
                    </div>
                    <div className="header-stats">
                        <div className="stat-badge">
                            <span className="stat-icon">🏆</span>
                            <span>{results.length} attempts</span>
                        </div>
                    </div>
                </div>

                <div className="subjects-grid">
                    {subjects.map((subject, idx) => (
                        <Link
                            key={subject.name}
                            to={`/subject/${subject.name.toLowerCase()}`}
                            className="subject-card fade-in"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                            <div className="subject-icon" style={{ background: subject.color }}>
                                {subject.icon}
                            </div>
                            <h3>{subject.name}</h3>
                            <p>Practice MCQ, Viva & Coding</p>
                            <span className="arrow">→</span>
                        </Link>
                    ))}
                </div>

                {results.length > 0 && (
                    <div className="recent-results">
                        <h2>Recent Results</h2>
                        <div className="results-grid">
                            {results.slice(0, 3).map((result, idx) => (
                                <ResultCard key={result.id} result={result} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        .dashboard {
          padding: 40px 0;
          min-height: calc(100vh - 80px);
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 20px;
        }
        .dashboard-header h1 {
          color: white;
          font-size: 2.5rem;
        }
        .dashboard-header p {
          color: rgba(255,255,255,0.9);
          font-size: 1.1rem;
          margin-top: 5px;
        }
        .header-stats {
          display: flex;
          gap: 15px;
        }
        .stat-badge {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          padding: 10px 20px;
          border-radius: 12px;
          color: white;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stat-icon {
          font-size: 1.2rem;
        }
        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 25px;
          margin-bottom: 50px;
        }
        .subject-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          color: white;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        .subject-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .subject-card:hover .arrow {
          transform: translateX(5px);
        }
        .subject-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 15px;
        }
        .subject-card h3 {
          margin-bottom: 5px;
        }
        .subject-card p {
          opacity: 0.8;
          font-size: 0.9rem;
        }
        .arrow {
          display: inline-block;
          margin-top: 10px;
          transition: transform 0.3s;
        }
        .recent-results {
          margin-top: 20px;
        }
        .recent-results h2 {
          color: white;
          margin-bottom: 20px;
        }
        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        @media (max-width: 768px) {
          .dashboard-header h1 {
            font-size: 2rem;
          }
          .subjects-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 15px;
          }
          .subject-card {
            padding: 20px;
          }
        }
      `}</style>
        </div>
    )
}

export default Dashboard