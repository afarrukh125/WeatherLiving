import React, { Component } from "react";
import { renderIcon } from "../../utils/AssetsManager";
import WeatherSlider from "../../components/slider/WeatherSlider";
import LocationDropDown from "../../components/LocationDropdown";
import "../../App.css";
import TemperatureDisplay from "../../components/TemperatureDisplay";
import SearchButton from "../../components/SearchButton";

/**
 * This component is responsible for displaying the weather to the user.
 * It contains the form to select the desired weather and the range
 */
class Weather extends Component {
  // state holds data about clients rough location and the current weather.
  // default is null. API call will change it

  state = {
    userRange: 0,
    preferredWeather: null
  };

  // method is sent to the WeatherSlider component as a prop
  // method is called by the child component when there is a callback.
  // callback occurs when there is a change to the slider
  handleSliderUpdate = data => {
    this.setState({ userRange: data });
    this.props.handleRangeUpdate(data);
  };

  handleDropdownSelected = data => {
    this.props.handleDropdownSelected(data);
    this.setState({ preferredWeather: data });
  };

  handleButtonClick = () => {
    this.props.updatePhase(1);
  };

  render(props) {
    let info = this.props.info;
    return (
      <div className="Weather-info">
        <div className="main-info">
          <img
            src={renderIcon(info.weather)}
            alt="weather icon"
            width="200px"
          />
          <br />
          <span id="info-description"> {info.weather} </span>
          <br />
          <br />
          <span id="info-city"> {info.city} </span>
          <br />
          <TemperatureDisplay info={{ temp: info.temp }} />
          <br />
          <br />
          <LocationDropDown
            dataCallBack={this.handleDropdownSelected}
            align="center"
          />
          <br />
          <WeatherSlider
            className="Weather-slider"
            dataCallBack={this.handleSliderUpdate}
          />
          <p className="description">{this.state.userRange} Kilometers</p>
          <SearchButton
            preferredWeather={this.state.preferredWeather}
            onUpdate={this.handleButtonClick}
          />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default Weather;
