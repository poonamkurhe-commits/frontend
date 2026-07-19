import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  const features = [
    { icon: '🎯', title: 'Smart Practice', desc: 'AI-powered recommendations based on your performance' },
    { icon: '📊', title: 'Track Progress', desc: 'Visual analytics to monitor your growth' },
    { icon: '🏆', title: 'Earn Rewards', desc: 'XP points, badges, and streaks to stay motivated' },
    { icon: '💡', title: 'Learn Anywhere', desc: 'Access from any device, anytime' },
    { icon: '🤖', title: 'AI Feedback', desc: 'Get instant feedback on your answers' },
    { icon: '📈', title: 'Detailed Analytics', desc: 'Understand your strengths and weaknesses' },
  ]

  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', background: '#0a0a1a' }}>
      {/* Hero Section */}
      <section style={{ padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-30%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(102,126,234,0.1), transparent 70%)', borderRadius: '50%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px 20px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
              <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Join 50,000+ learners</span>
            </div>

            <h1 style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}>
              Master Your Subjects with{' '}
              <span className="gradient-text">PrepAce</span>
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.7 }}>
              Practice MCQ, Viva, and Coding challenges. Get personalized feedback and track your progress to ace your exams.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {user ? (
                <Link to="/dashboard" className="btn-primary" style={{ fontSize: '1.1rem', padding: '14px 40px' }}>Go to Dashboard →</Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary" style={{ fontSize: '1.1rem', padding: '14px 40px' }}>Start Learning Free</Link>
                  <Link to="/login" className="btn-outline" style={{ fontSize: '1.1rem', padding: '14px 40px' }}>Sign In</Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '50px', padding: '30px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <div><div style={{ fontSize: '2rem', fontWeight: 700, color: '#667eea' }}>50K+</div><div style={{ color: 'rgba(255,255,255,0.3)' }}>Students</div></div>
              <div><div style={{ fontSize: '2rem', fontWeight: 700, color: '#f093fb' }}>8</div><div style={{ color: 'rgba(255,255,255,0.3)' }}>Subjects</div></div>
              <div><div style={{ fontSize: '2rem', fontWeight: 700, color: '#43e97b' }}>500+</div><div style={{ color: 'rgba(255,255,255,0.3)' }}>Questions</div></div>
              <div><div style={{ fontSize: '2rem', fontWeight: 700, color: '#f6d365' }}>95%</div><div style={{ color: 'rgba(255,255,255,0.3)' }}>Satisfaction</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '10px' }}>Why <span className="gradient-text">PrepAce</span> Works</h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginBottom: '40px' }}>Everything you need to master your subjects</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.transform = 'translateY(-5px)'; e.target.style.borderColor = 'rgba(102,126,234,0.3)'; e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)' }} onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.borderColor = 'rgba(255,255,255,0.03)'; e.target.style.boxShadow = 'none' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{ color: 'white', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 0', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>Ready to Ace Your Exams? 🎯</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '30px' }}>Join thousands of students already mastering their subjects</p>
          {user ? (
            <Link to="/dashboard" className="btn-primary" style={{ fontSize: '1.1rem', padding: '14px 40px' }}>Continue Learning 🚀</Link>
          ) : (
            <Link to="/register" className="btn-primary" style={{ fontSize: '1.1rem', padding: '14px 40px' }}>Start Learning Free</Link>
          )}
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </div>
  )
}

export default Home