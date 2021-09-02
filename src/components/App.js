import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared.js";
import Leaderboard from "./Leaderboard.js";
import NewQuestion from "./NewQuestion.js";
import Header from "./Header.js";
import Login from "./Login.js";
import Poll from "./Poll.js";
import Home from "./Home.js";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={NewQuestion} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/sign_in" component={Login} />
          <Route path="/:id" component={Poll} />
        </Switch>
      </>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
