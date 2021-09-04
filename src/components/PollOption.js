import { connect } from "react-redux";

const PollOption = (props) => {
  let vote;
  if (props.hasAnswered) {
    vote = (
      <p>
        <strong>
          {`${props.question[props.option].votes.length} out of ${
            props.question.optionOne.votes.length +
            props.question.optionTwo.votes.length
          } votes`}
        </strong>
      </p>
    );
  } else {
    vote = (
      <button
        className="button is-link"
        value={props.option}
        onClick={props.handleClick}
      >
        Vote
      </button>
    );
  }
  let otherOption;
  if (props.option === "optionOne") {
    otherOption = "optionTwo";
  } else {
    otherOption = "optionOne";
  }

  const percentage = (optionA, optionB) => {
    if (optionA) {
      return (optionA / (optionA + optionB)) * 100;
    }
    return 0;
  };

  return (
    <div className="box">
      <article className="media is-vcentered">
        <div className="media-content">
          <div className="content">
            <p>{props.question[props.option].text}</p>
            <progress
              className="progress is-info"
              value={percentage(
                props.question[props.option].votes.length,
                props.question[otherOption].votes.length
              )}
              max="100"
            ></progress>
            {vote}
            {props.question[props.option].votes.includes(props.authedUser) && (
              <span className="tag">Your choice</span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

function mapStateToProps({ questions, authedUser }, { id }) {
  const question = questions[id];
  return {
    question,
    authedUser,
  };
}

export default connect(mapStateToProps)(PollOption);
