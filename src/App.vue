<script setup lang="ts">
import { ref, onBeforeMount, reactive, computed } from "vue";
import { useWeatherStore } from "@/stores/weatherStore";
import AppInfo from "@/components/info-panels/AppInfo.vue";
import AppDiagram from "@/components/diagrams/AppDiagram.vue";
import { WEATHER_BACKGROUND } from "./constants/background";
import { WEATHER_DETAIL_TRANSLATE } from "./constants/translate";

const weather = useWeatherStore();

const videoSrc = ref("");

const date = computed((): string => {
  const weatherTime = weather.time as string | undefined;
  return weatherTime ? weatherTime.split(", ")[0] : "Недоступно";
});
const time = computed((): string => {
  const weatherTime = weather.time as string | undefined;
  return weatherTime ? weatherTime.split(", ")[1] : "Недоступно";
});


async function handleSubmit(city: string) {
  weather.isLoading = true;
  await weather.fetchWeather(city);

  setVideoInVideoSrc();
}

function setVideoInVideoSrc() {
  const weatherDescription: string | undefined =
    weather.weatherData?.weather[0]?.description;

  const isDaytime: string = weather.isDaytime;

  if (weatherDescription) {
    if (isDaytime === "day" || isDaytime === "night") {
      videoSrc.value = `/video/${
        WEATHER_BACKGROUND[isDaytime][weatherDescription] || "not_data.mp4"
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

  if (weatherDescription && WEATHER_DETAIL_TRANSLATE[weatherDescription]) {
    return WEATHER_DETAIL_TRANSLATE[weatherDescription];
  }

  return "Описание отсутствует"; // Если weatherDescription не существует или значение в WEATHER_DETAIL_TRANSLATE отсутствует
}


onBeforeMount(async () => {
  setVideoInVideoSrc();
  await weather.fetchWeather("Мичуринск");

  // для теста приложения , коментим await weather.fetchWeather("Мичуринск"); 
  // И используем один из запросов ниже, также нужно поменять состояние в store в файле weatherStore.ts

  // await weather.fetchWeather("1"); 
  // await weather.fetchWeather("2");

  setVideoInVideoSrc();
});
</script>
<template>
 
  <main>
    <div class="weather-app">
      <div class="bg-video">
        <video loop autoplay muted :src="videoSrc"></video>
      </div>

      <div v-if="weather.isLoading" class="weather-app__container-main">
        <div class="weather-app__container-city-weather load">
          Идет загрузка
          <span class="loading-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
        </div>
        <div class="bg-video">
          <video loop autoplay muted :src="videoSrc"></video>
        </div>
      </div>

      <div v-else-if="weather.error" class="weather-app__container-main">
        {{ weather.error }}
      </div>

      <div v-else class="weather-app__container-main">
        <div
          class="weather-app__date-time"
          :class="'text-' + weather.isDaytime"
        >
          <div>Дата {{ date }}</div>
          <div>Время {{ time }}</div>
        </div>
        <div class="weather-app__container-city-weather">
          <div
            class="weather-app__name-city"
            :class="'text-' + weather.isDaytime"
          >
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
      <div
        v-if="!weather.isLoading"
        class="weather-app__detail-container detail-container"
      >
        <div
          v-if="getDescriptionWeather()"
          class="detail-container__description description"
        >
          <div class="description__text">
            {{ getDescriptionWeather() }}
          </div>
          <div class="description__img">
            <img
              :src="
                'https://openweathermap.org/img/wn/' +
                weather.weatherData?.weather[0]?.icon +
                '.png'
              "
              alt="картинка погоды"
            />
          </div>
        </div>
        <div class="detail-container__data-weather">
          <AppInfo
            @submit="handleSubmit"
            :temp="weather.weatherData?.main?.temp"
            :feels_like="weather.weatherData?.main?.feels_like"
            :pressure="weather.pressureMmHg"
            :gusts_of_wind="weather.weatherData?.wind?.gust"
            :humidity="weather.weatherData?.main?.humidity"
            :error="weather.error"
          />
        </div>
        <div
          v-if="weather.weatherData?.main?.humidity"
          class="detail-container__diagram-humidity diagram-humidity"
        >
          <div class="diagram-humidity__title">Влажность</div>
          <AppDiagram :percent="weather.weatherData?.main?.humidity" />
        </div>
      </div>
    </div>
  </main>
  <footer class="footer">
    <p :class="'text-' + weather.isDaytime">
      Все права защищены © 2025 MichDev
    </p>
    <p :class="'text-' + weather.isDaytime">
      Контакты: телеграмм
      <a
        :class="'text-' + weather.isDaytime"
        href="https://t.me/vlad_mich"
        target="_blank"
        >@vlad_mich</a
      >, почта
      <a :class="'text-' + weather.isDaytime" href="mailto:sotto36623@yandex.ru"
        >sotto36623@yandex.ru</a
      >
    </p>
  </footer>
</template>

<style lang="scss">
@use "@/assets/scss/mediaMixins.scss";

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 228, 196, 0.745);
  padding: 10px;

  @include mediaMixins.max_767 {
    position: initial;
  }
}

.weather-app {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;

  @include mediaMixins.max_767 {
    flex-direction: column;
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

.load {
  background-color: rgba(255, 228, 196, 0.745);
  padding: 20px 40px;
  font-size: 40px;
}

.loading-dots {
  display: inline-block;
  margin-left: 10px;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 2px;
  border-radius: 50%;
  background-color: rgb(0, 0, 0);
  animation: loading 1s infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loading {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }
}
</style>
