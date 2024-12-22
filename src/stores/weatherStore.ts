
import { defineStore } from 'pinia';
import { WeatherData } from '@/types/weatherTypes';

const url: string = 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=b6f324df72e37836c19a9763df540c0d&q=';

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    isLoading: false as boolean,
    weatherData: null as WeatherData | null,
    city: '' as string | null,

    error: null as string | null,
  }),

  actions: {
    async fetchWeather(city: string): Promise<void> {
      this.error = null;


      try {
        const response = await fetch(`${url}${city}`);
        this.isLoading = true;
        // const response = await fetch(`/data/weatherData_${city}.json`)
        console.log(response);

        if (!response.ok) {
          console.log(response.status);

          if (response.status === 400) {
            this.error = 'Город не найден. Проверьте название и попробуйте снова.';
          } else if (response.status === 500) {
            this.error = 'Сервер временно недоступен. Попробуйте позже.';
          } else {
            this.error = 'Ошибка проверьте название города или попробуйте позже';
          }
          throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }

        const data = await response.json() as WeatherData;
        this.weatherData = data;
    
        this.city = data.name;


      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        if (error instanceof TypeError) {
          this.error = 'Не удалось выполнить запрос. Проверьте подключение к интернету.';
        }
        console.log(this.error);
        
        this.clearWeather();
      } finally {
        this.isLoading = false
      }
    },

    clearWeather(): void {
      this.weatherData = null;
      this.city = '';
    }
  },

  getters: {

    isDaytime(state): string {

      if (!state.weatherData ||
        !state.weatherData.sys ||
        !state.weatherData.dt ||
        state.weatherData.timezone === undefined
      ) return 'no_data';

      const { sunrise, sunset } = state.weatherData.sys;

      if (sunrise === undefined || sunset === undefined) {
        return 'no_data';
      }

      const timeOffset: number = state.weatherData.timezone;
      const time: number = state.weatherData.dt + timeOffset;
      const offsetSunrise: number = sunrise + timeOffset;
      const offsetSunset: number = sunset + timeOffset;

      return time >= offsetSunrise && time < offsetSunset ? 'day' : 'night';
    },


    pressureMmHg(state): number | null {
      return state.weatherData && state.weatherData.main?.pressure !== undefined ?
        Math.round(state.weatherData.main?.pressure * 0.750061683) : null
    },
    
    time(state): string {
      if (state.weatherData && state.weatherData.timezone !== undefined) {
        
        const currentTimeUTC: number = Date.now();
        const timezoneOffset: number = state.weatherData.timezone * 1000;
        const timestamp = currentTimeUTC + timezoneOffset;
        const date = new Date(timestamp);
       
        return date.toLocaleString('ru-RU', { timeZone: 'UTC' });
      } else {
        return "Время в этом регионе недоступно";
      }
    }
    
  },
});