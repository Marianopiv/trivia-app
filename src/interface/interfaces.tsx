import { DocumentData, WithFieldValue } from "firebase/firestore";

export interface TriviaContextProps {
    user:any,
    score:number[],
    questions:Question[],
    userResults:UserResults[],
    averages:Averages[],
    signInWithGoogle: () => Promise<void>;
    selectCategory: (category:number) => Promise<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleScore:(chosenAnswer: string, correct_answer: string)=>void,
    resetScore:()=>void,
    saveScore:(obtainedScore: WithFieldValue<DocumentData>,questionsMade:number)=>Promise<void>
    getScores:() => Promise<void>,
}

export interface UserResults {
    name:string,
    score:number
}

export interface Question {
    category: string;
        type: string;
        difficulty: string;
        question: string,
        correct_answer: string,
        incorrect_answers: []
}



export interface Averages {
    name:string,
    score:string,
    averageScore:number,
    matches:number
}