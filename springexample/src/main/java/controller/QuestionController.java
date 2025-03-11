package controller;

import models.Questions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import repository.QuestionsRepository;

import java.util.List;
import java.util.Optional;

@RestController
public class QuestionController {
    @Autowired
    QuestionsRepository questionsRepository;

    @GetMapping(value = "/questions")
        public ResponseEntity<List<Questions>> getAllQuestions(){
        return new ResponseEntity<>(questionsRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/questions/{id}")
    public ResponseEntity getPirate(@PathVariable Long id){
        return new ResponseEntity<>(questionsRepository.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/questions")
    public ResponseEntity<Questions> postQuestion(@RequestBody Questions questions){
        questionsRepository.save(questions);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @DeleteMapping(value = "/questions/{id}")
    public ResponseEntity<Questions> deleteQuestion(@PathVariable Long id){
        Optional<Questions> questionToDelete = questionsRepository.findById(id);
        questionsRepository.delete(questionToDelete.get());
        return new ResponseEntity<>(questionToDelete.get(), HttpStatus.OK);
    }

    @PutMapping(value = "/questions/{id}")
    public ResponseEntity<Questions> updateQuestion(@RequestBody Questions updatedQuestion, @PathVariable Long id){
        Questions existingQuestion = (Questions) questionsRepository.findById(id).get();

        existingQuestion.setQuestion(updatedQuestion.getQuestion());
        existingQuestion.setDifficulty(updatedQuestion.getDifficulty());

        questionsRepository.save(existingQuestion);

        return new ResponseEntity<>(existingQuestion, HttpStatus.OK);
    }
}
