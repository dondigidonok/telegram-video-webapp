// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Инициализация приложения
tg.ready();
tg.expand();

// Настройка цветовой схемы
tg.setHeaderColor(tg.themeParams.bg_color || '#ffffff');
tg.setBackgroundColor(tg.themeParams.bg_color || '#ffffff');

// Обработка событий
tg.onEvent('viewportChanged', (event) => {
    console.log('Viewport changed:', event);
});

// Логирование для отладки
console.log('Telegram WebApp initialized');
console.log('Theme params:', tg.themeParams);
console.log('Platform:', tg.platform);
console.log('Version:', tg.version);

// Обработка ошибок загрузки iframe
window.addEventListener('error', (event) => {
    console.error('Error:', event);
});

// Функция для отправки данных в Telegram (если нужно)
function sendDataToTelegram(data) {
    tg.sendData(JSON.stringify(data));
}

// Обработка закрытия приложения
window.addEventListener('beforeunload', () => {
    tg.close();
});
