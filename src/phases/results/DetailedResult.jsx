import React, { Component } from "react";
import config from "../../config";
import {
  setBackground,
  parseWeatherFromPreference,
  renderIcon
} from "../../utils/AssetsManager";
import "./DetailedResult.css";
import Button from "react-bootstrap/Button";

class DetailedResult extends Component {
  state = {};

  async componentDidMount() {
    const weatherURL =
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
      this.props.info.coord.Lat +
      "&lon=" +
      this.props.info.coord.Lon +
      "&units=metric&APPID=" +
      config.weatherKey;
    const weatherDataResponse = await fetch(weatherURL);
    const weatherData = await weatherDataResponse.json();
    const countryCode = weatherData.sys.country;

    console.log(weatherData);

    this.setState({
      name: weatherData.name,
      temp: weatherData.main.temp,
      max_temp: weatherData.main.temp_max,
      min_temp: weatherData.main.temp_min
    });

    const countryCodeUrl =
      "https://restcountries.eu/rest/v2/alpha/" + countryCode;
    const countryCodeResponse = await fetch(countryCodeUrl);
    const countryCodeData = await countryCodeResponse.json();

    // The API returns the full name for GBR. We want to truncate this
    // (API returns "United Kingdom of Great Britain and Northern Ireland")
    this.setState({
      countryName:
        countryCode === "GB" ? "United Kingdom" : countryCodeData.name
    });
  }

  render() {
    const parsedPreference = parseWeatherFromPreference(this.props.weather);
    const backgroundItems = setBackground(parsedPreference);
    return (
      <div
        className="detailedResult"
        style={{ backgroundImage: `url(${backgroundItems[0]})` }}
      >
        <img
          src={renderIcon(parsedPreference)}
          alt="weather icon"
          width="200px"
        />
        <div id="weatherNameInd">{this.props.weather}</div>
        <div id="locationNameInd">
          <b>{this.state.name}</b>, {this.state.countryName}
        </div>
        <br />
        <div id="tempDisplayInd">{Math.round(this.state.temp)}°</div>
        <br />
        <br />
        <div id="weekInfoInd">Data to be put here</div>

        <br />
        <br />
        <Button variant="secondary" onClick={this.handleBack}>
          Go back
        </Button>
      </div>
    );
  }

  handleBack = () => {
    this.props.handleBack();
  };
}

export default DetailedResult;
