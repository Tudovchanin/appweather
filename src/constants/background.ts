
interface WeatherBg {
  day: {
    [key: string]: string;
  };
  night: {
    [key: string]: string;
  };
}

export const WEATHER_BACKGROUND: WeatherBg = {
  day: {
    "clear sky": "day_clear_sky.mp4",
    "few clouds": "day_few_clouds.mov",
    "scattered clouds": "day_scattered_clouds.mp4",
    "broken clouds": "day_broken_clouds.mp4",
    "overcast clouds": "day_broken_clouds.mp4",

    "light rain": "day_rain.mp4",
    "light intensity drizzle": "day_rain.mp4",
    "moderate rain": "day_rain.mp4",
    "heavy intensity rain": "day_rain.mp4",
    "very heavy rain": "day_shower_rain.mp4",
    "extreme rain": "day_shower_rain.mp4",
    "freezing rain": "day_rain.mp4",
    "light intensity shower rain": "day_shower_rain.mp4",
    "shower rain": "day_shower_rain.mp4",
    "heavy intensity shower rain": "day_shower_rain.mp4",
    "ragged shower rain": "day_shower_rain.mp4",

    "light snow": "day_snow.mp4",
    snow: "day_snow.mp4",
    "heavy snow": "day_snow.mp4",
    sleet: "day_snow.mp4",
    "light shower sleet": "day_thunderstorm.mp4",
    "shower sleet": "day_snow.mp4",
    "light rain and snow": "day_snow.mp4",
    "rain and snow": "day_snow.mp4",
    "light shower snow": "day_snow.mp4",
    "shower snow": "day_snow.mp4",
    "heavy shower snow": "day_snow.mp4",

    "thunderstorm with light rain": "day_thunderstorm.mp4",
    "thunderstorm with rain": "day_thunderstorm.mp4",
    "thunderstorm with heavy rain": "day_thunderstorm.mp4",
    "light thunderstorm": "day_thunderstorm.mp4",
    thunderstorm: "day_thunderstorm.mp4",
    "heavy thunderstorm": "day_thunderstorm.mp4",
    "ragged thunderstorm": "day_thunderstorm.mp4",
    "thunderstorm with light drizzle": "day_thunderstorm.mp4",
    "thunderstorm with drizzle": "day_thunderstorm.mp4",
    "thunderstorm with heavy drizzle": "day_thunderstorm.mp4",

    mist: "day_mist.mp4",
    smoke: "day_mist.mp4",
    haze: "day_mist.mp4",
    "sand/dust whirls": "",
    fog: "day_mist.mp4",
    sand: "",
    dust: "",
    "volcanic ash": "",
    squalls: "",
    tornado: "",
  },

  night: {
    "clear sky": "night_clear_sky.mp4",
    "few clouds": "night_few_clouds.mp4",
    "scattered clouds": "night_scattered_clouds.mp4",
    "broken clouds": "night_broken_clouds.mp4",
    "overcast clouds": "night_broken_clouds.mp4",

    "light rain": "night_rain.mp4",
    "light intensity drizzle": "night_rain.mp4",
    "moderate rain": "night_rain.mp4",
    "heavy intensity rain": "night_rain.mp4",
    "very heavy rain": "night_shower_rain.mp4",
    "extreme rain": "night_shower_rain.mp4",
    "freezing rain": "night_shower_rain.mp4",
    "light intensity shower rain": "night_shower_rain.mp4",
    "shower rain": "night_shower_rain.mp4",
    "heavy intensity shower rain": "night_shower_rain.mp4",
    "ragged shower rain": "night_shower_rain.mp4",

    "light snow": "night_snow.mp4",
    snow: "night_snow.mp4",
    "heavy snow": "night_snow.mp4",
    sleet: "night_snow.mp4",
    "light shower sleet": "night_snow.mp4",
    "shower sleet": "night_snow.mp4",
    "light rain and snow": "night_snow.mp4",
    "rain and snow": "night_snow.mp4",
    "light shower snow": "night_snow.mp4",
    "shower snow": "night_snow.mp4",
    "heavy shower snow": "night_snow.mp4",

    "thunderstorm with light rain": "night_thunderstorm.mp4",
    "thunderstorm with rain": "night_thunderstorm.mp4",
    "thunderstorm with heavy rain": "night_thunderstorm.mp4",
    "light thunderstorm": "night_thunderstorm.mp4",
    thunderstorm: "night_thunderstorm.mp4",
    "heavy thunderstorm": "night_thunderstorm.mp4",
    "ragged thunderstorm": "night_thunderstorm.mp4",
    "thunderstorm with light drizzle": "night_thunderstorm.mp4",
    "thunderstorm with drizzle": "night_thunderstorm.mp4",
    "thunderstorm with heavy drizzle": "night_thunderstorm.mp4",

    mist: "night_mist.mp4",
    smoke: "night_mist.mp4",
    haze: "night_mist.mp4",
    "sand/dust whirls": "",
    fog: "night_mist.mp4",
    sand: "",
    dust: "",
    "volcanic ash": "",
    squalls: "",
    tornado: "",
  },
};
