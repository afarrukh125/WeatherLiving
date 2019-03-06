import React, { Component } from "react";
import config from "../../config";
import {
  setBackground,
  parseWeatherFromPreference,
  renderIcon
} from "../../utils/AssetsManager";
import "./DetailedResult.css";
import Button from "react-bootstrap/Button";
import moment from "moment";
import ForecastObject from "../../components/ForecastObject";

class DetailedResult extends Component {
  state = { forecast: [] };

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

    const forecastUrl =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      weatherData.coord.lat +
      "&lon=" +
      weatherData.coord.lon +
      "&units=metric&APPID=" +
      config.weatherKey;

    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    let forecastList = forecastData.list;

    let days = this.getNextFewDays(moment().day());
    let arr = [];
    let k = 0; // Keeping track of day
    arr.push(["Today", this.state.min_temp, this.state.max_temp]);
    for (let i = 0; i < 40; i = i + 8) {
      let min = forecastList[i].main.temp_min;
      let max = forecastList[i].main.temp_max;

      for (let j = i + 1; j < i + 8; j++) {
        if (forecastList[j].main.temp_min < min) {
          min = forecastList[j].main.temp_min;
        }
        if (forecastList[j].main.temp_max > max) {
          max = forecastList[j].main.temp_max;
        }
      }
      arr.push([days[k], min, max]);
      k += 1;
    }
    this.setState({ forecast: arr });
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
        <div className="resultBlock">{this.getForecast()}</div>

        <br />
        <br />
        <Button variant="secondary" onClick={this.handleBack}>
          Go back
        </Button>

        <img
          src={backgroundItems[1]}
          alt="weather background object"
          className="App-bg-object-weather"
        />
      </div>
    );
  }

  handleBack = () => {
    this.props.handleBack();
  };

  getDay(num) {
    const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    return days[num - 1];
  }

  getNextFewDays(dow) {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(this.getDay(((dow + i) % 7) + 1));
    }
    return arr;
  }

  getForecast = () => {
    let objects = [];
    for (let i = 0; i < this.state.forecast.length; i++) {
      objects.push(<ForecastObject data={this.state.forecast[i]} />);
    }
    return objects;
  };

  /**
   * This is the algorithm to decide the forecast for remaining week
   * It assumes that we are starting at 0:00 so it is not completely correct
   * It gives the rough minimum maximum values for each day
   * The forecast attribute in this component will have
   * 10 values. When considered in pairs these will give min and max values for
   * currentDay to currentDay + 5. There are 5 pairs of minmax, one for each day.
   */
}

export default DetailedResult;
