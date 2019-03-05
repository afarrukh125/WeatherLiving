import React, { Component } from "react";
import "./Results.css";

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
      <div>
        <a href={this.state.skyscannerURL}>Take me to {this.props.name}</a>
      </div>
    );
  }
}

export default ResultContainer;
