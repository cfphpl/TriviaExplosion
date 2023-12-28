package com.example.triviaApplication.helpers;

import com.example.triviaApplication.models.Question;
import com.example.triviaApplication.models.Quiz;
import com.example.triviaApplication.models.User;
import com.example.triviaApplication.repositories.QuizRepository;
import com.example.triviaApplication.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private UserRepository userRepository;

    public Quiz createQuiz(Quiz quiz, Long userId) {
        // Input validation
        if(quiz.getTitle() == null) {throw new Error ("Title cannot be null");}
        //User
        User user = userRepository.findById(userId).orElse(null);
//        if (user == null) {throw new Error("User not found with ID: " + userId);}
        quiz.setUser(user);
        // TODO validation logic for the quiz
        quiz.setQuestions(new ArrayList<Question>());

        return quizRepository.save(quiz);}
    public Quiz getQuiz(Long id, Long userId) {return quizRepository.findByIdAndUserId(id, userId);}

    public Quiz updateQuiz(Long quizId, Quiz updatedQuiz) {
        // TODO quiz update
        //    @PutMapping("/{id}")
//    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @RequestBody Quiz updatedQuiz) {
//        // Delegate quiz updating to the QuizService
//        Quiz result = quizService.updateQuiz(id, updatedQuiz);
//        return result != null ?
//                new ResponseEntity<>(result, HttpStatus.OK) :
//                new ResponseEntity<>(HttpStatus.NOT_FOUND);
        Quiz existingQuiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new NoSuchElementException("Quiz not found with id: " + quizId));
        existingQuiz.setTitle(updatedQuiz.getTitle());
        existingQuiz.setCategory(updatedQuiz.getCategory());
        return quizRepository.save(existingQuiz);}
//    public void deleteQuiz(Long quizId) {
//        // TODO logic for quiz deletion
//        quizRepository.deleteById(quizId);}
    public List<Quiz> getAllQuizzes() {
        // TODO logic for retrieving all quizzes
        return quizRepository.findAll();}
    public Quiz getQuizById(Long quizId) {
        // TODO logic for retrieving a quiz by ID
        return quizRepository.findById(quizId)
                .orElseThrow(() -> new NoSuchElementException("Quiz not found with id: " + quizId));
    }
    public List<Quiz> getUserQuiz(Long userId) {
        return quizRepository.findByUserId(userId);}
}