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
  state = {
    desiredPlaces : []
  }

  // fetch data from api
  // all the places within a certain range
  // then removes the places that do not have the desired weather by calling the 'findplace' method
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

      switch (this.props.info.preferredWeather) {
        case "Sunny" :
          this.findPlaces("Clear", weatherData)
          break;
        case "Cloudy":
          this.findPlaces("Clouds", weatherData)
          break;
        case "Rainy":
          this.findPlaces("Rain", weatherData)
          this.findPlaces("Drizzle", weatherData)
          break;
        case "Snowy":
          this.findPlaces("Snow", weatherData)
          break;
        case "Misty":
          this.findPlaces("Mist", weatherData)
          break;
        case "Stormy":
          this.findPlaces("Thunderstorm", weatherData)
          this.findPlaces("Atmosphere", weatherData)
          break;
        default:
          return "error";
      }
  }

  // method finds the desired weather and updates the state
  findPlaces =(weather, cities)=>{
    const list = cities.list
    
    for (let i = 0; i < list.length; i++){
      console.log(list[i].weather[0].main)
      if (list[i].weather[0].main === weather){
        
        this.setState({ desiredPlaces: [...this.state.desiredPlaces, list[i]] })
      }
    }
    
  }

  // temporary method to display the results
  displayResults(){
    let name = []
    for (let i = 0; i < this.state.desiredPlaces.length; i++){
      name.push(<p>{this.state.desiredPlaces[i].name}</p>)
    }
    return name
  }

  render() {
    console.log(this.state.desiredPlaces)
    return (
      <div>
        <h1>
          Distance: {this.props.info.range} Preferred Weather:{" "}
          {this.props.info.preferredWeather}{" "}
        </h1>
        <h3>Places that have the desired weather: </h3>
        {this.displayResults()}
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
