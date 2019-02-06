import React, {Component} from 'react'

class Weather extends Component{
    // state holds data about clients rough location and the current weather. 
    // default is null. API call will change it
    state = {
        country : null,
        city : null,
        lat : null,
        lon : null,
        temp : null,
        max_temp : null,
        min_temp : null,
        weather : null
        
    }
    // async method fetches JSON data from 2 APIs. One for client info and another for weather info.
    // state of component is changed after each API call
    async componentDidMount(){
        // fetch data about client location using client IP and update the component state  
        const userDataURL = 'http://ip-api.com/json/'
        const userDataResponse = await fetch(userDataURL)
        const userData = await userDataResponse.json()
        this.setState({
            country : userData.country,
            city : userData.city,
            lat : userData.lat,
            lon : userData.lon
        })

        // fetch data about the weather and update the component state
        const weatherApiKey = 'bde5c5ae7c899ef46ae5fe9e8094af6a'
        const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.lat + '&lon=' + this.state.lon + '&units=metric&APPID=' + weatherApiKey
        const weatherDataResponse = await fetch(weatherURL)
        const weatherData = await weatherDataResponse.json()
        this.setState({
            temp : weatherData.main.temp,
            max_temp : weatherData.main.temp_max,
            min_temp : weatherData.main.temp_min,
            weather : weatherData.weather[0].main
            
        })
    }

    render(){
        return(
            <div>
                <h4>Test data...</h4>
                <div>
                    The country is {this.state.country} <br />
                    The city is {this.state.city} <br />
                    The latitude is {this.state.lat} <br />
                    The longitude is {this.state.lon} <br />
                </div> 
                <br />
                <div>
                    The weather is {this.state.weather} <br />
                    The current temperature is {this.state.temp} °C <br />
                    The max temperature is {this.state.max_temp} °C <br />
                    The min temperature is {this.state.min_temp} °C <br />
                </div>
            </div>
        )
    }
}

export default Weather