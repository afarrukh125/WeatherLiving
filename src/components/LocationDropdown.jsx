import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";

/**
 * This class is just a wrapper class for the react-bootstrap/Dropdown component. Instead of cluttering our weather component we collapse everything into this.
 * A similar design pattern has been done for the slider component.
 *
 * The reason why this was done is so that we can keep track of the selected option
 * We also want to return the data from this dropdown back to App.js so we can use the data from here
 * in the other phases
 */

class LocationDropdown extends Component {
  state = {
    selectedIdx: 0,
    options: [
      "Select Desired Weather",
      "Sunny",
      "Cloudy",
      "Rainy",
      "Snowy",
      "Misty",
      "Stormy"
    ]
  }; // State to store the selected index for this dropdown as well as all the possible values the box can take on
  render() {
    let value = this.state.options[this.state.selectedIdx];
    return (
      <Dropdown alignRight onSelect={this.handleOption}>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {value}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">{this.state.options[1]}</Dropdown.Item>
          <Dropdown.Item eventKey="2">{this.state.options[2]}</Dropdown.Item>
          <Dropdown.Item eventKey="3">{this.state.options[3]}</Dropdown.Item>
          <Dropdown.Item eventKey="4">{this.state.options[4]}</Dropdown.Item>
          <Dropdown.Item eventKey="5">{this.state.options[5]}</Dropdown.Item>
          <Dropdown.Item eventKey="6">{this.state.options[6]}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  handleOption = idx => {
    // idx stands for index
    this.props.dataCallBack(this.state.options[idx]);
    this.setState({
      selectedIdx: idx
    });
  };
}

export default LocationDropdown;
