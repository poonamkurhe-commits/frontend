import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [recentResults, setRecentResults] = useState([])
  const [loading, setLoading] = useState(true)

  const subjects = [
    { name: 'C Programming', icon: '⚙️', color: '#4facfe', progress: 0 },
    { name: 'C++', icon: '🔄', color: '#f093fb', progress: 0 },
    { name: 'Java', icon: '☕', color: '#f5576c', progress: 0 },
    { name: 'Python', icon: '🐍', color: '#43e97b', progress: 0 },
    { name: 'HTML/CSS', icon: '🌐', color: '#fa709a', progress: 0 },
    { name: 'DBMS', icon: '🗄️', color: '#f6d365', progress: 0 },
    { name: 'Operating System', icon: '🖥️', color: '#a18cd1', progress: 0 },
    { name: 'Software Engineering', icon: '📱', color: '#fbc2eb', progress: 0 }
  ]

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch user stats
      const statsResponse = await api.get('/results/stats')
      setStats(statsResponse.data)

      // Fetch recent results
      const resultsResponse = await api.get('/results/history?limit=5')
      setRecentResults(resultsResponse.data)

      // Update subject progress
      if (statsResponse.data?.subjects) {
        subjects.forEach(subject => {
          const found = statsResponse.data.subjects.find(s =>
            s.name.toLowerCase() === subject.name.toLowerCase()
          )
          if (found) {
            subject.progress = found.average_score || 0
          }
        })
      }

    } catch (error) {
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header fade-in">
          <div>
            <h1>{getGreeting()}, {user?.full_name || user?.username}! 👋</h1>
            <p>Here's your learning progress and statistics</p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <span className="stat-icon">📊</span>
              <span>{stats?.total_attempts || 0} Attempts</span>
            </div>
            <div className="stat-badge">
              <span className="stat-icon">⭐</span>
              <span>{stats?.average_score || 0}% Avg Score</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid fade-in">
          <div className="stat-card">
            <div className="stat-card-icon">📝</div>
            <div className="stat-card-info">
              <h3>{stats?.total_attempts || 0}</h3>
              <p>Total Attempts</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">🎯</div>
            <div className="stat-card-info">
              <h3>{stats?.average_score || 0}%</h3>
              <p>Average Score</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">🏆</div>
            <div className="stat-card-info">
              <h3>{stats?.best_score || 0}</h3>
              <p>Best Score</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">📚</div>
            <div className="stat-card-info">
              <h3>{stats?.subjects?.length || 0}</h3>
              <p>Subjects Practiced</p>
            </div>
          </div>
        </div>

        {/* Subjects Grid with Progress */}
        <h2 className="section-title">Your Subjects</h2>
        <div className="subjects-grid">
          {subjects.map((subject, idx) => (
            <Link
              key={subject.name}
              to={`/subject/${subject.name.toLowerCase()}`}
              className="subject-card fade-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="subject-header">
                <div className="subject-icon" style={{ background: subject.color }}>
                  {subject.icon}
                </div>
                <span className="subject-progress">{Math.round(subject.progress)}%</span>
              </div>
              <h3>{subject.name}</h3>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${subject.progress}%`,
                    background: subject.color
                  }}
                />
              </div>
              <span className="practice-text">Start Practice →</span>
            </Link>
          ))}
        </div>

        {/* Recent Results */}
        {recentResults.length > 0 && (
          <div className="recent-results">
            <h2 className="section-title">Recent Activity</h2>
            <div className="results-list">
              {recentResults.map((result, idx) => (
                <div key={result.id} className="result-item fade-in">
                  <div className="result-item-left">
                    <span className="result-subject">{result.subject}</span>
                    <span className="result-type">{result.type}</span>
                  </div>
                  <div className="result-item-center">
                    <span className="result-score">
                      {result.score}/{result.total}
                    </span>
                    <span className="result-percentage">
                      {result.percentage}%
                    </span>
                  </div>
                  <div className="result-item-right">
                    <span className="result-date">
                      {new Date(result.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .dashboard {
          padding: 30px 0 60px;
          min-height: calc(100vh - 80px);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 15px;
        }
        .dashboard-header h1 {
          color: white;
          font-size: 2.2rem;
          margin-bottom: 5px;
        }
        .dashboard-header p {
          color: rgba(255,255,255,0.9);
          font-size: 1.05rem;
        }
        .header-stats {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .stat-badge {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          padding: 10px 18px;
          border-radius: 12px;
          color: white;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }
        .stat-icon {
          font-size: 1.2rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 15px;
          color: white;
          transition: transform 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-3px);
        }
        .stat-card-icon {
          font-size: 2.2rem;
        }
        .stat-card-info h3 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .stat-card-info p {
          opacity: 0.8;
          font-size: 0.9rem;
        }
        .section-title {
          color: white;
          font-size: 1.5rem;
          margin-bottom: 20px;
        }
        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .subject-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 16px;
          color: white;
          text-decoration: none;
          transition: all 0.3s;
        }
        .subject-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .subject-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .subject-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
        }
        .subject-progress {
          font-weight: 700;
          font-size: 1.1rem;
        }
        .subject-card h3 {
          margin-bottom: 12px;
          font-size: 1.05rem;
        }
        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255,255,255,0.2);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 1s ease;
        }
        .practice-text {
          font-size: 0.9rem;
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .subject-card:hover .practice-text {
          opacity: 1;
        }
        .recent-results {
          margin-top: 10px;
        }
        .results-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .result-item {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 15px 20px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          transition: transform 0.3s;
        }
        .result-item:hover {
          transform: translateX(5px);
        }
        .result-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .result-subject {
          font-weight: 600;
        }
        .result-type {
          background: rgba(255,255,255,0.2);
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          text-transform: uppercase;
        }
        .result-item-center {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .result-score {
          font-weight: 700;
          font-size: 1.1rem;
        }
        .result-percentage {
          background: rgba(16, 185, 129, 0.3);
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 0.9rem;
        }
        .result-date {
          font-size: 0.85rem;
          opacity: 0.7;
        }
        @media (max-width: 768px) {
          .dashboard-header h1 {
            font-size: 1.7rem;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .subjects-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          }
          .result-item {
            flex-wrap: wrap;
            gap: 10px;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          .subjects-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .fade-in {
          animation: fadeIn 0.6s ease forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard