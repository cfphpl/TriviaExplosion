import React, { useState } from 'react';
import '../App.css';
import QuestionForm from './QuestionForm';
import QuizPage from "./QuizPage";
import axios from "axios";

function CreateQuiz() {
    const [username, setUsername] = useState('');
    const [quizData, setQuizData] = useState({
        title: '',
        category: '',
        // TODO extra fields
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuizData({
            ...quizData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/quiz', quizData);
            // TODO finish the logic
            console.log('Quiz data submitted:', quizData);
            alert('Quiz saved successfully!');
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
        }
        ;

        return (
            <div>
                <h1>Create Quiz</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={quizData.title}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    <label>
                        Category:
                        <input
                            type="text"
                            name="category"
                            value={quizData.category}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    {/* TODO fields */}

                    <button type="submit">Create Quiz</button>
                </form>
            </div>
        );
    }

export default CreateQuiz;
