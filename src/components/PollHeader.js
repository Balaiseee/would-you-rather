import { connect } from "react-redux";

const PollHeader = (props) => {
  return (
    <div className="media-left">
      <figure className="image is-128x128">
        <img
          className="is-rounded"
          src={window.location.origin + props.users[props.question.author].avatarURL}
          alt={props.users[props.question.author].name}
        />
      </figure>
    </div>
  );
};

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  return {
    question,
    users,
  };
}

export default connect(mapStateToProps)(PollHeader);
