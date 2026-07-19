import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'

const MCQ = () => {
    const { subject } = useParams()
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null)
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
            console.log('📡 Fetching MCQ questions for:', dbSubject)

            const response = await api.get('/questions/public', {
                params: {
                    subject: dbSubject,
                    limit: 10
                }
            })

            console.log('📥 Questions received:', response.data.length)

            if (response.data && response.data.length > 0) {
                setQuestions(response.data)
                setAnswers(new Array(response.data.length).fill(null))
                setSelectedOption(null)
            } else {
                setQuestions([])
            }
        } catch (error) {
            console.error('❌ Error:', error)
            setQuestions([])
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (selectedOption === null) {
            toast.error('Please select an option')
            return
        }

        const submission = {
            question_id: questions[currentIndex].id,
            selected_option: selectedOption,
            time_taken: 30
        }

        try {
            const response = await api.post('/questions/mcq/submit', submission)
            const newAnswers = [...answers]
            newAnswers[currentIndex] = {
                ...submission,
                is_correct: response.data.correct,
                question: questions[currentIndex]
            }
            setAnswers(newAnswers)
            setSelectedOption(null)

            if (response.data.correct) {
                toast.success('✅ Correct! 🎉')
            } else {
                toast.error(`❌ Incorrect. Correct answer: ${response.data.correct_answer + 1}`)
            }

            if (currentIndex === questions.length - 1) {
                await finishQuiz(newAnswers)
            } else {
                setCurrentIndex(currentIndex + 1)
            }
        } catch (error) {
            console.error('Submit error:', error)
            toast.error('Failed to submit answer')
        }
    }

    const finishQuiz = async (finalAnswers) => {
        const correctCount = finalAnswers.filter(a => a?.is_correct).length
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)

        const resultData = {
            subject: dbSubject,
            question_type: 'mcq',
            answers: finalAnswers.map((a, index) => ({
                question_id: a?.question_id || questions[index]?.id,
                answer: a?.selected_option !== undefined ? a.selected_option : -1,
                is_correct: a?.is_correct || false,
                time_taken: a?.time_taken || 30
            })),
            score: correctCount,
            total_questions: questions.length,
            correct_answers: correctCount,
            time_spent: timeSpent
        }

        console.log('📊 Saving result:', resultData)

        try {
            await api.post('/results/save', resultData)
            console.log('✅ Result saved successfully')
            toast.success(`🎯 Score: ${correctCount}/${questions.length}`)

            navigate('/result', {
                state: {
                    results: {
                        ...resultData,
                        percentage: Math.round((correctCount / questions.length) * 100)
                    }
                }
            })
        } catch (error) {
            console.error('❌ Error saving result:', error)
            toast.error('Failed to save results')
            navigate('/result', {
                state: {
                    results: {
                        ...resultData,
                        percentage: Math.round((correctCount / questions.length) * 100)
                    }
                }
            })
        }
    }

    // ===== LOADING STATE =====
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

    // ===== NO QUESTIONS STATE =====
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
                <div style={{ fontSize: '3rem' }}>📝</div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 600 }}>No Questions Available</h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '400px' }}>
                    Questions for "{dbSubject}" are not available yet.
                    <br />
                    Please check back later or try another subject.
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
                        cursor: 'pointer',
                        fontSize: '1rem',
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
                    ← Go Back
                </button>
            </div>
        )
    }

    // ===== QUESTIONS DISPLAY =====
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
                        <h1 style={{ color: 'white', fontSize: '1.8rem' }}>📝 MCQ Practice</h1>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                            {dbSubject} • {questions.length} questions
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
                                Question {currentIndex + 1}/{questions.length}
                            </span>
                            <span style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '4px 16px',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                color: 'rgba(255,255,255,0.3)'
                            }}>
                                {questions[currentIndex].topic || 'MCQ'}
                            </span>
                        </div>

                        <h3 style={{
                            color: 'white',
                            fontSize: '1.2rem',
                            marginBottom: '24px',
                            lineHeight: '1.6'
                        }}>
                            {questions[currentIndex].data?.question || 'Question not available'}
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {questions[currentIndex].data?.options?.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedOption(idx)}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '14px 20px',
                                        borderRadius: '12px',
                                        border: selectedOption === idx
                                            ? '2px solid #667eea'
                                            : '1px solid rgba(255,255,255,0.05)',
                                        background: selectedOption === idx
                                            ? 'rgba(102,126,234,0.1)'
                                            : 'rgba(255,255,255,0.02)',
                                        color: 'white',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <span style={{
                                        display: 'inline-block',
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        background: selectedOption === idx
                                            ? '#667eea'
                                            : 'rgba(255,255,255,0.05)',
                                        textAlign: 'center',
                                        lineHeight: '28px',
                                        marginRight: '12px',
                                        fontWeight: 600
                                    }}>
                                        {String.fromCharCode(65 + idx)}
                                    </span>
                                    {option}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={selectedOption === null}
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                border: 'none',
                                background: selectedOption !== null
                                    ? 'linear-gradient(135deg, #667eea, #764ba2)'
                                    : 'rgba(255,255,255,0.05)',
                                color: selectedOption !== null
                                    ? 'white'
                                    : 'rgba(255,255,255,0.3)',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: selectedOption !== null
                                    ? 'pointer'
                                    : 'not-allowed',
                                marginTop: '24px',
                                transition: 'all 0.3s'
                            }}
                        >
                            {currentIndex === questions.length - 1
                                ? '🎯 Submit Quiz'
                                : 'Next Question →'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MCQ