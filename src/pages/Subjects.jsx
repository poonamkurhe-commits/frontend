import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'

const Subjects = () => {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubjects()
  }, [])

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subjects')
      setSubjects(response.data)
    } catch (error) {
      toast.error('Failed to load subjects')
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

  // All 8 subjects
  const allSubjects = [
    { name: 'C Programming', icon: '⚙️', color: '#4facfe' },
    { name: 'C++', icon: '🔄', color: '#f093fb' },
    { name: 'Java', icon: '☕', color: '#f5576c' },
    { name: 'Python', icon: '🐍', color: '#43e97b' },
    { name: 'HTML/CSS', icon: '🌐', color: '#fa709a' },
    { name: 'DBMS', icon: '🗄️', color: '#f6d365' },
    { name: 'Operating System', icon: '🖥️', color: '#a18cd1' },
    { name: 'Software Engineering', icon: '📱', color: '#fbc2eb' }
  ]

  // Use API data if available, otherwise use allSubjects
  const displaySubjects = subjects.length > 0 ? subjects : allSubjects

  return (
    <div style={{
      padding: '40px 0',
      minHeight: 'calc(100vh - 72px)',
      background: '#0a0a1a'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>📚 All Subjects</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>Select a subject to start practicing</p>
          </div>
          <Link to="/dashboard" style={{
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none'
          }}>
            ← Back to Dashboard
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {displaySubjects.map((subject, idx) => (
            <Link
              key={idx}
              to={`/subject/${subject.name.toLowerCase().replace(/ /g, '-')}`}
              style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '30px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.03)',
                textDecoration: 'none',
                color: 'white',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.borderColor = subject.color || '#667eea'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.borderColor = 'rgba(255,255,255,0.03)'
                e.target.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '12px'
              }}>
                {subject.icon || '📚'}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{subject.name}</h3>
              <span style={{
                display: 'inline-block',
                marginTop: '12px',
                padding: '6px 20px',
                borderRadius: '50px',
                background: subject.color || '#667eea',
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                Practice Now →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Subjects