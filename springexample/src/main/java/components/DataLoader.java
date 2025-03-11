package components;

import models.Questions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import repository.QuestionsRepository;

@Profile("!test")
@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    QuestionsRepository questionsRepository;

    public DataLoader(){}

    public void run(ApplicationArguments args) throws Exception {

        Questions question1 = new Questions("What is the name of the person who created javascript?");
        questionsRepository.save(question1);

        Questions question2 = new Questions("What 2 languages share the same syntax?");
        questionsRepository.save(question2);
    }
}
