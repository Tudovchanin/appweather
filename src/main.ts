import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Создаем экземпляр Pinia
const pinia = createPinia();

// Создаем приложение Vue
const app = createApp(App);

// Подключаем Pinia к приложению
app.use(pinia);

// Монтируем приложение
app.mount('#app');