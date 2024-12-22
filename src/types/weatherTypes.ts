
export interface WeatherCoord {
  lon: number;
  lat: number;
}

export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number; // Температура в Кельвинах
  feels_like?: number; // Температура, ощущаемая человеком
  temp_min?: number; // Минимальная температура
  temp_max?: number; // Максимальная температура
  pressure?: number; // Давление
  humidity?: number; // Влажность
  sea_level?: number; // Уровень моря (опционально)
  grnd_level?: number; // Уровень грунта (опционально)
}

export interface WeatherWind {
  speed: number; // Скорость ветра
  deg?: number; // Направление ветра
  gust?: number; // Порывы ветра (опционально)
}

export interface WeatherSnow {
  '1h'?: number; // Количество снега за последний час (опционально)
}

export interface WeatherClouds {
  all: number; // Облачность в процентах
}

export interface WeatherSys {
  type?: number;
  id?: number;
  country?: string; // Код страны
  sunrise?: number; // Время восхода солнца
  sunset?: number; // Время заката солнца
}

export interface WeatherData {
  coord: WeatherCoord;
  weather: WeatherDescription[];
  base?: string; // Опциональное поле
  main?: WeatherMain;
  wind?: WeatherWind;
  snow?: WeatherSnow; // Данные о снеге (опционально)
  clouds?: WeatherClouds;
  dt?: number; // Время последнего обновления данных в формате Unix timestamp
  sys?: WeatherSys;
  timezone?: number; // Часовой пояс
  id: number; // ID города
  name: string; // Название города
  cod: number; // Код ответа API
}