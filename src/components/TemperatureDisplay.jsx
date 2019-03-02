import React, { Component } from "react";

class TemperatureDisplay extends Component {
  state = {
    isCelcius: true
  };
  render(props) {
    let info = this.props.info;
    let letter = this.state.isCelcius ? "C" : "F";
    let temp = this.state.isCelcius
      ? info.temp
      : this.getFarenheight(info.temp);
    return (
      <span id="info-temp" onClick={this.changeCelcius}>
        {" "}
        {Math.round(temp)}°{letter}{" "}
      </span>
    );
  }

  changeCelcius = () => {
    this.setState({
      isCelcius: !this.state.isCelcius
    });
  };

  getFarenheight = val => {
    return val * (9 / 5) + 32;
  };
}

export default TemperatureDisplay;
