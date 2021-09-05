import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared.js";
import Leaderboard from "./Leaderboard.js";
import NewQuestion from "./NewQuestion.js";
import NotFound from "./NotFound.js";
import Header from "./Header.js";
import Login from "./Login.js";
import Logout from "./Logout.js";
import Poll from "./Poll.js";
import Home from "./Home.js";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    if (this.props.authedUser) {
      return (
        <>
          <Header />
          <div className="container is-clipped">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/add" component={NewQuestion} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/logout" component={Logout} />
              <Route path="/question/:id" component={Poll} />
              <Route exact path="/404" component={NotFound} />
              <Route>
                <Redirect to="/404" />
              </Route>
            </Switch>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Header />
          <div className="container is-clipped">
            <Switch>
              <Route component={Login} />
            </Switch>
          </div>
        </>
      );
    }
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(App);
