import React, { Component } from "react";
import "./ForecastObject.css";
import { renderIcon } from "../utils/AssetsManager";

class ForecastObject extends Component {
  state = {};
  render() {
    return (
      <div className="forecastObj">
        <div id="dayOfWeek">{this.props.data[0]}</div>
        <div id="tempRanges">
          {Math.round(this.props.data[2])}°|{Math.round(this.props.data[1])}°
        </div>
        <img
          className="weatherIcon"
          src={renderIcon(this.props.data[3])}
          alt="weather icon"
        />{" "}
      </div>
    );
  }
}

export default ForecastObject;
