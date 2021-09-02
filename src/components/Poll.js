import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/shared.js";

const Poll = (props) => {
  const percentage = (optionA, optionB) => {
    if (optionA) {
      return (optionA / (optionA + optionB)) * 100;
    }
    return 0;
  };
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
  if (props.question) {
    return (
      <div className="container">
        <div className="box">
          <article className="media is-vcentered">
            <div className="media-left">
              <figure className="image is-128x128">
                <img
                  className="is-rounded"
                  src={
                    props.question.author &&
                    props.users[props.question.author].avatarURL
                  }
                  alt="Image"
                />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <div className="box">
                  <article className="media is-vcentered">
                    <div className="media-content">
                      <div className="content">
                        <p>{props.question.optionOne.text}</p>
                        <progress
                          className="progress is-info"
                          value={percentage(
                            props.question.optionOne.votes.length,
                            props.question.optionTwo.votes.length
                          )}
                          max="100"
                        ></progress>
                        <p>
                          <strong>
                            {`${props.question.optionOne.votes.length} out of ${
                              props.question.optionOne.votes.length +
                              props.question.optionTwo.votes.length
                            } votes`}
                          </strong>
                        </p>
                      </div>
                    </div>
                    {!hasAnswered(props.authedUser, props.question) && (
                      <div className="media-right">
                        <button
                          className="button is-link"
                          value="optionOne"
                          onClick={handleClick}
                        >
                          Vote
                        </button>
                      </div>
                    )}
                  </article>
                </div>
                <div className="box">
                  <article className="media is-vcentered">
                    <div className="media-content">
                      <div className="content">
                        <p>{props.question.optionTwo.text}</p>
                        <progress
                          className="progress is-info"
                          value={percentage(
                            props.question.optionTwo.votes.length,
                            props.question.optionOne.votes.length
                          )}
                          max="100"
                        ></progress>
                        <p>
                          <strong>
                            {`${props.question.optionTwo.votes.length} out of ${
                              props.question.optionOne.votes.length +
                              props.question.optionTwo.votes.length
                            } votes`}
                          </strong>
                        </p>
                      </div>
                    </div>
                    {!hasAnswered(props.authedUser, props.question) && (
                      <div className="media-right">
                        <button
                          className="button is-link"
                          value="optionTwo"
                          onClick={handleClick}
                        >
                          Vote
                        </button>
                      </div>
                    )}
                  </article>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

function mapStateToProps({ questions, authedUser, users }, { match }) {
  if (questions[match.params.id]) {
    const question = questions[match.params.id];
    return {
      question,
      authedUser,
      users,
    };
  }
}

export default connect(mapStateToProps)(Poll);
