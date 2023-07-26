import axios from "axios";

const baseUrl = "https://opentdb.com/"

export const getQuestions = (category:number) => axios.get(baseUrl+`/api.php?amount=10&category=${category}&type=multiple`)