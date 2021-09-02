import React from "react";
import ListQuestions from "./ListQuestions.js";

class Home extends React.Component {
  state = {
    showList: "answered",
  };
  handleClick = (event) => {
    if (event.target.parentNode.className !== "is-active") {
      this.setState({ showList: event.target.parentNode.id });
      document.querySelector("#answered").classList.toggle("is-active");
      document.querySelector("#unanswered").classList.toggle("is-active");
    }
  };
  render() {
    return (
      <>
        <div className="tabs is-centered">
          <ul>
            <li id="answered" className="is-active">
              <a onClick={this.handleClick}>Answered questions</a>
            </li>
            <li id="unanswered">
              <a onClick={this.handleClick}>Unanswered questions</a>
            </li>
          </ul>
        </div>
        <div className="container">
          <div className="columns is-centered is-vcentered">
            <div className="column is-hidden-touch"></div>
            <div className="column is-half">
              <ListQuestions type={this.state.showList} />
            </div>
            <div className="column is-hidden-touch"></div>
          </div>
        </div>
      </>
    );
  }
}
export default Home;
