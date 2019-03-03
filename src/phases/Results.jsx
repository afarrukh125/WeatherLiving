import React, { Component } from "react";

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
      </div>
    );
  }
}

export default Results;
