import React, { useState } from "react";

const useMatch = () => {
  const [score, setScore] = useState<number[]>([]);

  const handleScore = (chosenAnswer: string, correct_answer: string) => {
    chosenAnswer === correct_answer ? setScore([...score,1]) : "";
    console.log(score);
  };

  const resetScore = () => {
    setScore([])
  }

  return { resetScore,handleScore,score };
};

export default useMatch;
