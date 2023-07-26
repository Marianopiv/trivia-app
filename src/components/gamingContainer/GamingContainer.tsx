import { useContext, useState } from "react";
import { TriviaContext } from "../../context/TriviaProvider";
import Gaming from "../gaming/Gaming";

const GamingContainer = () => {
  const { questions } = useContext(TriviaContext);
  const [nextQuestion, setNextQuestion] = useState(0);

  const handleNextQuestion = () => setNextQuestion(nextQuestion + 1);

  return (
    <div>
      {questions?.map((question, index) =>
        index === nextQuestion ? (
          <Gaming key={index} questionObject={question} handleNextQuestion={handleNextQuestion} />
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default GamingContainer;
