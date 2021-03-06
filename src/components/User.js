import { connect } from "react-redux";

const User = (props) => {
  let answeredQuestions = 0;
  let createdQuestions = 0;
  let score = 0;
  let avatarURL = "";
  let name = "";

  if (props.user) {
    answeredQuestions = Object.keys(props.user.answers).length;
    createdQuestions = props.user.questions.length;
    score = answeredQuestions + createdQuestions;
    avatarURL = window.location.origin + props.user.avatarURL;
    name = props.user.name;
  }
  return (
    <article className="media">
      <div className="media-left ml-5 has-text-centered">
        <figure className="image is-128x128">
          <img className="is-rounded" src={avatarURL} alt={props.user.name} />
        </figure>
        <strong>{name}</strong>
      </div>
      <div className="media-content">
        <div className="content has-text-centered">
          <p>
            Answered : <strong>{answeredQuestions}</strong>
            <hr />
            Created : <strong>{createdQuestions}</strong>
          </p>
        </div>
      </div>
      <div className="media-right">
        <div className="content has-text-centered mr-5">
          <p>
            Score
            <hr />
            <strong>{score}</strong>
          </p>
        </div>
      </div>
    </article>
  );
};

function mapStateToProps({ users }, { id }) {
  const currentUser = Object.values(users).filter((user) => user.id === id);
  return {
    user: currentUser[0],
  };
}

export default connect(mapStateToProps)(User);
