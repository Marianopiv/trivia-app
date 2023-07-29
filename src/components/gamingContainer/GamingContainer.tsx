import { useContext, useState } from "react";
import { TriviaContext } from "../../context/TriviaProvider";
import Gaming from "../gaming/Gaming";
import End from "../end/End";
import { shuffleArray } from "../../helper";

const GamingContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { questions } = useContext(TriviaContext);
  const [nextQuestion, setNextQuestion] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const handleNextQuestion = () => setNextQuestion(nextQuestion + 1);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment


  

  // Verificar si ya se llegó a la pregunta número 10
  if (nextQuestion >= 10) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    return <End nextQuestion={nextQuestion} />;
  }

  const currentQuestion = questions[nextQuestion];
  const { correct_answer, incorrect_answers, question } = currentQuestion;
  let shuffledAnswers = [...incorrect_answers, correct_answer];
  shuffledAnswers = shuffleArray(shuffledAnswers);

  return (
    <div>
      <Gaming
        key={nextQuestion}
        nextQuestion={nextQuestion}
        correct_answer={correct_answer}
        shuffledAnswers={shuffledAnswers}
        question={question}
        handleNextQuestion={handleNextQuestion}
      />
    </div>
  );
};

export default GamingContainer;
