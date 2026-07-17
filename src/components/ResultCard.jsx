const ResultCard = ({ result }) => {
    const { subject, type, score, total, correct, date } = result

    const getScoreColor = () => {
        const percentage = (score / total) * 100
        if (percentage >= 80) return '#10b981'
        if (percentage >= 60) return '#f59e0b'
        return '#ef4444'
    }

    const getScoreEmoji = () => {
        const percentage = (score / total) * 100
        if (percentage >= 80) return '🌟'
        if (percentage >= 60) return '💪'
        return '📚'
    }

    return (
        <div className="result-card">
            <div className="result-header">
                <div>
                    <h4 className="result-subject">{subject}</h4>
                    <span className="result-type">{type}</span>
                </div>
                <div className="result-date">{new Date(date).toLocaleDateString()}</div>
            </div>

            <div className="result-body">
                <div className="result-score" style={{ color: getScoreColor() }}>
                    <span className="score-number">{score}</span>
                    <span className="score-total">/{total}</span>
                </div>
                <div className="result-details">
                    <span className="result-emoji">{getScoreEmoji()}</span>
                    <span className="result-percentage">
                        {Math.round((score / total) * 100)}%
                    </span>
                </div>
            </div>

            <div className="result-progress">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${(score / total) * 100}%`,
                            background: getScoreColor()
                        }}
                    />
                </div>
            </div>

            <style jsx>{`
        .result-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        .result-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }
        .result-subject {
          margin: 0;
          font-size: 1.1rem;
          color: #1a1a2e;
        }
        .result-type {
          background: #f0f0f0;
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          color: #666;
        }
        .result-date {
          font-size: 0.85rem;
          color: #999;
        }
        .result-body {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0;
        }
        .result-score {
          font-size: 2rem;
          font-weight: 700;
        }
        .score-total {
          font-size: 1.2rem;
          color: #999;
          font-weight: 400;
        }
        .result-details {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .result-emoji {
          font-size: 2rem;
        }
        .result-percentage {
          font-weight: 600;
          font-size: 1.2rem;
        }
        .result-progress {
          margin-top: 10px;
        }
        .progress-bar {
          width: 100%;
          height: 6px;
          background: #f0f0f0;
          border-radius: 3px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          transition: width 1s ease;
          border-radius: 3px;
        }
      `}</style>
        </div>
    )
}

export default ResultCard