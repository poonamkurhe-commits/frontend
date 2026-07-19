import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user } = useAuth()
  const [subjects, setSubjects] = useState([])
  const [stats, setStats] = useState(null)
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      console.log('🚀 Fetching dashboard data...')

      // 1. Get subjects
      const subjectsRes = await api.get('/subjects')
      console.log('📚 Subjects:', subjectsRes.data)
      setSubjects(subjectsRes.data || [])

      // 2. Get stats
      const statsRes = await api.get('/results/stats')
      console.log('📊 Stats:', statsRes.data)
      setStats(statsRes.data)

      // 3. Get progress
      try {
        const progressRes = await api.get('/results/progress/all')
        console.log('📈 Progress:', progressRes.data)
        setProgress(progressRes.data || {})
      } catch (e) {
        console.error('❌ Progress error:', e)
        setProgress({})
      }

    } catch (error) {
      console.error('❌ Error fetching data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a1a'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTop: '3px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  const getMasteryCount = () => {
    let count = 0
    subjects.forEach(s => {
      const val = progress[s.name] || 0
      if (val >= 80) count++
    })
    return count
  }

  const getInProgressCount = () => {
    let count = 0
    subjects.forEach(s => {
      const val = progress[s.name] || 0
      if (val > 0 && val < 80) count++
    })
    return count
  }

  const getNotStartedCount = () => {
    let count = 0
    subjects.forEach(s => {
      const val = progress[s.name] || 0
      if (val === 0) count++
    })
    return count
  }

  const mastered = getMasteryCount()
  const inProgress = getInProgressCount()
  const notStarted = getNotStartedCount()
  const totalAttempts = stats?.total_attempts || 0
  const avgScore = stats?.average_score || 0
  const bestScore = stats?.best_score || 0

  return (
    <div style={{
      padding: '30px 0',
      minHeight: 'calc(100vh - 72px)',
      background: '#0a0a1a'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
              Welcome back, {user?.full_name || user?.username}! 👋
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>
              Here's your learning progress at a glance
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.6)',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              📅 Today
            </button>
            <button style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.6)',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              ⬇ Export
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.03)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Total Subjects</span>
              <span style={{ fontSize: '1.2rem' }}>📚</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#667eea' }}>
              {subjects.length}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>
              +0 this week
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.03)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Mastered</span>
              <span style={{ fontSize: '1.2rem' }}>🏆</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#43e97b' }}>
              {mastered}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>
              80%+ score
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.03)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>In Progress</span>
              <span style={{ fontSize: '1.2rem' }}>📈</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f6d365' }}>
              {inProgress}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>
              0-80% score
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.03)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Not Started</span>
              <span style={{ fontSize: '1.2rem' }}>⏳</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f5576c' }}>
              {notStarted}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>
              0% score
            </div>
          </div>
        </div>

        {/* Subject Progress + Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Subject Progress List - NOT CLICKABLE */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.03)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>📊 Subject Progress</h3>
              <Link to="/subjects" style={{ color: '#667eea', textDecoration: 'none', fontSize: '0.85rem' }}>
                View All →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {subjects.map((s, i) => {
                const progressVal = progress[s.name] || 0
                return (
                  // ✅ REMOVED Link - Now display only
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'default' // Not clickable
                    }}
                  >
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '8px',
                      background: s.color || '#667eea',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem'
                    }}>
                      {s.icon || '📚'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.9rem'
                      }}>
                        <span>{s.name}</span>
                        <span style={{
                          color: progressVal >= 80 ? '#43e97b' :
                            progressVal > 0 ? '#f6d365' : 'rgba(255,255,255,0.3)'
                        }}>
                          {progressVal}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '4px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        marginTop: '4px'
                      }}>
                        <div style={{
                          width: `${progressVal}%`,
                          height: '100%',
                          background: progressVal >= 80 ? '#43e97b' :
                            s.color || '#667eea',
                          borderRadius: '10px',
                          transition: 'width 0.8s ease'
                        }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.03)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>📌 Quick Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px'
              }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Total Attempts</span>
                <span style={{ fontWeight: 600 }}>{totalAttempts}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px'
              }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Average Score</span>
                <span style={{ fontWeight: 600, color: '#43e97b' }}>{avgScore}%</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px'
              }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Best Score</span>
                <span style={{ fontWeight: 600, color: '#f6d365' }}>{bestScore}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px'
              }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Subjects Mastered</span>
                <span style={{ fontWeight: 600, color: '#43e97b' }}>{mastered}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <Link to="/subjects" style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.03)',
            textDecoration: 'none',
            color: 'white',
            textAlign: 'center',
            transition: 'all 0.3s'
          }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.borderColor = 'rgba(102,126,234,0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.borderColor = 'rgba(255,255,255,0.03)'
            }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📚</div>
            <div style={{ fontWeight: 600 }}>All Subjects</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>View all subjects</div>
          </Link>

          <Link to="/subjects" style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.03)',
            textDecoration: 'none',
            color: 'white',
            textAlign: 'center',
            transition: 'all 0.3s'
          }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.borderColor = 'rgba(102,126,234,0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.borderColor = 'rgba(255,255,255,0.03)'
            }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📝</div>
            <div style={{ fontWeight: 600 }}>Practice MCQ</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Start a new quiz</div>
          </Link>

          <Link to="/subjects" style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.03)',
            textDecoration: 'none',
            color: 'white',
            textAlign: 'center',
            transition: 'all 0.3s'
          }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.borderColor = 'rgba(102,126,234,0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.borderColor = 'rgba(255,255,255,0.03)'
            }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💻</div>
            <div style={{ fontWeight: 600 }}>Coding Challenge</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Solve problems</div>
          </Link>

          <Link to="/subjects" style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.03)',
            textDecoration: 'none',
            color: 'white',
            textAlign: 'center',
            transition: 'all 0.3s'
          }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.borderColor = 'rgba(102,126,234,0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.borderColor = 'rgba(255,255,255,0.03)'
            }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎤</div>
            <div style={{ fontWeight: 600 }}>Viva Practice</div>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Oral preparation</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard