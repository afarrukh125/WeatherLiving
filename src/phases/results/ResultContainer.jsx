import React, { Component } from "react";

class ResultContainer extends Component {
  state = {
    originIata : null,
    destinationIata : null,
    skyscannerURL : null
  }; 

  async componentDidMount() {
    const originLat = this.props.info.origin_geo[0]
    const originLon = this.props.info.origin_geo[1]    
    const destinationLat = this.props.info.destination_geo[0]
    const destinationLon = this.props.info.destination_geo[1]

    const originIataUrl = "http://iatageo.com/getCode/" + originLat +"/" + originLon
    const destinationIataUrl = "http://iatageo.com/getCode/" + destinationLat +"/" + destinationLon

    const originIataResponse = await fetch(originIataUrl);
    const originIataData = await originIataResponse.json();

    const destinationIataResponse = await fetch(destinationIataUrl);
    const destionationData = await destinationIataResponse.json();

    this.setState({
      originIata : originIataData.IATA,
      destinationIata : destionationData.IATA,
      skyscannerURL : "https://www.skyscanner.net/transport/flights/" + originIataData.IATA + "/" + destionationData.IATA
    })
  }

  render() {      
    return (
      <div>  
        <a href={this.state.skyscannerURL}>Take me to Malta</a>
  </div>
  )
}
}

export default ResultContainer;
