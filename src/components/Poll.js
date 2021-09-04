import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/shared.js";

const Poll = (props) => {
  if (props.question) {
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
    if (hasAnswered(props.authedUser, props.question)) {
      return (
        <>
          <div className="box">
            <article className="media is-vcentered">
              <div className="media-left">
                <figure className="image is-128x128">
                  <img
                    className="is-rounded"
                    src={
                      window.location.origin +
                      props.users[props.question.author].avatarURL
                    }
                    alt={props.users[props.question.author].name}
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
                              {`${
                                props.question.optionOne.votes.length
                              } out of ${
                                props.question.optionOne.votes.length +
                                props.question.optionTwo.votes.length
                              } votes`}
                            </strong>
                          </p>
                          {props.question.optionOne.votes.includes(
                            props.authedUser
                          ) && <span className="tag">Your choice</span>}
                        </div>
                      </div>
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
                              {`${
                                props.question.optionTwo.votes.length
                              } out of ${
                                props.question.optionOne.votes.length +
                                props.question.optionTwo.votes.length
                              } votes`}
                            </strong>
                          </p>
                          {props.question.optionTwo.votes.includes(
                            props.authedUser
                          ) && <span className="tag">Your choice</span>}
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="box">
            <article className="media is-vcentered">
              <div className="media-left">
                <figure className="image is-128x128">
                  <img
                    className="is-rounded"
                    src={
                      window.location.origin +
                      props.users[props.question.author].avatarURL
                    }
                    alt={props.users[props.question.author].name}
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
                          <button
                            className="button is-link"
                            value="optionOne"
                            onClick={handleClick}
                          >
                            Vote
                          </button>
                        </div>
                      </div>
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
                          <button
                            className="button is-link"
                            value="optionTwo"
                            onClick={handleClick}
                          >
                            Vote
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </>
      );
    }
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
  } else {
    return {
      undefined,
    };
  }
}

export default connect(mapStateToProps)(Poll);
