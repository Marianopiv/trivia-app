/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from "react";
import {
  TriviaContextProps,
  Question,
  ThemeQuery,
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
import { getAverageScore, getAverageTest } from "../helper";
import { useMediaQuery } from "@mui/material";

export const TriviaContext = createContext<TriviaContextProps>({
  signInWithGoogle: () => Promise.resolve(),
  selectCategory: () => Promise.resolve(),
  user: { displayName: "", email: "" },
  questions: [],
  score: [],
  averages: [],
  userResults: [],
  loader: false,
  isSmallViewport: false,
  userAverage: 0,
  handleScore: (_chosenAnswer: string) => "",
  resetScore: () => "",
  getScores: () => Promise.resolve(),
  saveScore: () => Promise.resolve(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TriviaProvider = ({ children }: any) => {
  const { signInWithGoogle, user } = useAuth();
  const { handleScore, resetScore, score } = useMatch();
  const [loader, setLoader] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [userResults, setUserResults] = useState<DocumentData[]>([]);
  const [averages, setAverages] = useState<DocumentData[]>([]);
  const [userAverage, setUserAverage] = useState<number>();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const isSmallViewport = useMediaQuery((theme: ThemeQuery) =>
    theme.breakpoints.down("sm")
  );

  const selectCategory = async (category: number) => {
    try {
      setLoader(true);
      const result = await getQuestions(category);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setQuestions(result.data.results);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const getScores = async () => {
    try {
      setLoader(true);
      const collectionRef = collection(db, "matches");
      const snapshotArray = await getDocs(collectionRef);
      const completeArray = snapshotArray.docs.map((doc) => doc.data());
      setAverages(getAverageScore(completeArray));
      const querySnapshot = await getDocs(
        query(collectionRef, where("email", "==", user.email))
      );
      const matchesArray = querySnapshot.docs.map((doc) => doc.data());
      setUserResults(matchesArray);
      if (user.email) {
        const averageScore = getAverageTest(matchesArray);

        setUserAverage(averageScore);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const saveScore = async (obtainedScore: WithFieldValue<DocumentData>) => {
    const collectionRef = collection(db, "matches");
    try {
      await addDoc(collectionRef, obtainedScore);
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
        loader,
        userResults,
        userAverage,
        questions,
        user,
        isSmallViewport,
        score,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
};

export default TriviaProvider;
