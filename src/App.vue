<script setup lang="ts">
import { ref, onBeforeMount, reactive, computed } from "vue";
import { useWeatherStore } from "@/stores/weatherStore";
import AppInfo from "@/components/info-panels/AppInfo.vue";
import AppDiagram from "@/components/diagrams/AppDiagram.vue";

const weather = useWeatherStore();


const date = computed((): string => {
  const weatherTime = weather.time as string | undefined;
  return weatherTime ? weatherTime.split(", ")[0] : "Недоступно";
});

const time = computed((): string => {
  const weatherTime = weather.time as string | undefined;
  return weatherTime ? weatherTime.split(", ")[1] : "Недоступно";
});

interface WeatherBg {
  day: {
    [key: string]: string;
  };
  night: {
    [key: string]: string;
  };
}

interface WeatherDetail {
  [key: string]: string;
}

const weatherDetail: WeatherDetail = reactive({
  "clear sky": "ясное небо",
  "few clouds": "небольшая облачность",
  "scattered clouds": "облака с прояснениями",
  "broken clouds": "облачность",
  "overcast clouds": "сплошная облачность",

  "light rain": "небольшой дождь",
  "moderate rain": "умеренный дождь",
  "heavy intensity rain": "сильный дождь",
  "very heavy rain": "проливной дождь",
  "extreme rain": "проливной дождь",
  "freezing rain": "ледяной дождь",
  "light intensity shower rain": "небольшой ливень",
  "shower rain": "ливень",
  "heavy intensity shower rain": "сильный ливень",
  "ragged shower rain": "ливень с перерывами",

  "light snow": "небольшой снег",
  snow: "снег",
  "heavy snow": "сильный снег",
  sleet: "дождь со снегом",
  "light shower sleet": "небольшой дождь со снегом",
  "shower sleet": "ливень со снегом",
  "light rain and snow": "небольшой дождь и снег",
  "rain and snow": "дождь и снег",
  "light shower snow": "небольшой снегопад",
  "shower snow": "снегопад",
  "heavy shower snow": "сильный снегопад",

  "thunderstorm with light rain": "гроза с небольшим дождем",
  "thunderstorm with rain": "гроза с дождем",
  "thunderstorm with heavy rain": "гроза с сильным дождем",
  "light thunderstorm": "легкая гроза",
  thunderstorm: "гроза",
  "heavy thunderstorm": "сильная гроза",
  "ragged thunderstorm": "разрозненная гроза",
  "thunderstorm with light drizzle": "гроза с легким моросящим дождем",
  "thunderstorm with drizzle": "гроза с моросящим дождем",
  "thunderstorm with heavy drizzle": "гроза с сильным моросящим дождем",

  mist: "туман",
  smoke: "дым",
  haze: "дымка",
  "sand/dust whirls": "песчаные/пыльные вихри",
  fog: "туман",
  sand: "песок",
  dust: "пыль",
  "volcanic ash": "вулканический пепел",
  squalls: "шквалы",
  tornado: "торнадо",
});

const weatherBg: WeatherBg = reactive({
  day: {
    "clear sky": "day_clear_sky.mp4",
    "few clouds": "day_few_clouds.mov",
    "scattered clouds": "day_scattered_clouds.mp4",
    "broken clouds": "day_broken_clouds.mp4",
    "overcast clouds": "day_broken_clouds.mp4",

    "light rain": "day_rain.mp4",
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
    "snow": "day_snow.mp4",
    "heavy snow": "day_snow.mp4",
    "sleet": "day_snow.mp4",
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
    "thunderstorm": "day_thunderstorm.mp4",
    "heavy thunderstorm": "day_thunderstorm.mp4",
    "ragged thunderstorm": "day_thunderstorm.mp4",
    "thunderstorm with light drizzle": "day_thunderstorm.mp4",
    "thunderstorm with drizzle": "day_thunderstorm.mp4",
    "thunderstorm with heavy drizzle": "day_thunderstorm.mp4",

    "mist": "day_mist.mp4",
    "smoke": "day_mist.mp4",
    "haze": "day_mist.mp4",
    "sand/dust whirls": "",
    "fog": "",
    "sand": "",
    "dust": "",
    "volcanic ash": "",
    "squalls": "",
    "tornado": "",
  },

  night: {
    "clear sky": "night_clear_sky.mp4",
    "few clouds": "night_few_clouds.mp4",
    "scattered clouds": "night_scattered_clouds.mp4",
    "broken clouds": "night_broken_clouds.mp4",
    "overcast clouds": "night_broken_clouds.mp4",

    "light rain": "night_rain.mp4",
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
    "snow": "night_snow.mp4",
    "heavy snow": "night_snow.mp4",
    "sleet": "night_snow.mp4",
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
    "thunderstorm": "night_thunderstorm.mp4",
    "heavy thunderstorm": "night_thunderstorm.mp4",
    "ragged thunderstorm": "night_thunderstorm.mp4",
    "thunderstorm with light drizzle": "night_thunderstorm.mp4",
    "thunderstorm with drizzle": "night_thunderstorm.mp4",
    "thunderstorm with heavy drizzle": "night_thunderstorm.mp4",

    "mist": "night_mist.mp4",
    "smoke": "night_mist.mp4",
    "haze": "night_mist.mp4",
    "sand/dust whirls": "",
    "fog": "",
    "sand": "",
    "dust": "",
    "volcanic ash": "",
    "squalls": "",
    "tornado": "",
  },
});

const videoSrc = ref("");

async function handleSubmit(city: string) {
  await weather.fetchWeather(city);
  setVideoInVideoSrc();
  console.log(weather.weatherData?.main?.humidity);
}

function setVideoInVideoSrc() {
  const weatherDescription: string | undefined =
    weather.weatherData?.weather[0]?.description;
  const isDaytime: string = weather.isDaytime;

  if (weatherDescription) {
    if (isDaytime === "day" || isDaytime === "night") {
      videoSrc.value = `/video/${weatherBg[isDaytime][weatherDescription] || "not_data.mp4"
        }`;
    } else {
      videoSrc.value = "/video/not_data.mp4";
    }
  } else {
    videoSrc.value = "/video/not_data.mp4";
  }
}

function getDescriptionWeather() {
  const weatherDescription: string | undefined =
    weather.weatherData?.weather[0]?.description;
  if (weatherDescription) {
    return weatherDetail[weatherDescription];
  }
}

onBeforeMount(async () => {
  console.log("Компонент будет смонтирован запрос пошел!");
  await weather.fetchWeather("Мичуринск");
  setVideoInVideoSrc();
});
</script>
<template>
  <div class="weather-app">
    <div class="bg-video">
      <video loop autoplay muted :src="videoSrc"></video>
    </div>

    <a href="" class="weather-app__logo" :class="'text-' + weather.isDaytime">
      AppWeather
    </a>

    <div v-if="weather.error" class="weather-app__container-main">
      {{ weather.error }}
    </div>
    <div v-else class="weather-app__container-main">
      <div class="weather-app__date-time" :class="'text-' + weather.isDaytime">
        <div>Дата {{ date }}</div>
        <div>Время {{ time }}</div>
      </div>
      <div class="weather-app__container-city-weather">
        <div class="weather-app__name-city" :class="'text-' + weather.isDaytime">
          {{ weather.weatherData?.name }}
        </div>
        <div class="weather-app__temp" :class="'text-' + weather.isDaytime">
          {{
            weather.weatherData?.main?.temp &&
            Math.round(weather.weatherData?.main?.temp)
          }}
          °C
        </div>
      </div>
    </div>

    <div class="weather-app__detail-container detail-container">
      <div v-if="getDescriptionWeather()" class="detail-container__description description">
        <div class="description__text">
          {{ getDescriptionWeather() }}
        </div>
        <div class="description__img">
          <img :src="'https://openweathermap.org/img/wn/' +
            weather.weatherData?.weather[0]?.icon +
            '.png'
            " alt="картинка погоды" />
        </div>
      </div>
      <div class="detail-container__data-weather">
        <AppInfo @submit="handleSubmit" :temp="weather.weatherData?.main?.temp"
          :feels_like="weather.weatherData?.main?.feels_like" :pressure="weather.pressureMmHg"
          :gusts_of_wind="weather.weatherData?.wind?.gust" :humidity="weather.weatherData?.main?.humidity"
          :error="weather.error" />
      </div>
      <div v-if="weather.weatherData?.main?.humidity" class="detail-container__diagram-humidity diagram-humidity">
        <div class="diagram-humidity__title">Влажность</div>
        <AppDiagram :percent="weather.weatherData?.main?.humidity" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/scss/mediaMixins.scss";

.weather-app {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;

  @include mediaMixins.max_767 {
    flex-direction: column;
  }

  &__logo {
    padding: 20px;
    position: fixed;
    background-color: rgba(250, 235, 215, 0.49);
    border: solid white 1px;
    -webkit-box-shadow: 0px 0px 8px 19px rgba(34, 60, 80, 0.2) inset;
    -moz-box-shadow: 0px 0px 8px 19px rgba(34, 60, 80, 0.2) inset;
    box-shadow: 0px 0px 8px 19px rgba(34, 60, 80, 0.2) inset;
    font-size: 40px;

    @include mediaMixins.max_767 {
      font-size: 30px;
      padding: 10px;
    }
  }

  &__container-main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;

    @include mediaMixins.max_767 {
      min-height: 500px;
    }
  }

  &__detail-container {
    width: 25vw;
    padding-top: 60px;
    padding-bottom: 60px;
    background-color: rgba(255, 228, 196, 0.745);

    @include mediaMixins.max_1700 {
      width: 45vw;
    }

    @include mediaMixins.max_767 {
      padding-top: 0;
      width: 100%;
    }
  }

  &__date-time {
    display: flex;
  
    gap: 40px;
    padding-left: 20px;
    padding-right: 20px;
  }

  &__name-city {
    font-size: min(160px, 10vw);

    @include mediaMixins.max_767 {
      font-size: 16vw;
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  &__temp {
    font-size: 40px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

.detail-container {
  display: grid;

  &__description {

    @include mediaMixins.max_767 {
      order: 3;
    }

  }

  &__data-weather {
    @include mediaMixins.max_767 {
      order: 2;
    }
  }

  &__diagram-humidity {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 40px;
    padding: 0px 20px;

    @include mediaMixins.max_767 {
      justify-content: space-evenly;
      gap: 10px;
      order: 1;
    }
  }
}

.description {
  &__text {
    font-weight: 600;
    padding: 20px;
    text-align: center;
    background-color: rgba(0, 195, 255, 0.1);
    font-size: 40px;
    color: rgb(11, 11, 11);

    @include mediaMixins.max_1024 {
      font-size: 30px;
    }

    @include mediaMixins.max_767 {
      font-size: 20px;
      padding: 10px;
    }
  }

  &__img {

    padding: 10px;
    background-color: rgba(0, 195, 255, 0.1);

    @include mediaMixins.max_767 {
      padding: 0px;
    }
  }
}


.diagram-humidity {
  &__title {
    padding: 10px;
    font-size: 22px;

    @include mediaMixins.max_767 {
      font-size: 16px;
    }
  }
}


.bg-video {
  position: fixed;
  z-index: -100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  & video {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}

.text-night {
  color: aliceblue;
}

.text-day {
  color: black;
}
</style>
