import { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/shared.js";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.optionOneText &&
      this.state.optionTwoText &&
      this.props.authedUser
    ) {
      this.props.dispatch(
        handleAddQuestion({
          optionOneText: this.state.optionOneText,
          optionTwoText: this.state.optionTwoText,
          author: this.props.authedUser,
        })
      );
      return this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="container">
        <section className="section has-text-centered">
          <h2 className="title is-4">Create new question</h2>
        </section>
        <div className="columns is-centered is-vcentered">
          <div className="column is-hidden-touch"></div>
          <div className="column is-half">
            <form className="box" onSubmit={this.handleSubmit}>
              <div className="field">
                <label className="label">Would you rather ?</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="optionOneText"
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label has-text-centered">Or</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="optionTwoText"
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>

              <button className="button is-primary is-fullwidth" type="submit">
                Submit
              </button>
            </form>
          </div>
          <div className="column is-hidden-touch"></div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(NewQuestion);
