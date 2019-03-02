import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";

/**
 * This class is just a wrapper class for the react-bootstrap/Dropdown component. Instead of cluttering our weather component we collapse everything into this.
 * A similar design pattern has been done for the slider component.
 */

class LocationDropdown extends Component {
  state = {
    selectedIdx: 0,
    options: ["Select Desired Weather", "Similar", "Warmer", "Colder"]
  }; // State to store the selected index for this dropdown as well as all the possible values the box can take on
  render() {
    return (
      <Dropdown alignRight>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {this.state.options[this.state.selectedIdx]}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="1" onSelect={this.handleOption}>
            {this.state.options[1]}
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onSelect={this.handleOption}>
            {this.state.options[2]}
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" onSelect={this.handleOption}>
            {this.state.options[3]}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  handleOption = idx => {
    // idx stands for index
    this.setState({ selectedIdx: idx });
  };

  getSelectedOption = () => {
    // An attempt at a getter method...? Might be useful in routing later.
    return this.state.options[this.state.selectedIdx];
  };
}

export default LocationDropdown;
