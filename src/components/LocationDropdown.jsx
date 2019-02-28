import React, { Component } from "react";

class LocationDropdown extends React.Component {
  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
      <div className="dropdown" onClick={this.toggleOpen}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          Select Desired Weather
        </button>
        <div
          className={menuClass}
          id="dropdown"
          aria-labelledby="dropdownMenuButton"
        >
          <a className="dropdown-item">Warm</a>
          <a className="dropdown-item">Cold</a>
          <a className="dropdown-item">Similar</a>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default LocationDropdown;
