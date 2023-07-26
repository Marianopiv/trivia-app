import { createContext, useState } from "react";
import { TriviaContextProps, Question } from "../interface/interfaces";
import useAuth from "../hook/useAuth";
import { getQuestions } from "../axiosClient/AxiosClient";
import useMatch from "../hook/useMatch";

export const TriviaContext = createContext<TriviaContextProps>({
  signInWithGoogle: () => Promise.resolve(),
  selectCategory: (category: number) => Promise.resolve(),
  user: {},
  questions: [],
  score: [],
  handleScore: (chosenAnswer: string, correct_answer: string) => "",
  resetScore:()=>""
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TriviaProvider = ({ children }: any) => {
  const { signInWithGoogle, user } = useAuth();
  const { handleScore, resetScore, score } = useMatch();

  const [questions, setQuestions] = useState<Question[]>([]);

  const selectCategory = async (category: number) => {
    try {
      const result = await getQuestions(category);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      console.log(result.data.results);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setQuestions(result.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TriviaContext.Provider
      value={{
        signInWithGoogle,
        selectCategory,
        handleScore,
        resetScore,
        questions,
        user,
        score,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
};

export default TriviaProvider;
