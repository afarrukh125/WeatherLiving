import ClearBg from "../resources/weather-backgrounds/clear/clear-bg.svg";
import ClearBgObject from "../resources/weather-backgrounds/clear/clear-right-obj.svg";
import CloudBg from "../resources/weather-backgrounds/cloud/cloud-bg.svg";
import CloudBgObject from "../resources/weather-backgrounds/cloud/cloud-bg-obj.svg";
import SnowBg from "../resources/weather-backgrounds/snow/snow-bg.svg";
import SnowBgObject from "../resources/weather-backgrounds/snow/snow-bg-obj.svg";
import RainBg from "../resources/weather-backgrounds/rain/rain-bg.svg";
import RainBgObject from "../resources/weather-backgrounds/rain/rain-bg-obj.svg";
import ThunderstormBg from "../resources/weather-backgrounds/thunderstorm/thunderstorm-bg.svg";
import ThunderstormBgObject from "../resources/weather-backgrounds/thunderstorm/thunderstorm-bg-obj.svg";
import MistBg from "../resources/weather-backgrounds/mist/mist-bg.svg";
import MistBgObject from "../resources/weather-backgrounds/mist/mist-bg-obj.svg";

import Clear from "../resources/weather-icons/clear.svg";
import Cloud from "../resources/weather-icons/cloud.svg";
import Rain from "../resources/weather-icons/rain.svg";
import Drizzle from "../resources/weather-icons/drizzle.svg";
import Snow from "../resources/weather-icons/snow.svg";
import Thunder from "../resources/weather-icons/thunder.svg";
import Atmosphere from "../resources/weather-icons/atmosphere.svg";

/**
 * This is a file containing helper methods that are used throughout the code
 * Primarily they decide things like the background and icon based on a given weather
 * There is a method that helps parse a value from the user input into ones the other methods use
 */

// returns a list of svg file depending on the weather.
// index 0: the background
// index 1: objects found on the background

export function setBackground(weather) {
  switch (weather) {
    case "Clear":
      return [ClearBg, ClearBgObject];
    case "Rain":
      return [RainBg, RainBgObject];
    case "Mist":
      return [MistBg, MistBgObject];
    case "Drizzle":
      return [RainBg, RainBgObject];
    case "Clouds":
      return [CloudBg, CloudBgObject];
    case "Snow":
      return [SnowBg, SnowBgObject];
    case "Fog":
      return [MistBg, MistBgObject];
    case "Thunderstorm":
      return [ThunderstormBg, ThunderstormBgObject];
    case "Atmosphere":
      return [ClearBg, ClearBgObject]; //update
    default:
      return null;
  }
}

// Returns svg file based on the current weather
export function renderIcon(weather) {
  switch (weather) {
    case "Clear":
      return Clear;
    case "Rain":
      return Rain;
    case "Drizzle":
      return Drizzle;
    case "Clouds":
      return Cloud;
    case "Mist":
      return Cloud;
    case "Fog":
      return Cloud;
    case "Snow":
      return Snow;
    case "Thunderstorm":
      return Thunder;
    case "Atmosphere":
      return Atmosphere;
    default:
      return "error";
  }
}

/**
 * Returns a weather label THAT IS CONSISTENT WITH THE API
 * based on the preference.
 *
 * The returned value is then used in the phase 1 (results)
 * to update the background.
 *
 * The preference value can be one of the values from the dropdown menu
 * Essentially this means that the default case can't be reached.
 *
 * As mentioned in coursework 1 in the design section, using dropdown
 * menu limits the user input. This is one such case where this has
 * proven useful.
 */
export function parseWeatherFromPreference(preference) {
  switch (preference) {
    case "Sunny":
      return "Clear";
    case "Cloudy":
      return "Clouds";
    case "Rainy":
      return "Rain";
    case "Snowy":
      return "Snow";
    case "Misty":
      return "Mist";
    case "Stormy":
      return "Thunderstorm";
    default:
      return null;
  }
}

export default { setBackground, renderIcon, parseWeatherFromPreference };
