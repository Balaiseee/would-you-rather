import { connect } from "react-redux";
import Question from "./Question.js";

const ListQuestions = (props) => {
  if (props.type === "answered") {
    return props.questionsAnswered.map((id) => <Question key={id} id={id} />);
  } else {
    return props.questionsUnanswered.map((id) => <Question key={id} id={id} />);
  }
};

function mapStateToProps({ questions, users, authedUser }) {
  // Sort the questions list from the most recently created to the least recently created
  const questionIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  return {
    questionsAnswered: questionIds.filter(
      (id) => id in users[authedUser].answers
    ),
    questionsUnanswered: questionIds.filter(
      (id) => !(id in users[authedUser].answers)
    ),
  };
}

export default connect(mapStateToProps)(ListQuestions);
