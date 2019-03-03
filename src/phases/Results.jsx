import React, { Component } from "react";
import Button from "react-bootstrap/Button";

/**
 * This is the page on which results will be shown based on the preferences
 * chosen in the first phase
 *
 * ***************
 * API calls still need to be made as of now
 */
class Results extends Component {
  state = {}

  async componentDidMount() {
    const coordinates = this.props.info.rangeCoordiantes

    const weatherApiKey = "bde5c5ae7c899ef46ae5fe9e8094af6a"
    const weatherURL =
      "http://api.openweathermap.org/data/2.5/box/city?bbox=" +
      coordinates.left + "," + 
      coordinates.bottom + "," +
      coordinates.right + "," +
      coordinates.top + 
      ",50&units=metric&APPID=" +
      weatherApiKey;

      const weatherDataResponse = await fetch(weatherURL);
      const weatherData = await weatherDataResponse.json();
      console.log(weatherData)
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>
          Distance: {this.props.info.range} Preferred Weather:{" "}
          {this.props.info.preferredWeather}{" "}
        </h1>
        <Button variant="secondary" onClick={this.handleBack}>
          Back
        </Button>
      </div>
    );
  }

  handleBack = () => {
    this.props.updatePhase(0);
  };
}

export default Results;
