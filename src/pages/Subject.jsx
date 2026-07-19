import { useParams, Link } from 'react-router-dom'

const Subject = () => {
  const { subject } = useParams()

  // Convert URL parameter to display name
  const getSubjectName = (urlSubject) => {
    const mapping = {
      'c-programming': 'C Programming',
      'c': 'C Programming',
      'c++': 'C++',
      'cpp': 'C++',
      'java': 'Java',
      'python': 'Python',
      'html-css': 'HTML/CSS',
      'html': 'HTML/CSS',
      'css': 'HTML/CSS',
      'dbms': 'DBMS',
      'operating-system': 'Operating System',
      'os': 'Operating System',
      'software-engineering': 'Software Engineering',
      'se': 'Software Engineering'
    }
    return mapping[urlSubject] || urlSubject
  }

  const subjectName = getSubjectName(subject)

  const modes = [
    {
      type: 'mcq',
      icon: '📝',
      title: 'MCQ Practice',
      description: 'Test your knowledge with multiple choice questions',
      color: '#4facfe'
    },
    {
      type: 'viva',
      icon: '🎤',
      title: 'Viva Practice',
      description: 'Prepare for oral examinations with AI feedback',
      color: '#f093fb'
    },
    {
      type: 'coding',
      icon: '💻',
      title: 'Coding Challenges',
      description: 'Solve programming problems and improve your skills',
      color: '#43e97b'
    }
  ]

  return (
    <div style={{
      padding: '40px 20px',
      minHeight: 'calc(100vh - 72px)',
      background: '#0a0a1a'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Link to="/subjects" style={{
          color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '20px'
        }}>
          ← Back to Subjects
        </Link>

        <h1 style={{
          color: 'white',
          fontSize: '2.5rem',
          marginBottom: '10px'
        }}>
          {subjectName}
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '1.1rem',
          marginBottom: '40px'
        }}>
          Choose a practice mode to get started
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {modes.map((mode) => (
            <Link
              key={mode.type}
              to={`/${mode.type}/${subject}`}
              style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '35px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.03)',
                textDecoration: 'none',
                color: 'white',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.borderColor = mode.color
                e.target.style.boxShadow = `0 10px 30px rgba(0,0,0,0.3)`
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.borderColor = 'rgba(255,255,255,0.03)'
                e.target.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '15px'
              }}>
                {mode.icon}
              </div>
              <h3 style={{ marginBottom: '10px' }}>{mode.title}</h3>
              <p style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                {mode.description}
              </p>
              <span style={{
                display: 'inline-block',
                marginTop: '16px',
                padding: '6px 24px',
                borderRadius: '50px',
                background: mode.color,
                color: 'white',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                Start Practice →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Subject