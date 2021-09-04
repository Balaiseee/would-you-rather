import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Question = (props) => {
  return (
    <>
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-128x128">
              <img
                className="is-rounded"
                src={props.profilePicture}
                alt={props.users[props.question.author].name}
              />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{props.question.author}</strong> asks
                <br />
                {props.question.optionOne.text
                  .substring(0, 20)
                  .trim()
                  .concat("...")}
              </p>
              <Link
                to={"/question/" + props.id}
                className="button is-fullwidth"
              >
                View poll
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id];
  const profilePicture =
    window.location.origin + users[question.author].avatarURL;
  return {
    question,
    profilePicture,
    users,
  };
}

export default connect(mapStateToProps)(Question);
