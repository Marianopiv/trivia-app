
export interface TriviaContextProps {
    signInWithGoogle: () => Promise<void>;
    selectCategory: (category:number) => Promise<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user:any,
    score:number[],
    questions:Question[],
    handleScore:(chosenAnswer: string, correct_answer: string)=>void,
    resetScore:()=>void
}

export interface Question {
    category: string;
        type: string;
        difficulty: string;
        question: string,
        correct_answer: string,
        incorrect_answers: []
}