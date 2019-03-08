import React, { Component } from "react";
import "./App.css";
import Weather from "./phases/weather/Weather";
import Results from "./phases/results/Results";
import { setBackground } from "./utils/AssetsManager";
import config from "./config";

/**
 * This is the core component.
 * This holds all the information that the user enters
 * and is responsible for delivering the components depending on
 * which stage of the application we are at
 */
class App extends Component {
  // state holds data about client's rough location and the current weather.
  // default is null. API call will change it
  state = {
    country: null,
    city: null,
    lat: null,
    lon: null,
    temp: null,
    max_temp: null,
    min_temp: null,
    weather: null,
    selectedRange: 0,
    preferredWeather: null,
    phase: 0
  };

  // converts radian to degrees
  radianToDegrees = val => {
    return val * (180 / Math.PI);
  };

  /**
   * We make use of the Haversine formula to calculate this
   * https://en.wikipedia.org/wiki/Haversine_formula
   */
  getRangeCoordinates = () => {
    //this is where the range will be calculated
    // api only deals with longitudinal and latitudinal values.
    // this methods converts km to long and lat. Returns 4 points
    const latToKmVal = 110.574;
    const lonToKmVal = 111.32;

    const latDelta = this.state.selectedRange / latToKmVal;
    const lonDelta =
      this.state.selectedRange /
      (lonToKmVal * this.radianToDegrees(Math.cos(this.state.lat)));

    const left = this.state.lon - lonDelta;
    const right = this.state.lon + lonDelta;
    const top = this.state.lat + latDelta;
    const bottom = this.state.lat - latDelta;

    return { left: left, bottom: bottom, right: right, top: top };
  };

  /**
   * This returns an array to correspond to which phase we are in
   * Phase 0: Display weather and allow user to enter data
   * Phase 1: Display results based on this data
   *
   * Phase 1 has a subphase which shows all results or a detailed result depending on what the user has clicked. More information on this in Results.jsx.
   */
  getPhases() {
    return [
      <Weather
        weather={this.state.weather}
        handleRangeUpdate={this.updateRange}
        handleDropdownSelected={
          this.updatePreference // For user to update location preference
        }
        updatePhase={this.updatePhase}
        info={{
          country: this.state.country,
          city: this.state.city,
          weather: this.state.weather,
          temp: this.state.temp,
          max_temp: this.state.max_temp,
          min_temp: this.state.min_temp
        }}
      />,
      <Results
        updatePhase={this.updatePhase}
        info={{
          geolocation: [this.state.lat, this.state.lon], //[lat, long]
          preferredWeather: this.state.preferredWeather,
          range: this.state.selectedRange,
          temp: this.state.temp,
          country: this.state.country,
          city: this.state.city,
          rangeCoordiantes: this.getRangeCoordinates()
        }}
      />
    ];
  }
  // async method fetches JSON data from 2 APIs. One for client info and another for weather info.
  // state of component is changed after each API call
  async componentDidMount() {
    // fetch data about client location using client IP and update the component state
    const userDataURL = "http://ip-api.com/json/";
    const userDataResponse = await fetch(userDataURL);
    const userData = await userDataResponse.json();
    this.setState({
      country: userData.country,
      city: userData.city,
      lat: userData.lat,
      lon: userData.lon
    });

    // fetch data about the weather and update the component state
    const weatherApiKey = config.weatherKey;
    const weatherURL =
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
      this.state.lat +
      "&lon=" +
      this.state.lon +
      "&units=metric&APPID=" +
      weatherApiKey;
    const weatherDataResponse = await fetch(weatherURL);
    const weatherData = await weatherDataResponse.json();
    this.setState({
      temp: weatherData.main.temp,
      max_temp: weatherData.main.temp_max,
      min_temp: weatherData.main.temp_min,
      weather: weatherData.weather[0].main
    });
  }

  render() {
    const backgroundItems = setBackground(this.state.weather);
    if (this.state.weather == null) {
      return (
        <h1>
          {" "}
          Loading ... If this takes too long, ensure your adblocker is not
          blocking this website.
        </h1>
      );
    }

    if (backgroundItems == null) {
      console.log(this.state.weather); // Check the console to see what the weather is that does not have an image
      return (
        <h1>
          {" "}
          For developers. Error loading background. Current weather does not
          have an image. Please update.{" "}
        </h1>
      );
    }
    return <div>{this.getPhases()[this.state.phase]}</div>;
  }

  /**
   * Callback function for when the slider is updated
   */
  updateRange = data => {
    this.setState({ selectedRange: data });
  };

  /**
   * Callback function for updating the user's weather preference
   */
  updatePreference = data => {
    this.setState({ preferredWeather: data });
  };

  /**
   * Callback function for updating which phase we are in.
   */
  updatePhase = val => {
    this.setState({ phase: val });
  };
}

export default App;
