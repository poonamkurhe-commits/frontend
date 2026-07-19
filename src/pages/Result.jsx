import { useLocation, useNavigate } from 'react-router-dom'

const Result = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const results = location.state?.results

  if (!results) {
    navigate('/dashboard')
    return null
  }

  const { subject, question_type, score, total_questions, correct_answers, time_spent, percentage } = results
  const finalPercentage = percentage || Math.round((score / total_questions) * 100)

  const getEmoji = () => {
    if (finalPercentage >= 80) return '🏆'
    if (finalPercentage >= 60) return '🌟'
    if (finalPercentage >= 40) return '💪'
    return '📚'
  }

  const getMessage = () => {
    if (finalPercentage >= 80) return 'Excellent! You\'ve mastered this topic! 🎉'
    if (finalPercentage >= 60) return 'Good job! Keep practicing to improve further! 💪'
    if (finalPercentage >= 40) return 'You\'re on the right track. Review the topics you missed! 📖'
    return 'Don\'t give up! Practice more and try again! 🌟'
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 72px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a1a',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '24px',
        padding: '40px',
        border: '1px solid rgba(255,255,255,0.03)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '10px' }}>{getEmoji()}</div>

        <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '5px' }}>Quiz Complete! 🎯</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '30px' }}>{getMessage()}</p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: '5px',
          marginBottom: '30px'
        }}>
          <span style={{ fontSize: '4rem', fontWeight: 700, color: '#667eea' }}>
            {score}
          </span>
          <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.3)' }}>
            / {total_questions}
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>Subject</div>
            <div style={{ color: 'white', fontWeight: 600 }}>{subject}</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>Mode</div>
            <div style={{ color: 'white', fontWeight: 600 }}>{question_type?.toUpperCase() || 'MCQ'}</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>Correct</div>
            <div style={{ color: '#43e97b', fontWeight: 600 }}>{correct_answers || score}</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '16px',
            borderRadius: '12px'
          }}>
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>Time</div>
            <div style={{ color: '#f6d365', fontWeight: 600 }}>{formatTime(time_spent || 0)}</div>
          </div>
        </div>

        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '30px'
        }}>
          <div style={{
            width: `${finalPercentage}%`,
            height: '100%',
            background: finalPercentage >= 80 ? '#43e97b' :
              finalPercentage >= 60 ? '#f6d365' : '#f5576c',
            borderRadius: '10px',
            transition: 'width 1s ease'
          }} />
        </div>

        <div style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: finalPercentage >= 80 ? '#43e97b' :
            finalPercentage >= 60 ? '#f6d365' : '#f5576c',
          marginBottom: '30px'
        }}>
          {finalPercentage}%
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => navigate(`/subject/${subject.toLowerCase().replace(/ /g, '-')}`)}
            style={{
              padding: '12px 30px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 25px rgba(102,126,234,0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
          >
            🔄 Practice Again
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '12px 30px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent'
            }}
          >
            🏠 Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default Result