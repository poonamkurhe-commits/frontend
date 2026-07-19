import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'

const Coding = () => {
    const { subject } = useParams()
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [code, setCode] = useState('')
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(true)
    const [startTime] = useState(Date.now())

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

    const dbSubject = getSubjectName(subject)

    useEffect(() => {
        fetchQuestions()
    }, [])

    const fetchQuestions = async () => {
        try {
            setLoading(true)
            const response = await api.get('/questions/public', {
                params: {
                    subject: dbSubject,
                    limit: 50
                }
            })

            const codingQuestions = response.data.filter(q => q.type === 'coding' || q.type === 'Coding')

            if (codingQuestions.length > 0) {
                setQuestions(codingQuestions)
                setAnswers(new Array(codingQuestions.length).fill(null))
            } else {
                setQuestions([])
            }
        } catch (error) {
            console.error('Error fetching coding questions:', error)
            setQuestions([])
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (!code.trim()) {
            toast.error('Please write your code')
            return
        }

        const submission = {
            question_id: questions[currentIndex].id,
            code: code,
            time_taken: 30
        }

        try {
            const response = await api.post('/questions/coding/submit', submission)
            const newAnswers = [...answers]
            newAnswers[currentIndex] = {
                ...submission,
                passed: response.data.passed,
                question: questions[currentIndex]
            }
            setAnswers(newAnswers)
            setCode('')

            if (response.data.passed) {
                toast.success('✅ All tests passed!')
            } else {
                toast.warning('⚠️ Tests failed. Try again!')
            }

            if (currentIndex === questions.length - 1) {
                finishQuiz(newAnswers)
            } else {
                setCurrentIndex(currentIndex + 1)
            }
        } catch (error) {
            toast.error('Failed to submit solution')
        }
    }

    const finishQuiz = async (finalAnswers) => {
        const passedCount = finalAnswers.filter(a => a?.passed).length
        const resultData = {
            subject: dbSubject,
            question_type: 'coding',
            answers: finalAnswers.map(a => ({
                question_id: a?.question_id,
                answer: a?.code,
                is_correct: a?.passed || false,
                time_taken: a?.time_taken || 0
            })),
            score: passedCount,
            total_questions: questions.length,
            correct_answers: passedCount,
            time_spent: Math.floor((Date.now() - startTime) / 1000)
        }

        try {
            await api.post('/results/save', resultData)
            navigate('/result', { state: { results: resultData } })
        } catch (error) {
            toast.error('Failed to save results')
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

    if (questions.length === 0) {
        return (
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a1a',
                color: 'white',
                textAlign: 'center',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <div style={{ fontSize: '3rem' }}>💻</div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>No Coding Questions Available</h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '400px' }}>
                    Coding questions for "{dbSubject}" are not available yet.
                </p>
                <button
                    onClick={() => navigate(`/subject/${subject}`)}
                    style={{
                        padding: '12px 32px',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    ← Go Back
                </button>
            </div>
        )
    }

    return (
        <div style={{
            padding: '40px 20px',
            minHeight: 'calc(100vh - 72px)',
            background: '#0a0a1a'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}>
                    <div>
                        <h1 style={{ color: 'white', fontSize: '1.8rem' }}>💻 Coding Challenge</h1>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                            {dbSubject} • {questions.length} problems
                        </p>
                    </div>
                    <span style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '0.9rem'
                    }}>
                        {currentIndex + 1}/{questions.length}
                    </span>
                </div>

                {questions[currentIndex] && (
                    <div style={{
                        background: 'rgba(255,255,255,0.02)',
                        padding: '30px',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.03)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: '16px',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            marginBottom: '20px'
                        }}>
                            <span style={{
                                background: 'rgba(102,126,234,0.1)',
                                color: '#667eea',
                                padding: '4px 16px',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                fontWeight: 600
                            }}>
                                Problem {currentIndex + 1}/{questions.length}
                            </span>
                            <span style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '4px 16px',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                color: 'rgba(255,255,255,0.3)'
                            }}>
                                CODING
                            </span>
                        </div>

                        <h3 style={{
                            color: 'white',
                            fontSize: '1.2rem',
                            marginBottom: '12px',
                            lineHeight: '1.6'
                        }}>
                            {questions[currentIndex].data?.title || 'Problem'}
                        </h3>

                        <p style={{
                            color: 'rgba(255,255,255,0.6)',
                            marginBottom: '16px',
                            lineHeight: '1.6'
                        }}>
                            {questions[currentIndex].data?.description || 'Description not available'}
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '16px',
                            marginBottom: '16px'
                        }}>
                            <div style={{
                                background: 'rgba(0,0,0,0.3)',
                                padding: '12px',
                                borderRadius: '8px'
                            }}>
                                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>Sample Input:</div>
                                <pre style={{ color: '#43e97b', marginTop: '4px' }}>
                                    {questions[currentIndex].data?.sample_input || '-'}
                                </pre>
                            </div>
                            <div style={{
                                background: 'rgba(0,0,0,0.3)',
                                padding: '12px',
                                borderRadius: '8px'
                            }}>
                                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>Sample Output:</div>
                                <pre style={{ color: '#f6d365', marginTop: '4px' }}>
                                    {questions[currentIndex].data?.sample_output || '-'}
                                </pre>
                            </div>
                        </div>

                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Write your code here..."
                            rows={8}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                background: '#1a1a2e',
                                color: '#43e97b',
                                fontSize: '0.9rem',
                                fontFamily: 'Courier New, monospace',
                                resize: 'vertical',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />

                        <button
                            onClick={handleSubmit}
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                marginTop: '20px',
                                transition: 'all 0.3s'
                            }}
                        >
                            {currentIndex === questions.length - 1
                                ? '🎯 Submit All'
                                : 'Next Problem →'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Coding