import React, { Component } from "react";
import Button from "react-bootstrap/Button";

/**
 * Made this a class to allow for later advanced click handling. Can be removed if redundant.
 * Essentially a wrapper component for the react-bootstrap button.
 * Doesn't do much at present.
 */
class SearchButton extends Component {
  state = {};
  render() {
    return <Button variant="secondary">Search</Button>;
  }
}

export default SearchButton;
