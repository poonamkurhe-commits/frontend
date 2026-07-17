import { useState } from 'react'
import toast from 'react-hot-toast'

const QuestionCard = ({
    question,
    onNext,
    onPrevious,
    currentIndex,
    totalQuestions,
    onSubmit,
    type
}) => {
    const [selectedOption, setSelectedOption] = useState(null)
    const [answer, setAnswer] = useState('')
    const [code, setCode] = useState('')
    const [timeSpent, setTimeSpent] = useState(0)

    const handleSubmit = () => {
        if (type === 'mcq' && selectedOption === null) {
            toast.error('Please select an option')
            return
        }
        if (type === 'viva' && !answer.trim()) {
            toast.error('Please write your answer')
            return
        }
        if (type === 'coding' && !code.trim()) {
            toast.error('Please write your code')
            return
        }

        const submission = {
            question_id: question.id,
            time_taken: timeSpent,
            ...(type === 'mcq' && { selected_option: selectedOption }),
            ...(type === 'viva' && { answer }),
            ...(type === 'coding' && { code })
        }

        onSubmit(submission, question)
        setSelectedOption(null)
        setAnswer('')
        setCode('')
        setTimeSpent(0)
    }

    const renderQuestion = () => {
        switch (type) {
            case 'mcq':
                return (
                    <div className="mcq-options">
                        {question.data.options.map((option, idx) => (
                            <button
                                key={idx}
                                className={`option-btn ${selectedOption === idx ? 'selected' : ''}`}
                                onClick={() => setSelectedOption(idx)}
                            >
                                <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                                {option}
                            </button>
                        ))}
                    </div>
                )
            case 'viva':
                return (
                    <div className="viva-answer">
                        <textarea
                            className="answer-textarea"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Write your answer here..."
                            rows={6}
                        />
                        {question.data.hints && (
                            <div className="hints">
                                <strong>💡 Hints:</strong>
                                <ul>
                                    {question.data.hints.map((hint, idx) => (
                                        <li key={idx}>{hint}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )
            case 'coding':
                return (
                    <div className="coding-area">
                        <div className="problem-statement">
                            <h4>Problem Statement</h4>
                            <p>{question.data.description}</p>
                            <div className="sample">
                                <div>
                                    <strong>Sample Input:</strong>
                                    <pre>{question.data.sample_input}</pre>
                                </div>
                                <div>
                                    <strong>Sample Output:</strong>
                                    <pre>{question.data.sample_output}</pre>
                                </div>
                            </div>
                        </div>
                        <textarea
                            className="code-editor"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Write your code here..."
                            rows={10}
                            spellCheck={false}
                        />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="question-card fade-in">
            <div className="question-header">
                <span className="question-number">Question {currentIndex + 1}/{totalQuestions}</span>
                <span className="question-topic">{question.topic}</span>
                <span className="question-type">{type.toUpperCase()}</span>
            </div>

            <div className="question-body">
                <h3 className="question-text">{question.data.question || question.data.title}</h3>
                {renderQuestion()}
            </div>

            <div className="question-footer">
                <div className="nav-buttons">
                    <button
                        className="btn btn-secondary"
                        onClick={onPrevious}
                        disabled={currentIndex === 0}
                    >
                        ← Previous
                    </button>
                    {currentIndex === totalQuestions - 1 ? (
                        <button className="btn btn-success" onClick={handleSubmit}>
                            Submit Quiz 🎯
                        </button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Next →
                        </button>
                    )}
                </div>
            </div>

            <style jsx>{`
        .question-card {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          max-width: 800px;
          margin: 0 auto;
        }
        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .question-number {
          font-weight: 600;
          color: #667eea;
        }
        .question-topic {
          background: #f0f0f0;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
        }
        .question-type {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .question-text {
          font-size: 1.2rem;
          margin-bottom: 20px;
          line-height: 1.6;
          color: #1a1a2e;
        }
        .mcq-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .option-btn {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 14px 20px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1rem;
          text-align: left;
        }
        .option-btn:hover {
          border-color: #667eea;
          transform: translateX(5px);
        }
        .option-btn.selected {
          border-color: #667eea;
          background: #f0f4ff;
        }
        .option-label {
          background: #f0f0f0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-weight: 600;
          flex-shrink: 0;
        }
        .option-btn.selected .option-label {
          background: #667eea;
          color: white;
        }
        .answer-textarea, .code-editor {
          width: 100%;
          padding: 15px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.3s;
          resize: vertical;
        }
        .answer-textarea:focus, .code-editor:focus {
          outline: none;
          border-color: #667eea;
        }
        .code-editor {
          font-family: 'Courier New', monospace;
          background: #1a1a2e;
          color: white;
        }
        .hints {
          margin-top: 15px;
          padding: 15px;
          background: #f8f9ff;
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }
        .hints ul {
          margin-top: 8px;
          padding-left: 20px;
        }
        .hints li {
          margin: 5px 0;
        }
        .problem-statement {
          margin-bottom: 20px;
        }
        .problem-statement h4 {
          color: #667eea;
          margin-bottom: 10px;
        }
        .sample {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 10px;
        }
        .sample pre {
          background: #f5f5f5;
          padding: 10px;
          border-radius: 8px;
          margin-top: 5px;
          overflow-x: auto;
        }
        .question-footer {
          margin-top: 25px;
          padding-top: 20px;
          border-top: 2px solid #f0f0f0;
        }
        .nav-buttons {
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }
        .btn {
          padding: 12px 30px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1rem;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        .btn-secondary {
          background: #f0f0f0;
          color: #1a1a2e;
        }
        .btn-secondary:hover:not(:disabled) {
          background: #e0e0e0;
        }
        .btn-success {
          background: #10b981;
          color: white;
        }
        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
        }
        @media (max-width: 768px) {
          .question-card {
            padding: 20px;
          }
          .sample {
            grid-template-columns: 1fr;
          }
          .nav-buttons {
            flex-wrap: wrap;
          }
          .nav-buttons .btn {
            flex: 1;
            min-width: 120px;
            text-align: center;
          }
        }
      `}</style>
        </div>
    )
}

export default QuestionCard