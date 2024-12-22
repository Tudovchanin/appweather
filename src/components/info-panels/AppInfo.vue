<script setup lang="ts">
import { ref } from "vue";

const searchCity = ref<string>("");

const props = defineProps<{
  temp?: number;
  feels_like?: number;
  pressure?: number | null;
  gusts_of_wind?: number | null;
  error?: null | string;
}>();

const emit = defineEmits<{
  (e: "submit", city: string): void;
}>();

async function handleSubmit() {
  emit("submit", searchCity.value);
}
const focus = ref<boolean>(false);
</script>
<template>
  <div class="app-info">
    <form class="app-info__form" @submit.prevent="handleSubmit">
      <div class="wrapper-input" :class="{ 'wrapper-input--bt-line': focus }">
        <input
          @blur="focus = false"
          @focus="focus = true"
          placeholder="введите название города"
          class="app-info__input"
          type="text"
          required
          v-model="searchCity"
        />
      </div>

      <button class="app-info__form-btn" type="submit">Показать погоду</button>
    </form>
    <div class="container-detail-weather">
      <p v-if="props.temp">Температура: {{ Math.round(props.temp) }}°C</p>
      <p v-if="props.feels_like">Ощущается как: {{ Math.round(props.feels_like) }}°C</p>
      <p v-if="props.pressure">Давление: {{ props.pressure }} мм.рт.ст</p>
      <p v-if="props.gusts_of_wind">Порывы ветра: {{ props.gusts_of_wind }} м/c</p>

      <p v-if="props.error">Ошибка: {{ props.error }}</p>
    
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/helpers";
@use "@/assets/scss/mediaMixins.scss";

.app-info {
  &__form {
    display: flex;
    flex-direction: column;

    width: 100%;
  }

  &__input {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    border: none;
    outline: none;

    background-color: rgba(250, 235, 215, 0.691);
    font-size: 20px;

    @include helpers.hover-and-pointer {
      transition: background-color 0.5s ease, border 0.5s;

      &:hover {
        background-color: rgba(250, 235, 215, 0.043);
      }
    }
  }

  &__form-btn {
    height: 50px;
    border: none;
    font-size: 20px;
    background-color: rgb(255, 228, 196);

    @include helpers.hover-and-pointer {
      cursor: pointer;
      transition: box-shadow 0.5s, transform 0.5s;

      &:hover
       {
        transform: scaleX(0.96);
        -webkit-box-shadow: 0px 0px 8px 19px rgba(34, 60, 80, 0.2) inset;
        -moz-box-shadow: 0px 0px 8px 19px rgba(34, 60, 80, 0.2) inset;
        box-shadow: 0px 0px 8px 19px rgba(34, 60, 80, 0.2) inset;
      }

    }
  }
}

.wrapper-input {
  position: relative;
  height: 50px;
  margin-bottom: 10px;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: rgb(0, 0, 0);
    transition: width 0.5s ease;
  }

  &--bt-line {
    &::before {
      width: 100%;
    }
  }

}

.container-detail-weather {
  display: grid;
  gap: 20px;
  padding: 20px;
  font-size: 22px;

  @include mediaMixins.max_767 {
    font-size: 16px;
    gap: 4px;
  }
}
</style>
