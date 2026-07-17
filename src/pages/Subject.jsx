import { useParams, Link } from 'react-router-dom'

const Subject = () => {
    const { subject } = useParams()
    const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1)

    const modes = [
        {
            type: 'mcq',
            icon: '📝',
            title: 'MCQ Practice',
            description: 'Test your knowledge with multiple choice questions',
            color: '#667eea'
        },
        {
            type: 'viva',
            icon: '🎤',
            title: 'Viva Practice',
            description: 'Prepare for oral examinations with AI feedback',
            color: '#f5576c'
        },
        {
            type: 'coding',
            icon: '💻',
            title: 'Coding Challenges',
            description: 'Solve programming problems and improve your skills',
            color: '#4facfe'
        }
    ]

    return (
        <div className="subject-page">
            <div className="container">
                <div className="subject-header fade-in">
                    <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
                    <h1>{subjectName}</h1>
                    <p>Choose a practice mode to get started</p>
                </div>

                <div className="modes-grid">
                    {modes.map((mode) => (
                        <Link
                            key={mode.type}
                            to={`/${mode.type}/${subject}`}
                            className="mode-card fade-in"
                            style={{ borderColor: mode.color }}
                        >
                            <div className="mode-icon" style={{ background: mode.color }}>
                                {mode.icon}
                            </div>
                            <h3>{mode.title}</h3>
                            <p>{mode.description}</p>
                            <span className="mode-badge" style={{ background: mode.color }}>
                                Start Practice →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .subject-page {
          padding: 40px 0;
          min-height: calc(100vh - 80px);
        }
        .subject-header {
          margin-bottom: 40px;
        }
        .back-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          display: inline-block;
          margin-bottom: 15px;
          transition: color 0.3s;
        }
        .back-link:hover {
          color: white;
        }
        .subject-header h1 {
          color: white;
          font-size: 2.5rem;
        }
        .subject-header p {
          color: rgba(255,255,255,0.9);
          font-size: 1.1rem;
        }
        .modes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 20px;
        }
        .mode-card {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          padding: 35px;
          border-radius: 16px;
          text-align: center;
          color: white;
          text-decoration: none;
          border: 2px solid rgba(255,255,255,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .mode-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .mode-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          margin: 0 auto 20px;
        }
        .mode-card h3 {
          margin-bottom: 10px;
        }
        .mode-card p {
          opacity: 0.8;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .mode-badge {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        @media (max-width: 768px) {
          .subject-header h1 {
            font-size: 2rem;
          }
          .modes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    )
}

export default Subject