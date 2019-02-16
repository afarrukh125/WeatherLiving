import React, {Component} from 'react'
import Clear from './resources/weather-icons/clear.svg'
import Cloud from './resources/weather-icons/cloud.svg'
import Rain from './resources/weather-icons/rain.svg'
import Drizzle from './resources/weather-icons/drizzle.svg'
import Snow from './resources/weather-icons/snow.svg'
import Thunder from './resources/weather-icons/thunder.svg'
import Atmosphere from './resources/weather-icons/atmosphere.svg'
import WeatherSlider from './components/slider/WeatherSlider'
import './App.css'

class Weather extends Component {
    // state holds data about clients rough location and the current weather. 
    // default is null. API call will change it

    render(props) {
        let info = this.props.info
        // The table align is temporary
        return (
            <div className='Weather-info'>
                <h4>Test data...</h4>
                <img src={this.renderIcon(info.weather)} alt='weather icon' width='200px'/>
                <div>
                    The weather is: {info.weather} <br/>
                    The country is: {info.country} <br/>
                    The city is: {info.city} <br/>
                    The temperature is: {info.temp} <br/>
                    <br/>
                    <WeatherSlider className='Weather-slider' params = {{
                        //This is the weather slider along with the text to represent its values
                        min: 0,
                        max: 1000,
                        default: 500
                    }}/>
                </div>
            </div>
        )
    }

    // returns svg file based on the current weather
    renderIcon(weather) {
        switch (weather) {
            case 'Clear':
                return Clear
            case 'Rain':
                return Rain
            case 'Drizzle':
                return Drizzle
            case 'Clouds':
                return Cloud
            case 'Mist':
                return Cloud // Update
            case 'Fog':
                return Cloud // Update
            case 'Snow':
                return Snow
            case 'Thunderstorm':
                return Thunder
            case 'Atmosphere':
                return Atmosphere
            default:
                return 'error'
        }
    }
}

export default Weather