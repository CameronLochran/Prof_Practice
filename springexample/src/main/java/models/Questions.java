package models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "questions")
public class Questions {

    @Column(name = "question")
    private String question;

    @Column (name = "difficulty")
    private String difficulty;

    @Column (name = "question_id")
    private int question_id;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties({"questions"})
    @ManyToMany
    @JoinColumn(name = "answer_id", nullable = false)
    private Answer answer;

    private List<Questions> questions;

    public void Question(String question, String difficulty){
        this.question = question;
        this.difficulty = difficulty;
    }

    public Questions(String s){}

    public String getQuestion(){
        return question;
    }

    public void setQuestion(String question){
        this.question = question;
    }

    public String getDifficulty(){
        return difficulty;
    }

    public void setDifficulty(String difficulty){
        this.difficulty = this.difficulty;
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

}
