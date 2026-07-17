import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'
import QuestionCard from '../components/QuestionCard'

const MCQ = () => {
    const { subject } = useParams()
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(true)
    const [startTime] = useState(Date.now())

    useEffect(() => {
        fetchQuestions()
    }, [])

    const fetchQuestions = async () => {
        try {
            const response = await api.get('/questions', {
                params: { subject, type: 'mcq', limit: 10 }
            })
            setQuestions(response.data)
            setAnswers(new Array(response.data.length).fill(null))
        } catch (error) {
            toast.error('Failed to load questions')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (submission, question) => {
        try {
            const response = await api.post('/questions/mcq/submit', submission)
            const newAnswers = [...answers]
            newAnswers[currentIndex] = {
                ...submission,
                is_correct: response.data.correct,
                question: question
            }
            setAnswers(newAnswers)

            if (response.data.correct) {
                toast.success('Correct! 🎉')
            } else {
                toast.error(`Incorrect. The correct answer was ${response.data.correct_answer + 1}`)
            }

            if (currentIndex === questions.length - 1) {
                finishQuiz(newAnswers)
            } else {
                setCurrentIndex(currentIndex + 1)
            }
        } catch (error) {
            toast.error('Failed to submit answer')
        }
    }

    const finishQuiz = async (finalAnswers) => {
        const correctCount = finalAnswers.filter(a => a?.is_correct).length
        const resultData = {
            subject,
            question_type: 'mcq',
            answers: finalAnswers.map(a => ({
                question_id: a?.question_id,
                answer: a?.selected_option,
                is_correct: a?.is_correct,
                time_taken: a?.time_taken || 0
            })),
            score: correctCount,
            total_questions: questions.length,
            correct_answers: correctCount,
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
            <div className="loading-container">
                <div className="spinner"></div>
                <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 60vh;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        )
    }

    if (questions.length === 0) {
        return (
            <div className="container">
                <div className="empty-state">
                    <p>No MCQ questions available for this subject yet.</p>
                    <Link to={`/subject/${subject}`} className="btn btn-primary">
                        Go Back
                    </Link>
                </div>
                <style jsx>{`
          .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: white;
          }
          .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 30px;
            background: white;
            color: #667eea;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
          }
        `}</style>
            </div>
        )
    }

    return (
        <div className="mcq-page">
            <div className="container">
                <div className="page-header">
                    <h2>MCQ Practice - {subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
                    <span className="progress-text">
                        {currentIndex + 1}/{questions.length}
                    </span>
                </div>

                <QuestionCard
                    question={questions[currentIndex]}
                    onNext={() => setCurrentIndex(currentIndex + 1)}
                    onPrevious={() => setCurrentIndex(currentIndex - 1)}
                    currentIndex={currentIndex}
                    totalQuestions={questions.length}
                    onSubmit={handleSubmit}
                    type="mcq"
                />
            </div>

            <style jsx>{`
        .mcq-page {
          padding: 30px 0;
          min-height: calc(100vh - 80px);
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          color: white;
        }
        .page-header h2 {
          font-size: 1.5rem;
        }
        .progress-text {
          background: rgba(255,255,255,0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
        }
      `}</style>
        </div>
    )
}

export default MCQ