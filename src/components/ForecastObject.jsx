import React, { Component } from "react";
import "./ForecastObject.css";
import { renderIcon } from "../utils/AssetsManager";

/**
 * This is an individual forecast object. There are around 5 of these on the final detailed results page.
 * As such the CSS file for each of these states that the width is 20%, to fit 5 of these.
 */
class ForecastObject extends Component {
  state = {};
  render() {
    return (
      <div className="forecastObj">
        <div id="dayOfWeek">{this.props.data[0]}</div>
        <div id="tempRanges">
          {Math.round(this.props.data[2])}°|{Math.round(this.props.data[1])}°
        </div>
        <br />
        <img
          id="iconForecast"
          src={renderIcon(this.props.data[3])}
          alt="weather icon"
        />{" "}
      </div>
    );
  }
}

export default ForecastObject;
