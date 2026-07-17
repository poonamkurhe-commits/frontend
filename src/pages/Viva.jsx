import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'
import QuestionCard from '../components/QuestionCard'

const Viva = () => {
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
                params: { subject, type: 'viva', limit: 5 }
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
            const response = await api.post('/questions/viva/submit', submission)
            const newAnswers = [...answers]
            newAnswers[currentIndex] = {
                ...submission,
                score: response.data.score,
                question: question
            }
            setAnswers(newAnswers)

            toast.success(`Score: ${Math.round(response.data.score * 100)}%`)
            toast.info(`Feedback: ${response.data.feedback}`)

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
        const totalScore = finalAnswers.reduce((sum, a) => sum + (a?.score || 0), 0)
        const avgScore = totalScore / questions.length

        const resultData = {
            subject,
            question_type: 'viva',
            answers: finalAnswers.map(a => ({
                question_id: a?.question_id,
                answer: a?.answer,
                is_correct: (a?.score || 0) > 0.5,
                time_taken: a?.time_taken || 0
            })),
            score: Math.round(avgScore * questions.length),
            total_questions: questions.length,
            correct_answers: finalAnswers.filter(a => (a?.score || 0) > 0.5).length,
            time_spent: Math.floor((Date.now() - startTime) / 1000)
        }

        try {
            await api.post('/results/save', resultData)
            navigate('/result', { state: { results: resultData } })
        } catch (error) {
            toast.error('Failed to save results')
        }
    }

    // Similar loading and empty state as MCQ...
    // (Reuse the same patterns)

    return (
        <div className="viva-page">
            <div className="container">
                <div className="page-header">
                    <h2>Viva Practice - {subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
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
                    type="viva"
                />
            </div>

            <style jsx>{`
        .viva-page {
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

export default Viva