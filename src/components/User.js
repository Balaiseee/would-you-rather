import ListUsers from "./ListUsers.js";
import { connect } from "react-redux";
import logo from "../img/men01.jpg";
const User = (props) => {
  let answeredQuestions = 0;
  let createdQuestions = 0;
  let score = 0;
  let avatarURL;

  if (props.user) {
    answeredQuestions = Object.keys(props.user.answers).length;
    createdQuestions = props.user.questions.length;
    score = answeredQuestions + createdQuestions;
    avatarURL = props.user.avatarURL;
  }
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-128x128">
            <img className="is-rounded" src={avatarURL} alt="Image" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content has-text-centered">
            <p>
              Answered questions : <strong>{answeredQuestions}</strong>
              <hr />
              Created questions : <strong>{createdQuestions}</strong>
            </p>
          </div>
        </div>
        <div className="media-right">
          <div className="content has-text-centered">
            <p>
              Score
              <hr />
              <strong>{score}</strong>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

function mapStateToProps({ users }, { id }) {
  if (users) {
    const currentUser = Object.values(users).filter((user) => user.id === id);

    return {
      user: currentUser[0],
    };
  }
}

export default connect(mapStateToProps)(User);
