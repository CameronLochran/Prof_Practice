package models;

import jakarta.persistence.*;

@Entity
@Table(name = "answer")
public class Answer {

    @Column(name = "answer")
    private String answer;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



}
