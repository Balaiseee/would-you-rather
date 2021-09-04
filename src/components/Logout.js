import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { unsetAuthedUser } from "../actions/authedUser.js";

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch(unsetAuthedUser());
  }

  render() {
    return <Redirect to="/login" />;
  }
}

export default connect()(Logout);
