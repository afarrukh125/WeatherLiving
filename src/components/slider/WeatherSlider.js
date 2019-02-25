
import Slider from "rc-slider/es/Slider";

import './WeatherSlider.css';
import React, {Component} from 'react'

/**
 * **** YOU CAN EDIT THIS ******
 * 
 * 
 * This class is just the weather slider (and the text that goes with it)
 * I made it into a separate object to ensure that these two are treated as a single entity
 * Currently it does not work as intended. The slider does move but the text needs to update
 * to the corresponding value of the slider.
 * 
 * 
 * **************************************************************
 */
class WeatherSlider extends Component {
    state = {
        min : 0,
        max : 1000,
        current : 0
    }

    handleSliderUpdate = (current) => {
        this.setState({current}) //set the current state
        try {
            this.props.dataCallBack(current) // call the method in the parent and pass value
        }
        catch (TypeError){
            console.log("Pass a handler method as a prop in the parent component")
        }
      }
    
    render(prop) {
        return (
            <div align="center">
                <h3 className="disttext">Distance from current location (child compoenent): {this.state.current} miles</h3>
                <Slider id = "slider"
                    min={this.state.min}
                    max={this.state.max}
                    defaultValue={this.state.current}
                    onChange={this.handleSliderUpdate}      
                />
            </div>
        )
    }
}

export default WeatherSlider