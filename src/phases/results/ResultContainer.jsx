import React, { Component } from "react";
import "./ResultContainer.css";
import { renderIcon } from "../../utils/AssetsManager";

/**
 * This will hold each individual result.
 * There still needs to be CSS formatting done for this.
 */
class ResultContainer extends Component {
  state = {
    skyscannerURL: null
  };

  async componentDidMount() {
    const originLat = this.props.info.origin_geo[0];
    const originLon = this.props.info.origin_geo[1];
    const destinationLat = this.props.info.destination_geo[0];
    const destinationLon = this.props.info.destination_geo[1];

    const originIataUrl =
      "http://iatageo.com/getCode/" + originLat + "/" + originLon;
    const destinationIataUrl =
      "http://iatageo.com/getCode/" + destinationLat + "/" + destinationLon;

    const originIataResponse = await fetch(originIataUrl);
    const originIataData = await originIataResponse.json();

    const destinationIataResponse = await fetch(destinationIataUrl);
    const destionationData = await destinationIataResponse.json();

    this.setState({
      skyscannerURL:
        "https://www.skyscanner.net/transport/flights/" +
        originIataData.IATA +
        "/" +
        destionationData.IATA
    });
  }

  /**
   * Displays the individual result.
   * This includes the name of the place, the relevant weather icon
   * and the temperature mainly
   */
  render() {
    console.log(this.props.weatherType);
    return (
      <div className="resultBlock">
        <a className="resultLink" href={this.state.skyscannerURL}>
          <h4 className="locationInfo">{this.props.name}</h4>
          <img
            className="weatherIcon"
            src={renderIcon(this.props.weatherType)}
            alt="weather icon"
          />
          <h2 className="tempDisplay">{Math.round(this.props.temp)}</h2>
        </a>
        <br />
      </div>
    );
  }
}

export default ResultContainer;
