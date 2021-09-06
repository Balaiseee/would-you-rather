import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
      if (window.location.pathname !== "/login" && window.location.pathname !== "/logout")
        this.props.history.push(window.location.pathname);
      else {
        this.props.history.push("/");
      }
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
      <>
        <section className="section has-text-centered">
          <h2 className="title is-4">Log in</h2>
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
                <button className="button is-primary is-fullwidth" type="submit">
                  Log in
                </button>
              </div>
            </form>
          </div>
          <div className="column is-hidden-touch"></div>
        </div>
      </>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const usersWithoutAuthedUser = Object.values(users).filter((user) => user.id !== authedUser);
  let currentUser = Object.values(users).filter((user) => user.id === authedUser);
  if (currentUser.length === 0)
    currentUser = [
      {
        id: "",
        name: "",
      },
    ];

  return {
    users: currentUser.concat(usersWithoutAuthedUser),
  };
}

export default withRouter(connect(mapStateToProps)(Login));
