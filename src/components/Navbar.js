import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = (props) => {
  let greeting;
  if (props.user) {
    greeting = (
      <p className="navbar-item has-text-white">Hello, {props.user}</p>
    );
  }
  let login = (
    <Link to="/sign_in" className="button is-primary">
      <strong>Sign in</strong>
    </Link>
  );

  return (
    <nav className="navbar is-link">
      <a
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>

      <div id="navMenu" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/add" className="navbar-item">
            New question
          </Link>
          <Link to="/leaderboard" className="navbar-item">
            Leaderboard
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {greeting}
            <div className="buttons">{login}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};
function mapStateToProps({ users, authedUser }) {
  if (users[authedUser]) {
    const user = users[authedUser].name;
    return {
      user,
    };
  } else {
    return {
      user: "",
    };
  }
}
export default connect(mapStateToProps)(Navbar);
