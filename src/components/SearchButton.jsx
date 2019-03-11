import React, { Component } from "react";
import Button from "react-bootstrap/Button";

/**
 * Made this a class to allow for advanced click handling. Can be removed if redundant.
 * Essentially a wrapper component for the react-bootstrap button.
 *
 */
class SearchButton extends Component {
  state = {};
  render() {
    // Only return selectable button if the preferred weather has been chosen.
    // The results component will deal with the range being set to small values
    // So we do not worry about it here.
    if (this.props.preferredWeather != null && this.props.range > null) {
      return (
        <Button
          onClick={() => {
            this.props.onUpdate(1);
          }}
          variant="secondary"
        >
          Search
        </Button>
      );
    }

    return (
      <Button
        onClick={() => {
          this.props.onUpdate(1);
        }}
        variant="secondary"
        disabled
      >
        Search
      </Button>
    );
  }
}

export default SearchButton;
