import React, { Component } from "react";
import DropdownButton from "react-bootstrap/Dropdown";
import Dropdown from "react-bootstrap/Dropdown";

class LocationDropdown extends Component {
  state = {};
  render() {
    return (
      <Dropdown alignRight>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          Select Desired Weather
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Similar</Dropdown.Item>
          <Dropdown.Item>Colder</Dropdown.Item>
          <Dropdown.Item>Warmer</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default LocationDropdown;
