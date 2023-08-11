/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DocumentData } from "firebase/firestore";

export const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const findRightOne = (rightAnswer: string, answer: string) => {
  return rightAnswer === answer;
};

export const sumAnswers = (score: number[]) =>
  score.reduce((sum: number, currentValue: number) => currentValue + sum, 0);

export const correctQuotes = (question: string) => {
  question = question.replace(/&quot;/g, '"');
  question = question.replace(/&#039;/g, "'");

  return question;
};

export const getPercentage = (
  userResults: DocumentData[],
  condition?: string
) => {
  return condition === "higher"
    ? userResults.filter((item) => item.score >= 6).length
    : userResults.filter((item) => item.score < 6).length;
};

export const checkResults = (userResults: DocumentData[]) => {
  const allLost = userResults.every((item) => item.score < 6);
  const allWin = userResults.every((item) => item.score >= 6);

  return allLost || allWin;
};

export const getAverageScore = (array: DocumentData[]) => {
  let reducedArr: DocumentData[] = Object.values(
    array.reduce((acc, obj) => {
      const name = obj.name;
      const score = obj.score;
      const email = obj.email;
      acc[email] = acc[email] || { name, email, totalScore: 0, matches: 0 };
      acc[email].totalScore += score;
      acc[email].matches += 1;

      return acc;
    }, {})
  ).map(({ name, email, totalScore, matches }) => ({
    name,
    email,
    averageScore: totalScore / matches,
    matches: matches,
  }));
  reducedArr = reducedArr
    .sort((a, b) => b.averageScore - a.averageScore)
  return reducedArr;
};

export const getAverageFromUser = (array: DocumentData[],email:string) => {
  const result = array.find((average)=>average.email===email)
  return result;
};

export const makeNameShorter = (name: string) => name.split(" ")[0];
