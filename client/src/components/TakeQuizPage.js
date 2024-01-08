import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {Button} from "react-bootstrap";

const TakeQuizPage = () => {
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submissionResult, setSubmissionResult] = useState(null);
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
    const { quizId } = useParams();
    const { userId } = useParams();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/quiz/takeQuiz/${quizId}`);
                console.log('Quiz Data:', response.data);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchQuizzes();
    }, [quizId]);

    const handleAnswerSelect = (questionId, selectedOption) => {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };

    const handleSubmitQuiz = async () => {
        try {
            console.log('Quiz ID:', quizId);
            if (isQuizSubmitted) {
                // TODO Display an alert to inform the user - need to think about better option than alert
                alert('Quiz has already been submitted!');
                return;
            }
            const response = await axios.post(`http://localhost:8080/quiz/submitQuiz/${quizId}`, selectedAnswers);
            setSubmissionResult(response.data);
            setIsQuizSubmitted(true);
        } catch (error) {
            console.error('Failed to submit quiz', error);
        }
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>{quiz.title}</h2>
            <p className="lead">Category: {quiz.category}</p>

            {quiz.questions.map(question => (
                <div key={question.id} className="mb-4">
                    <h4>{question.text}</h4>
                    {question.answers.length > 0 ? (
                        <ul className="list-unstyled">
                            {question.answers.map(answer => (
                                <li key={answer.id}>
                                    <label className="form-check-label">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name={`question_${question.id}`}
                                            value={answer.id}
                                            checked={selectedAnswers[question.id] === answer.id}
                                            onChange={() => handleAnswerSelect(question.id, answer.id)}
                                        />
                                        {answer.text}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No answers available for this question.</p>
                    )}
                </div>
            ))}


            {!isQuizSubmitted && (
                <Button className="btn btn-primary" onClick={handleSubmitQuiz}>
                    Submit Quiz
                </Button>
            )}
            {/* Display feedback */}
            {submissionResult && (
                <div>
                    <p>Quiz submitted successfully!</p>
                    <p>Score: {submissionResult.score}</p>
                    <p>Percentage: {submissionResult.percentage}%</p>
                </div>
            )}
        </div>
    );
};

export default TakeQuizPage;
