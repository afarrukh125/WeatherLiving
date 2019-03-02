import React, { Component } from "react";
import Clear from "./resources/weather-icons/clear.svg";
import Cloud from "./resources/weather-icons/cloud.svg";
import Rain from "./resources/weather-icons/rain.svg";
import Drizzle from "./resources/weather-icons/drizzle.svg";
import Snow from "./resources/weather-icons/snow.svg";
import Thunder from "./resources/weather-icons/thunder.svg";
import Atmosphere from "./resources/weather-icons/atmosphere.svg";
import WeatherSlider from "./components/slider/WeatherSlider";
import LocationDropDown from "./components/LocationDropdown";
import "./App.css";
import Button from "react-bootstrap/Button";
import TemperatureDisplay from "./components/TemperatureDisplay";

class Weather extends Component {
  // state holds data about clients rough location and the current weather.
  // default is null. API call will change it

  state = {
    userRange: 0
  };

  // method is sent to the WeatherSlider component as a prop
  // method is called by the child component when there is a callback.
  // callback occurs when there is a change to the slider
  handleSliderUpdate = data => {
    this.setState({ userRange: data });
    console.log(this.state.userRange);
  };

  render(props) {
    let info = this.props.info;
    return (
      <div className="Weather-info">
        <div className="main-info">
          <img
            src={this.renderIcon(info.weather)}
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
          <LocationDropDown align="center" />
          <br />
          <WeatherSlider
            className="Weather-slider"
            dataCallBack={this.handleSliderUpdate}
          />
          <p className="description">{this.state.userRange} Miles</p>
          <Button href="/results" variant="secondary">
            Search
          </Button>
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
  // returns svg file based on the current weather
  renderIcon(weather) {
    switch (weather) {
      case "Clear":
        return Clear;
      case "Rain":
        return Rain;
      case "Drizzle":
        return Drizzle;
      case "Clouds":
        return Cloud;
      case "Mist":
        return Cloud; // Update
      case "Fog":
        return Cloud; // Update
      case "Snow":
        return Snow;
      case "Thunderstorm":
        return Thunder;
      case "Atmosphere":
        return Atmosphere;
      default:
        return "error";
    }
  }
}

export default Weather;
