import java.util.Random;

public class Main {

    public static void main(String[] args) {

        Random random = new Random();

        for (int i = 0; i < 40; i++)
        {

            int num1 = random.nextInt(45) + 6;
            int num2 = random.nextInt(45) + 6;

            double answer;
            String question;

            int randoper = random.nextInt(4);

            String operation = randoper == 0 ? "+" : randoper == 1 ? "-" : randoper == 2 ? "*" : "/";

            switch (operation) {
                case "+" -> {
                    answer = num1 + num2;
                    question = "What is the answer to: " + num1 + " + " + num2 + "?";
                }
                case "-" -> {
                    answer = num1 - num2;
                    question = "What is the answer to: " + num1 + " - " + num2 + "?";

                }
                case "*" -> {
                    answer = num1 * num2;
                    question = "What is the answer to: " + num1 + " * " + num2 + "?";
                }
                default -> {

                    if (num1 > num2) {
                        answer = num1 / num2;
                        question = "What is the answer to: " + num1 + " / " + num2 + "?";
                    } else {
                        answer = num2 / num1;
                        question = "What is the answer to: " + num2 + " / " + num1 + "?";
                    }

                }
            }

            Math.round(answer);

            int intanswer = (int) answer;

            Person person = new Person(question, intanswer);


            System.out.println(question);
            System.out.println(intanswer);

        }


    }
}