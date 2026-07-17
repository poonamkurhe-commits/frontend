import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'
import QuestionCard from '../components/QuestionCard'

const Coding = () => {
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
                params: { subject, type: 'coding', limit: 3 }
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
            const response = await api.post('/questions/coding/submit', submission)
            const newAnswers = [...answers]
            newAnswers[currentIndex] = {
                ...submission,
                passed: response.data.passed,
                question: question
            }
            setAnswers(newAnswers)

            if (response.data.passed) {
                toast.success('✅ Solution passed!')
            } else {
                toast.warning('Solution submitted, but tests failed')
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
            subject,
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

    // Similar loading and empty state as previous pages...

    return (
        <div className="coding-page">
            <div className="container">
                <div className="page-header">
                    <h2>Coding Challenge - {subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
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
                    type="coding"
                />
            </div>

            <style jsx>{`
        .coding-page {
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

export default Coding