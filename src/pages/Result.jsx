import { useLocation, useNavigate } from 'react-router-dom'

const Result = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const results = location.state?.results

    if (!results) {
        navigate('/dashboard')
        return null
    }

    const { subject, question_type, score, total_questions, correct_answers, time_spent } = results
    const percentage = Math.round((score / total_questions) * 100)

    const getResultEmoji = () => {
        if (percentage >= 80) return '🏆'
        if (percentage >= 60) return '🌟'
        if (percentage >= 40) return '💪'
        return '📚'
    }

    const getResultMessage = () => {
        if (percentage >= 80) return 'Excellent work! You\'ve mastered this topic!'
        if (percentage >= 60) return 'Good job! Keep practicing to improve further.'
        if (percentage >= 40) return 'You\'re on the right track. Review the topics you missed.'
        return 'Don\'t give up! Practice more and try again.'
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}m ${secs}s`
    }

    return (
        <div className="result-page">
            <div className="container">
                <div className="result-card fade-in">
                    <div className="result-emoji">{getResultEmoji()}</div>
                    <h1 className="result-title">Quiz Complete!</h1>
                    <p className="result-subtitle">{getResultMessage()}</p>

                    <div className="result-stats">
                        <div className="stat-item">
                            <span className="stat-label">Subject</span>
                            <span className="stat-value">{subject}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Mode</span>
                            <span className="stat-value">{question_type.toUpperCase()}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Score</span>
                            <span className="stat-value highlight">{score}/{total_questions}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Percentage</span>
                            <span className="stat-value highlight">{percentage}%</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Correct</span>
                            <span className="stat-value">{correct_answers}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Time Taken</span>
                            <span className="stat-value">{formatTime(time_spent)}</span>
                        </div>
                    </div>

                    <div className="result-progress">
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${percentage}%`,
                                    background: percentage >= 80 ? '#10b981' :
                                        percentage >= 60 ? '#f59e0b' : '#ef4444'
                                }}
                            />
                        </div>
                    </div>

                    <div className="result-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/subject/${subject}`)}
                        >
                            Practice Again
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/dashboard')}
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .result-page {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 0;
        }
        .result-card {
          background: white;
          border-radius: 24px;
          padding: 50px;
          max-width: 600px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        .result-emoji {
          font-size: 4rem;
          margin-bottom: 15px;
        }
        .result-title {
          font-size: 2.5rem;
          color: #1a1a2e;
          margin-bottom: 5px;
        }
        .result-subtitle {
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 30px;
        }
        .result-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 25px;
        }
        .stat-item {
          background: #f8f9ff;
          padding: 15px;
          border-radius: 12px;
        }
        .stat-label {
          display: block;
          font-size: 0.85rem;
          color: #888;
          margin-bottom: 5px;
        }
        .stat-value {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1a1a2e;
        }
        .stat-value.highlight {
          color: #667eea;
        }
        .result-progress {
          margin: 25px 0 30px;
        }
        .progress-bar {
          width: 100%;
          height: 10px;
          background: #f0f0f0;
          border-radius: 5px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          transition: width 1s ease;
        }
        .result-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          padding: 12px 30px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1rem;
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }
        .btn-secondary {
          background: #f0f0f0;
          color: #1a1a2e;
        }
        .btn-secondary:hover {
          background: #e0e0e0;
        }
        @media (max-width: 768px) {
          .result-card {
            padding: 30px 20px;
            margin: 0 20px;
          }
          .result-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .result-title {
            font-size: 2rem;
          }
        }
      `}</style>
        </div>
    )
}

export default Result