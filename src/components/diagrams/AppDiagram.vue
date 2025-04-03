<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

// Определяем пропсы для компонента, в данном случае только percent
const props = defineProps<{

  percent?: number; // Процент влажности
}>();

// Создаем ссылки на элементы canvas и контекст рисования
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
let greenCircleRadius = 90; // Радиус внешнего круга
let centerX = 0; // Координата X центра круга
let centerY = 0; // Координата Y центра круга
let whiteCircleRadius = 40; // Радиус внутреннего белого круга
let currentPercent = 1; // Текущий процент для анимации

// Функция для установки размеров canvas
function setCanvasSize() {
  
  if (canvas.value) {
    const width =  window.innerWidth < 768 ? 100 : 200;
    const height = width;
    
    
    
    canvas.value.width = width  
    canvas.value.height = height 


    // Обновляем координаты центра и радиусы кругов
    centerX = width / 2;
    centerY = height / 2;
    greenCircleRadius = width / 2.5; // Радиус внешнего круга в зависимости от ширины канваса
    whiteCircleRadius = width / 3; // Радиус внутреннего круга в зависимости от ширины канваса

    // Перерисовываем диаграмму после изменения размера
    drawCircle(props.percent || 0); // Передаем 0, если percent не задан
  }
}


// Функция для рисования круговой диаграммы влажности
function drawCircle(percent: number) {
  if (ctx.value) {
    // Очищаем канвас перед рисованием новой диаграммы
    ctx.value.clearRect(0, 0, canvas.value?.width || 0, canvas.value?.height || 0);

    ctx.value.fillStyle = 'rgba(243, 243, 243, 0.38)'; // Цвет фона диаграммы (серый)
    ctx.value.beginPath(); // Начинаем новый путь для рисования фона
    ctx.value.arc(centerX, centerY, greenCircleRadius, 0, Math.PI * 2); // Рисуем круг
    ctx.value.fill(); // Заполняем круг цветом фона

    // Выбор цвета заполнения в зависимости от процента влажности
    if (percent < 30) {
      ctx.value.fillStyle = 'rgba(173, 216, 230, .2)'; // Светло-голубой для низкой влажности (<30%)
    } else if (percent < 70) {
      ctx.value.fillStyle = 'rgba(70, 131, 180, .2)'; // Стальной синий для средней влажности (30% - 70%)
    } else {
      ctx.value.fillStyle = ' rgba(0, 0, 255, .2)'; // Синий для высокой влажности (>70%)
    }

    ctx.value.beginPath(); // Начинаем новый путь для заполнения диаграммы
    ctx.value.moveTo(centerX, centerY); // Перемещаем "перо" в центр круга
    const endAngle = (percent / 100) * Math.PI * 2; // Вычисляем угол конца сектора по проценту влажности
    ctx.value.arc(centerX, centerY, greenCircleRadius, 0, endAngle); // Рисуем сектор по углу endAngle
    ctx.value.lineTo(centerX, centerY); // Соединяем конец сектора с центром круга
    ctx.value.fill(); // Заполняем сектор цветом

    ctx.value.fillStyle = 'rgba(255, 228, 196, 0.745)'; // Цвет внутреннего круга (белый)
    ctx.value.beginPath();
    ctx.value.arc(centerX, centerY, whiteCircleRadius, 0, Math.PI * 2); // Рисуем белый круг в центре
    ctx.value.fill(); // Заполняем белый круг

    ctx.value.fillStyle = 'white'; // Цвет текста (черный)
    // window.innerWidth < 500 ? 50 : window.innerWidth < 1000 ? 100 : 200;
    ctx.value.font = window.innerWidth < 600 ?'bold 20px sans-serif': window.innerWidth < 1000 ? 'bold 22px sans-serif' : 'bold 24px sans-serif' // Шрифт текста
    ctx.value.textAlign = 'center'; // Выравнивание текста по центру по оси X
    ctx.value.textBaseline = 'middle'; // Выравнивание текста по центру по оси Y
    ctx.value.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.value.shadowOffsetX = 5;
    ctx.value.shadowOffsetY = 5;
    ctx.value.shadowBlur = 5;

    // Учитываем масштабирование при размещении текста и выводим процент влажности в центре круга
    ctx.value.fillText(`${percent}%`, centerX, centerY);


  }
}

// Функция для анимации увеличения процента влажности
function animate() {
  if (props.percent && currentPercent <= props.percent) {
    drawCircle(currentPercent); // Рисуем диаграмму с текущим процентом
    currentPercent++; // Увеличиваем текущий процент для анимации
    requestAnimationFrame(animate); // Запрашиваем следующую анимацию на следующем кадре браузера
  }
}

// Используем watch для отслеживания изменения пропса percent и запуска анимации при изменении значения
watch(() => props.percent, () => {
  currentPercent = 1;
  animate();
});

// Инициализация canvas после монтирования компонента
onMounted(() => {
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);

  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d'); // Получаем контекст рисования

 

    if (ctx.value) {
    
      animate();
    }
  }
});

// Удаляем обработчик события при размонтировании компонента
onBeforeUnmount(() => {
  window.removeEventListener('resize', setCanvasSize);
});
</script>

<template>
  <div>
    <canvas ref="canvas">
      
    </canvas> 
  </div>
 
</template>

<style>
canvas {
  display: block; 
  margin: auto;
}
</style>
