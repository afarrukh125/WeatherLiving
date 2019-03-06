import React, { Component } from "react";
import "./ResultContainer.css";
import { renderIcon } from "../../utils/AssetsManager";
import config from "../../config";

/**
 * This will hold each individual result.
 * The async operation to get the country from the lat/lon takes a while
 * We were limited by the capabilities of the open weather map api.
 * It does not show country for each result so we had to use another API.
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

    const countryUrl =
      "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=" +
      destinationLat +
      "%2C" +
      destinationLon +
      "%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=" +
      config.countryAppId +
      "&app_code=" +
      config.countryAppCode;

    const countryResponse = await fetch(countryUrl);
    const countryData = await countryResponse.json();
    const countryCode =
      countryData.Response.View[0].Result[0].Location.Address.Country;

    const countryCodeUrl =
      "https://restcountries.eu/rest/v2/alpha/" + countryCode;
    const countryCodeResponse = await fetch(countryCodeUrl);
    const countryCodeData = await countryCodeResponse.json();

    // The API returns the full name for GBR. We want to truncate this
    // (API returns "United Kingdom of Great Britain and Northern Ireland")
    this.setState({
      countryName:
        countryCode === "GBR" ? "United Kingdom" : countryCodeData.name
    });
  }

  /**
   * Displays the individual result.
   * This includes the name of the place, the relevant weather icon
   * and the temperature mainly
   */
  render() {
    return (
      <div className="resultBlock" onClick={this.handleClick}>
        <div className="resultLink">
          <div className="locationInfo">
            <span id="locationName">{this.props.name}</span>
            <br /> <br />
            <h3 id="countryName">{this.state.countryName}</h3>
          </div>
          <div className="weatherInfo">
            <h2 className="tempDisplay">
              {Math.round(this.props.temp)}°{"\n"}{" "}
            </h2>
            <div className="minmax">
              <img
                className="weatherIcon"
                src={renderIcon(this.props.weatherType)}
                alt="weather icon"
              />{" "}
              {this.props.weatherType} {Math.round(this.props.tempRange.min)}°/
              {Math.round(this.props.tempRange.max)}°
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleClick = () => {
    this.props.showDetailed(this.props.resultIndex);
  };
}

export default ResultContainer;
