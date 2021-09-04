import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/shared.js";
import PollHeader from "./PollHeader.js";
import PollOption from "./PollOption.js";

const Poll = (props) => {
  if (props.question) {
    const hasAnswered = (authedUser, question) => {
      if (question.optionOne.votes.includes(authedUser)) return true;
      if (question.optionTwo.votes.includes(authedUser)) return true;
      else return false;
    };
    const handleClick = (event) => {
      event.preventDefault();
      props.dispatch(
        handleAddQuestionAnswer({
          authedUser: props.authedUser,
          qid: props.match.params.id,
          answer: event.target.value,
        })
      );
    };
    return (
      <>
        <div className="box">
          <article className="media is-vcentered">
            <PollHeader id={props.match.params.id} />
            <div className="media-content">
              <div className="content">
                <PollOption
                  id={props.match.params.id}
                  option="optionOne"
                  hasAnswered={hasAnswered(props.authedUser, props.question)}
                  handleClick={handleClick}
                />
                <PollOption
                  id={props.match.params.id}
                  option="optionTwo"
                  hasAnswered={hasAnswered(props.authedUser, props.question)}
                  handleClick={handleClick}
                />
              </div>
            </div>
          </article>
        </div>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

function mapStateToProps({ questions, authedUser, users }, { match }) {
  const question = questions[match.params.id];
  return {
    question,
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Poll);
