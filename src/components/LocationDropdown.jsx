import React, { Component } from "react";
import DropdownButton from "react-bootstrap/Dropdown";
import Dropdown from "react-bootstrap/Dropdown";

class LocationDropdown extends Component {
  state = {
    selectedIdx: 0,
    options: ["Select Desired Weather", "Similar", "Warmer", "Colder"]
  };
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
    this.setState({ selectedIdx: idx });
  };
}

export default LocationDropdown;
