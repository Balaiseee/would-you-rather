import React from "react";
import ListQuestions from "./ListQuestions.js";

class Home extends React.Component {
  state = {
    showList: "unanswered",
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
            <li id="unanswered" className="is-active">
              <a onClick={this.handleClick}>Unanswered</a>
            </li>
            <li id="answered">
              <a onClick={this.handleClick}>Answered</a>
            </li>
          </ul>
        </div>
        <div className="columns is-centered is-vcentered">
          <div className="column is-hidden-touch"></div>
          <div className="column is-half">
            <ListQuestions type={this.state.showList} />
          </div>
          <div className="column is-hidden-touch"></div>
        </div>
      </>
    );
  }
}
export default Home;
