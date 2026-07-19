import { useState } from 'react'

const QuestionCard = ({ question, index, total, onSubmit, type }) => {
  const [selected, setSelected] = useState(null)
  const [answer, setAnswer] = useState('')
  const [code, setCode] = useState('')

  const handleSubmit = () => {
    if (type === 'mcq' && selected === null) return alert('Please select an option')
    if (type === 'viva' && !answer.trim()) return alert('Please write your answer')
    if (type === 'coding' && !code.trim()) return alert('Please write your code')

    const data = {
      question_id: question.id,
      time_taken: 30,
      ...(type === 'mcq' && { selected_option: selected }),
      ...(type === 'viva' && { answer }),
      ...(type === 'coding' && { code })
    }
    onSubmit(data)
    setSelected(null)
    setAnswer('')
    setCode('')
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '20px' }}>
        <span style={{ background: 'rgba(102,126,234,0.1)', color: '#667eea', padding: '4px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600 }}>Question {index + 1}/{total}</span>
        <span style={{ background: 'rgba(255,255,255,0.03)', padding: '4px 16px', borderRadius: '50px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>{type.toUpperCase()}</span>
      </div>

      <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.6 }}>{question.data.question || question.data.title}</h3>

      {type === 'mcq' && (
        <div>{question.data.options.map((opt, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{ display: 'block', width: '100%', padding: '14px 20px', marginBottom: '10px', borderRadius: '12px', border: selected === i ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.05)', background: selected === i ? 'rgba(102,126,234,0.1)' : 'rgba(255,255,255,0.02)', color: 'white', cursor: 'pointer', textAlign: 'left', fontSize: '1rem', transition: 'all 0.3s' }} onMouseEnter={(e) => { if (selected !== i) e.target.style.background = 'rgba(255,255,255,0.05)' }} onMouseLeave={(e) => { if (selected !== i) e.target.style.background = 'rgba(255,255,255,0.02)' }}>
            <span style={{ display: 'inline-block', width: '28px', height: '28px', borderRadius: '50%', background: selected === i ? '#667eea' : 'rgba(255,255,255,0.05)', textAlign: 'center', lineHeight: '28px', marginRight: '12px', fontWeight: 600 }}>{String.fromCharCode(65 + i)}</span>{opt}
          </button>
        ))}</div>
      )}

      {type === 'viva' && (
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Write your answer here..." rows={6} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', color: 'white', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none' }} />
      )}

      {type === 'coding' && (
        <>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}><strong>Problem:</strong> {question.data.description}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div><div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Sample Input:</div><pre style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', marginTop: '4px', color: '#43e97b' }}>{question.data.sample_input}</pre></div>
              <div><div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Sample Output:</div><pre style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', marginTop: '4px', color: '#f6d365' }}>{question.data.sample_output}</pre></div>
            </div>
          </div>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Write your code here..." rows={8} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', background: '#1a1a2e', color: '#43e97b', fontSize: '0.9rem', fontFamily: 'Courier New, monospace', resize: 'vertical', outline: 'none' }} />
        </>
      )}

      <button onClick={handleSubmit} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginTop: '20px', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 25px rgba(102,126,234,0.3)' }} onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none' }}>{index === total - 1 ? 'Submit Quiz 🎯' : 'Next Question →'}</button>
    </div>
  )
}

export default QuestionCard