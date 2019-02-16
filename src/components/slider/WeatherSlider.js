import Slider from "rc-slider/es/Slider";
import './WeatherSlider.css';
import React, {Component} from 'react'

/**
 * This class is just the weather slider (and the text that goes with it)
 * I made it into a separate object to ensure that these two are treated as a single entity
 * Currently it does not work as intended. The slider does move but the text needs to update
 * to the corresponding value of the slider.
 */
class WeatherSlider extends Component {
    state = {
        range: this.props.params.default
    }

    render(props) {
        let values = this.props.params
        return (
            <div align="center">
                <h3 className="disttext">Distance from current location: {this.state.range} miles</h3>
                <Slider id = "slider" min={values.min}
                        defaultValue={values.default}
                        onChange={() => this.updateText}
                        max={values.max}
                />
            </div>
        )
    }

    updateText() {
        // For some reason it just won't update right now.
        // Aiming to get it to update to whatever the range is whenever it slides
        // https://github.com/react-component/slider
        let input = document.getElementById("slider");
        let currentVal = input.value;
        console.log(currentVal)
        this.setState({
            range: currentVal
        })
    }


}

export default WeatherSlider