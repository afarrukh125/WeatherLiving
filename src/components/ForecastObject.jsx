import React, { Component } from "react";
import "./ForecastObject.css";

class ForecastObject extends Component {
  state = {};
  render() {
    return (
      <div className="forecastObj">
        <div id="dayOfWeek">{this.props.data[0]}</div>
        <div id="tempRanges">
          {Math.round(this.props.data[2])}°|{Math.round(this.props.data[1])}°
        </div>
      </div>
    );
  }
}

export default ForecastObject;
