import ListUsers from "./ListUsers.js";
import { connect } from "react-redux";

const Leaderboard = (props) => {
  return (
    <div className="container">
      <section className="section has-text-centered">
        <h2 className="title is-4">Leaderboard</h2>
      </section>
      <div className="columns is-centered is-vcentered">
        <div className="column is-hidden-touch"></div>
        <div className="column is-half">
          <ListUsers users={props.users} />
        </div>
        <div className="column is-hidden-touch"></div>
      </div>
    </div>
  );
};

function mapStateToProps({ authedUser, users }) {
  const usersWithoutAuthedUser = Object.values(users).filter((user) => user.id !== authedUser);
  const currentUser = Object.values(users).filter((user) => user.id === authedUser);

  return {
    users: currentUser.concat(usersWithoutAuthedUser),
  };
}

export default connect(mapStateToProps)(Leaderboard);
