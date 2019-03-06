import React, { Component } from "react";
import "./ResultContainer.css";

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

  render() {
    return (
      <div className="resultBlock">
        <a className="resultLink" href={this.state.skyscannerURL}>
          {this.props.name}
        </a>
        <br />
      </div>
    );
  }
}

export default ResultContainer;
