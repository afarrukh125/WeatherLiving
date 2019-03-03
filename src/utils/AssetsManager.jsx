import ClearBg from "../resources/weather-backgrounds/clear/clear-bg.svg";
import ClearBgObject from "../resources/weather-backgrounds/clear/clear-right-obj.svg";
import SnowBg from "../resources/weather-backgrounds/snow/snow-bg.svg";
import SnowBgObject from "../resources/weather-backgrounds/snow/snow-bg-obj.svg";
import RainBg from "../resources/weather-backgrounds/rain/rain-bg.svg";
import RainBgObject from "../resources/weather-backgrounds/rain/rain-bg-obj.svg";
import ThunderstormBg from "../resources/weather-backgrounds/thunderstorm/thunderstorm-bg.svg";
import ThunderstormBgObject from "../resources/weather-backgrounds/thunderstorm/thunderstorm-bg-obj.svg";
import Clear from "../resources/weather-icons/clear.svg";
import Cloud from "../resources/weather-icons/cloud.svg";
import Rain from "../resources/weather-icons/rain.svg";
import Drizzle from "../resources/weather-icons/drizzle.svg";
import Snow from "../resources/weather-icons/snow.svg";
import Thunder from "../resources/weather-icons/thunder.svg";
import Atmosphere from "../resources/weather-icons/atmosphere.svg";

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
      return [ClearBg, ClearBgObject]; // update
    case "Drizzle":
      return [ClearBg, ClearBgObject]; //update
    case "Clouds":
      return [ClearBg, ClearBgObject]; //update
    case "Snow":
      return [SnowBg, SnowBgObject];
    case "Fog":
      return [SnowBg, SnowBgObject]; // update
    case "Thunderstorm":
      return [ThunderstormBg, ThunderstormBgObject];
    case "Atmosphere":
      return [ClearBg, ClearBgObject]; //update
    default:
      return null;
  }
}

// returns svg file based on the current weather
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
      return Cloud; // Update
    case "Fog":
      return Cloud; // Update
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

export default { setBackground, renderIcon };
