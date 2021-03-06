import { getInitialData } from "../utils/api.js";
import { saveQuestion, saveQuestionAnswer } from "../utils/api.js";
import { addQuestion, addQuestionAnswer } from "./questions.js";
import { receiveUsers } from "./users.js";
import { receiveQuestions } from "./questions.js";

export const handleInitialData = () => async (dispatch) => {
  const { users, questions } = await getInitialData();
  dispatch(receiveUsers(users));
  dispatch(receiveQuestions(questions));
};

export const handleAddQuestion = (question) => async (dispatch) => {
  const formattedQuestion = await saveQuestion(question);
  dispatch(addQuestion(formattedQuestion));
};

export const handleAddQuestionAnswer =
  ({ authedUser, qid, answer }) =>
  async (dispatch) => {
    await saveQuestionAnswer({ authedUser, qid, answer });
    dispatch(addQuestionAnswer({ authedUser, qid, answer }));
  };
