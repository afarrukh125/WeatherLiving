import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import config from "../../config";

/**
 * This is the page on which results will be shown based on the preferences
 * chosen in the first phase
 */
class Results extends Component {
  state = {
    desiredPlaces: []
  };

  /**
   * fetch data from api
   * all the places within a certain range
   * then removes the places that do not have the desired weather by calling the 'findplace' method
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
      console.log(list[i].weather[0].main);
      if (list[i].weather[0].main === weather) {
        this.setState({
          desiredPlaces: [...this.state.desiredPlaces, list[i]]
        });
      }
    }
  };

  // temporary method to display the results
  displayResults() {
    let name = [];

    if (this.state.desiredPlaces.length > 0) {
      name.push(<h3>Places that have the desired weather: </h3>);
    } else {
      name.push(<h3>There were no results matching this query.</h3>);
    }

    for (let i = 0; i < this.state.desiredPlaces.length; i++) {
      name.push(<p>{this.state.desiredPlaces[i].name}</p>);
    }
    return name;
  }

  render() {
    let padding = [];
    const VALUE = 30;
    for (let i = 0; i < VALUE - this.state.desiredPlaces.length; i++) {
      padding.push(<br />);
    }
    console.log(this.state.desiredPlaces);
    return (
      <div>
        <h1>
          Distance: {this.props.info.range} Kilometres | Preferred Weather:{" "}
          {this.props.info.preferredWeather}{" "}
        </h1>{" "}
        {this.displayResults()}
        <Button variant="secondary" onClick={this.handleBack}>
          Back
        </Button>
        {padding}
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
