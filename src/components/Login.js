import { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser.js";

class Login extends Component {
  state = {
    user: "",
  };
  handleChange = (event) => {
    const user = event.target.value;
    this.setState({ user });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.user) {
      this.props.dispatch(setAuthedUser(this.state.user));
      this.props.history.push("/");
    }
  };

  render() {
    const { users } = this.props;
    const userList = users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

    return (
      <div className="container">
        <section className="section has-text-centered">
          <h2 className="title is-4">Sign in</h2>
        </section>
        <div className="columns is-centered is-vcentered">
          <div className="column is-hidden-touch"></div>
          <div className="column is-half">
            <form className="box" onSubmit={this.handleSubmit}>
              <div className="field">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select onChange={this.handleChange}>{userList}</select>
                  </div>
                </div>
              </div>
              <div className="control">
                <button
                  className="button is-primary is-fullwidth"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <div className="column is-hidden-touch"></div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ authedUser, users }) {
  const usersWithoutAuthedUser = Object.values(users).filter(
    (user) => user.id !== authedUser
  );
  const currentUser = Object.values(users).filter(
    (user) => user.id === authedUser
  );

  return {
    users: currentUser.concat(usersWithoutAuthedUser),
  };
}

export default connect(mapStateToProps)(Login);
