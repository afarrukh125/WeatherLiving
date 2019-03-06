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

    /**
     * This is the algorithm to decide the forecast for remaining week
     * It assumes that we are starting at 0:00 so it is not completely correct
     * It gives the rough minimum maximum values for each day
     */

    let days = this.getNextFewDays(moment().day());
    // moment is an npm package
    // moment.day() gives the current day of the week as a number
    // e.g. monday = 1, tuesday = 2... sunday = 7
    let arr = [];
    let k = 0; // Keeping track of day

    /**
     * This is the algorithm to decide the forecast for remaining week
     * It assumes that we are starting at 0:00 so it is not completely correct
     * It gives the rough minimum maximum values for each day
     */

    // We need to push todays weather and then deal with upcoming days
    // We can use the first weather API call (for individual result) to get
    // the weather type
    arr.push([
      "Today",
      this.state.min_temp,
      this.state.max_temp,
      weatherData.weather[0].main
    ]);

    for (let i = 0; i < 40; i = i + 8) {
      let min = forecastList[i].main.temp_min;
      let max = forecastList[i].main.temp_max;

      let weatherType = forecastList[i].weather[0].main;
      // Just set the type to be whatever the first one is for that day (not accurate)

      for (let j = i + 1; j < i + 8; j++) {
        if (forecastList[j].main.temp_min < min) {
          min = forecastList[j].main.temp_min;
        }
        if (forecastList[j].main.temp_max > max) {
          max = forecastList[j].main.temp_max;
        }
      }
      arr.push([days[k], min, max, weatherType]);
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
        <div className="resultBlock">
          {this.getForecast()}
          <br />
          <p>Take me to {this.state.name}!</p>
        </div>

        <br />
        <br />
        <Button variant="secondary" onClick={this.handleBack}>
          Back
        </Button>

        <img
          src={backgroundItems[1]}
          alt="weather background object"
          className="App-bg-object-weather"
        />
      </div>
    );
  }

  /**
   * Callback function to go back to main results display
   * This is passed to whichever results object is created.
   */
  handleBack = () => {
    this.props.handleBack();
  };

  /**
   * Get the day represented by the number in short form
   * So Monday = 1 in dow format (assuming number given as such),
   * so this will return 0th element, Mon
   */
  getDay(num) {
    const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    return days[num - 1];
  }

  /**
   * Gives the next few days as an array as their shortened day name
   * Takes in the day of week as an integer, so Monday = 1, Sunday = 7
   */
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
}

export default DetailedResult;
