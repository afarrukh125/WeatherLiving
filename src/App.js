import React, {Component} from 'react';
import './App.css';
import Weather from './Weather'
import ClearBg from './resources/weather-backgrounds/clear/clear-bg.svg'
import ClearBgObject from './resources/weather-backgrounds/clear/clear-right-obj.svg'
import SnowBg from './resources/weather-backgrounds/snow/snow-bg.svg'
import SnowBgObject from './resources/weather-backgrounds/snow/snow-bg-obj.svg'

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
        weather: null
    }

    // async method fetches JSON data from 2 APIs. One for client info and another for weather info.
    // state of component is changed after each API call
    async componentDidMount() {
        // fetch data about client location using client IP and update the component state
        const userDataURL = 'http://ip-api.com/json/'
        const userDataResponse = await fetch(userDataURL)
        const userData = await userDataResponse.json()
        this.setState({
            country: userData.country,
            city: userData.city,
            lat: userData.lat,
            lon: userData.lon
        })

        // fetch data about the weather and update the component state
        const weatherApiKey = 'bde5c5ae7c899ef46ae5fe9e8094af6a'
        const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.lat + '&lon=' + this.state.lon + '&units=metric&APPID=' + weatherApiKey
        const weatherDataResponse = await fetch(weatherURL)
        const weatherData = await weatherDataResponse.json()
        this.setState({
            temp: weatherData.main.temp,
            max_temp: weatherData.main.temp_max,
            min_temp: weatherData.main.temp_min,
            weather: weatherData.weather[0].main
        })
    }

    // returns a list of svg file depending on the weather.
    // index 0: the background
    // index 1: objects found on the background
    setBackground(weather) {
        switch (weather) {
            case 'Clear':
                return [ClearBg, ClearBgObject]
            case 'Rain':
                return [ClearBg, ClearBgObject] //update
            case 'Mist':
                return [ClearBg, ClearBgObject] // update
            case 'Drizzle':
                return [ClearBg, ClearBgObject] //update
            case 'Clouds':
                return [ClearBg, ClearBgObject] //update
            case 'Snow':
                return [SnowBg, SnowBgObject]
            case 'Fog':
                return [SnowBg, SnowBgObject] // update
            case 'Thunderstorm':
                return [ClearBg, ClearBgObject] //update
            case 'Atmosphere':
                return [ClearBg, ClearBgObject] //update
            default:
                return null
        }
    }

    render() {
        if (this.state.weather == null) {
            return <h1> loading ... If this takes too long, ensure your adblocker is not blocking this website.</h1>
        }
        const backgroundItems = this.setBackground(this.state.weather)

        if (backgroundItems == null) {
            console.log(this.state.weather) // Check the console to see what the weather is that does not have an image
            return <h1> For developers. Error loading background. Current weather does not have an image. Please
                update. </h1>
        }

        return (
            <div className='App' style={{backgroundImage: `url(${backgroundItems[0]})`}}>
                <Weather
                    info={{
                        country: this.state.country,
                        city: this.state.city,
                        weather: this.state.weather,
                        temp: this.state.temp,
                        max_temp: this.state.max_temp,
                        min_temp: this.state.min_temp
                    }}
                />
                <img src={backgroundItems[1]} alt='weather background object' className='App-bg-object'/>

            </div>
        );
    }
}

export default App;
