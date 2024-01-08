import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import QuestionForm from './components/QuestionForm';
import QuizPage from './components/QuizPage';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import TakeQuizPage from "./components/TakeQuizPage";
function App() {
    return (
        <div className="App">
            <header className="Header">
                <nav>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/quizzes" className="nav-link">
                                Quiz Page
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/question-form" className="nav-link">
                                Question Form
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <Routes>
                <Route path="/quizzes" element={<QuizPage/>}/>
                <Route path="/question-form" element={<QuestionForm/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/quizzes/:quizId" element={<QuizPage/>}/>
                <Route path="/takeQuiz/:quizId" element={<TakeQuizPage/>}/>
                <Route path="/submitQuiz/:quizId" element={<TakeQuizPage/>}/>
                <Route path="/create-question" element={<QuestionForm/>} />
            </Routes>
        </div>

    );
}

export default App;
