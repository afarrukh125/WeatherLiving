import Slider from "rc-slider/es/Slider";

import "./WeatherSlider.css";
import React, { Component } from "react";

/**
 * This class is just the weather slider (and the text that goes with it)
 * I made it into a separate object to ensure that these two are treated as a single entity
 * Currently it does not work as intended. The slider does move but the text needs to update
 * to the corresponding value of the slider.
 */
class WeatherSlider extends Component {
  state = {
    min: 0,
    max: 3000,
    current: 0
  };

  handleSliderUpdate = current => {
    this.setState({ current }); //set the current state
    try {
      this.props.dataCallBack(current); // call the method in the parent and pass value
    } catch (TypeError) {
      console.log("Pass a handler method as a prop in the parent component");
    }
  };

  render() {
    return (
      <div align="center">
        <div>
          <h4 className="disttext">Distance</h4>
        </div>
        <Slider
          id="slider"
          min={this.state.min}
          max={this.state.max}
          defaultValue={this.state.current}
          onChange={this.handleSliderUpdate}
        />
        <p id="description">{this.state.current} Kilometers</p>
      </div>
    );
  }

  getCurrent = () => {
    // Another getter method which might be useful later when routing
    return this.state.current;
  };
}

export default WeatherSlider;
