import { User } from "firebase/auth";
import { DocumentData, WithFieldValue } from "firebase/firestore";

export interface TriviaContextProps {
    user:Partial<User>,
    score:number[],
    questions:Question[],
    userResults:DocumentData[],
    averages:DocumentData[],
    userAverage:number | undefined,
    isSmallViewport: boolean,
    loader:boolean,
    signInWithGoogle: () => Promise<void>;
    selectCategory: (category:number) => Promise<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleScore:(chosenAnswer: string, correct_answer: string)=>void,
    resetScore:()=>void,
    saveScore:(obtainedScore: WithFieldValue<DocumentData>)=>Promise<void>
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

export interface UserData {
    displayName:string,
    email:string
}

export interface ThemeQuery { breakpoints: { down: (size: string) => string,up:(size:string)=>string} }