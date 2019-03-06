import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ResultContainer from "./ResultContainer";
import config from "../../config";
import "./Results.css";
import {
  setBackground,
  parseWeatherFromPreference
} from "../../utils/AssetsManager";

/**
 * This is the page on which results will be shown based on the preferences
 * chosen in the first phase
 */
class Results extends Component {
  state = {
    desiredPlaces: []
  };

  /**
   * Fetch data from api
   * All the places within a certain range
   * Then removes the places that do not have the desired weather by calling the 'findplace' method
   */
  async componentDidMount() {
    const coordinates = this.props.info.rangeCoordiantes;

    const weatherApiKey = config.weatherKey;
    const weatherURL =
      "http://api.openweathermap.org/data/2.5/box/city?bbox=" +
      coordinates.left +
      "," +
      coordinates.bottom +
      "," +
      coordinates.right +
      "," +
      coordinates.top +
      ",50&units=metric&APPID=" +
      weatherApiKey;

    const weatherDataResponse = await fetch(weatherURL);
    const weatherData = await weatherDataResponse.json();

    switch (this.props.info.preferredWeather) {
      case "Sunny":
        this.findPlaces("Clear", weatherData);
        break;
      case "Cloudy":
        this.findPlaces("Clouds", weatherData);
        break;
      case "Rainy":
        this.findPlaces("Rain", weatherData);
        this.findPlaces("Drizzle", weatherData);
        break;
      case "Snowy":
        this.findPlaces("Snow", weatherData);
        break;
      case "Misty":
        this.findPlaces("Mist", weatherData);
        break;
      case "Stormy":
        this.findPlaces("Thunderstorm", weatherData);
        this.findPlaces("Atmosphere", weatherData);
        break;
      default:
        return "error";
    }
  }

  // This method finds the desired weather based on the preferred weather
  // It appends each result from the list of cities that matches the preferred weather
  // to the array contained in the state of this component
  findPlaces = (weather, cities) => {
    const list = cities.list;

    for (let i = 0; i < list.length; i++) {
      if (list[i].weather[0].main === weather) {
        this.setState({
          desiredPlaces: [...this.state.desiredPlaces, list[i]]
        });
      }
    }
  };

  // Method to display the results
  displayResults() {
    let name = [];

    if (this.state.desiredPlaces.length === 0) {
      name.push(
        <h3 id="noResults">There were no results matching this query.</h3>
      );
    }

    for (let i = 0; i < this.state.desiredPlaces.length; i++) {
      // console.log(this.state.desiredPlaces[i]);
      name.push(
        <div>
          <ResultContainer
            className="resContainer"
            weatherType={this.state.desiredPlaces[i].weather[0].main}
            name={this.state.desiredPlaces[i].name}
            temp={this.state.desiredPlaces[i].main.temp}
            info={{
              origin_geo: this.props.info.geolocation,
              destination_geo: [
                this.state.desiredPlaces[i].coord.Lat,
                this.state.desiredPlaces[i].coord.Lon
              ]
            }}
          />
          <br />
        </div>
      );
    }
    return name;
  }

  /**
   * This method renders this component and the list of results from earlier
   * The components in this part of the code include the divs that display the user input,
   * each individual result (from the list above), and the button to allow user to go back
   *
   */
  render() {
    const weather = parseWeatherFromPreference(
      this.props.info.preferredWeather
    );
    const backgroundItems = setBackground(weather);
    // We must decide the style for the results page dynamically
    // This is why we could not have used an external style sheet
    // The idea is that if there are a few results then we set the results page to be fixed height
    // If there are many results then we scale the height of the page to automatically align with the number of results
    // The constant "decider" is the value that the ternary operator uses to decide which className to use
    const decider = 10;
    let resultClass =
      this.state.desiredPlaces.length > decider
        ? "many-results"
        : "few-results";
    // console.log(this.state.desiredPlaces);
    // console.log("Results" + this.props.info.geolocation);
    return (
      <div
        className={resultClass}
        style={{ backgroundImage: `url(${backgroundItems[0]})` }}
      >
        <div>
          <div className="inputDisplay">
            <b id="prefWeather">{this.props.info.preferredWeather}</b>
            <div className="rangeDisplay">
              <b>WITHIN </b>
              <div id="prefRange">{this.props.info.range} KILOMETERS </div>
            </div>
          </div>
          <br />
          {this.displayResults()}
          <br />
          <Button variant="secondary" onClick={this.handleBack}>
            Back
          </Button>
          <div>
            <img
              src={backgroundItems[1]}
              alt="weather background object"
              className="App-bg-object"
            />
          </div>
        </div>
      </div>
    );
  }

  /**
   * Callback function to update the phase once the back button is pressed
   */
  handleBack = () => {
    this.props.updatePhase(0);
  };
}

export default Results;
