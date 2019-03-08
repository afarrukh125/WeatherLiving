import React, { Component } from "react";

/**
 * A class was needed for this because it is clickable and allows the user to set
 * whether they want to see the temperature in fahrenheit or celcius.
 * Unfortunately while developing this application we decided it would be better to keep all temperatures to celcius (metric is better :) )
 * It is unlikely that the user will click this component regardless.
 */
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
