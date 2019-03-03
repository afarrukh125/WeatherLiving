import React, { Component } from "react";
import Button from "react-bootstrap/Button";

/**
 * This is the page on which results will be shown based on the preferences
 * chosen in the first phase
 *
 * ***************
 * API calls still need to be made as of now
 */
class Results extends Component {
  state = {};
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>
          Distance: {this.props.info.range} Preferred Weather:{" "}
          {this.props.info.preferredWeather}{" "}
        </h1>
        <Button variant="secondary" onClick={this.handleBack}>
          Back
        </Button>
      </div>
    );
  }

  handleBack = () => {
    this.props.updatePhase(0);
  };
}

export default Results;
