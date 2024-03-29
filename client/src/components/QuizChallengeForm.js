import React, { useState, useEffect } from 'react';
import './Form.css';
function QuizChallengeForm() {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [emailMismatch, setEmailMismatch] = useState(false);
    const [quizSent, setQuizSent] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailMismatch(false);
        setEmailError('');
    };

    const handleConfirmEmailChange = (event) => {
        setConfirmEmail(event.target.value);
        setEmailMismatch(false);
        setEmailError('');
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            return false;
        }
        return true;
    };

    const handleSendQuiz = () => {
        const isEmailValid = validateEmail(email);

        if (isEmailValid && email === confirmEmail) {
            // Send quiz logic
            setQuizSent(true);
            // Clear form fields
            setEmail('');
            setConfirmEmail('');
        } else {
            setEmailMismatch(true);
        }
    };

    useEffect(() => {
        let timer;
        if (quizSent) {
            timer = setTimeout(() => {
                setQuizSent(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [quizSent]);

    return (
        <div className=" form-container email-button-container">
            <form>
                <div className="email-container">
                    <label>
                        Email:
                        <input type="email" value={email} onChange={handleEmailChange} />
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    </label>
                </div>
                <div className="email-container">
                    <label>
                        Confirm Email:
                        <input type="email" value={confirmEmail} onChange={handleConfirmEmailChange} />
                        {emailMismatch && <p style={{ color: 'red' }}>Emails do not match</p>}
                    </label>
                </div>
                <br />
                <button type="button" onClick={handleSendQuiz} className="email-button">
                    Send Quiz
                </button>
            </form>
            {quizSent && <p style={{ color: 'green' }}>Quiz sent!</p>}
        </div>

    );
}

export default QuizChallengeForm;