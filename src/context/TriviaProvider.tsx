import { createContext, useState } from "react";
import {
  TriviaContextProps,
  Question,
  Averages,
  UserResults,
} from "../interface/interfaces";
import useAuth from "../hook/useAuth";
import { getQuestions } from "../axiosClient/AxiosClient";
import useMatch from "../hook/useMatch";
import {
  DocumentData,
  WithFieldValue,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Firebase";
import { getAverageScore } from "../helper";

export const TriviaContext = createContext<TriviaContextProps>({
  signInWithGoogle: () => Promise.resolve(),
  selectCategory: (category: number) => Promise.resolve(),
  user: { displayName: "" },
  questions: [],
  score: [],
  averages:[],
  userResults: [],
  handleScore: (chosenAnswer: string, correct_answer: string) => "",
  resetScore: () => "",
  getScores: () => Promise.resolve(),
  saveScore: (
    obtainedScore: WithFieldValue<DocumentData>,
    questionsMade: number
  ) => Promise.resolve(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TriviaProvider = ({ children }: any) => {
  const { signInWithGoogle, user } = useAuth();
  const { handleScore, resetScore, score } = useMatch();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [userResults, setUserResults] = useState<UserResults[]>([]);
  const [averages, setAverages] = useState<Averages[]>([]);

  const selectCategory = async (category: number) => {
    try {
      const result = await getQuestions(category);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setQuestions(result.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const saveScore = async (
    obtainedScore: WithFieldValue<DocumentData>,
    questionsMade: number
  ) => {
    if (questionsMade >= 10) {
      const collectionRef = collection(db, "matches");
      console.log(questionsMade, "esto es cuestions made");
      try {
        await addDoc(collectionRef, obtainedScore);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getScores = async () => {
    try {
      const collectionRef = collection(db, "matches");
      const snapshotArray = await getDocs(collectionRef);
      const completeArray = snapshotArray.docs.map((doc) => doc.data());
      setAverages(getAverageScore(completeArray));

      const querySnapshot = await getDocs(
        query(collectionRef, where("email", "==", user.email))
      );
      const matchesArray = querySnapshot.docs.map((doc) => doc.data());
      setUserResults(matchesArray);
      console.log(matchesArray);
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
        saveScore,
        getScores,
        averages,
        userResults,
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
