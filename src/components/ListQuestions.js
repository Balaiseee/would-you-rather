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
  return {
    questionsAnswered: Object.keys(questions).filter(
      (id) => id in users[authedUser].answers
    ),
    questionsUnanswered: Object.keys(questions).filter(
      (id) => !(id in users[authedUser].answers)
    ),
  };
}

export default connect(mapStateToProps)(ListQuestions);
