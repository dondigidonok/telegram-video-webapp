// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Инициализация приложения
tg.ready();
tg.expand();

// Настройка цветовой схемы
tg.setHeaderColor(tg.themeParams.bg_color || '#ffffff');
tg.setBackgroundColor(tg.themeParams.bg_color || '#ffffff');

// На Android сразу открываем страницу во внешнем браузере — там Widevine работает.
function isAndroid() {
    if (tg.platform) return tg.platform === 'android';
    var hash = (window.location.hash || '').slice(1);
    if (hash) {
        var params = new URLSearchParams(hash);
        if (params.get('tgWebAppPlatform') === 'android') return true;
    }
    return /Android/i.test(navigator.userAgent);
}

if (isAndroid()) {
    var url = window.location.href;
    if (tg.openLink) tg.openLink(url);
    else window.open(url, '_blank');
    // В WebApp показываем сообщение и кнопку «Закрыть»
    var msg = document.getElementById('android-opened-message');
    var player = document.getElementById('player-container');
    var closeBtn = document.getElementById('android-close-btn');
    if (msg) msg.hidden = false;
    if (player) player.hidden = true;
    if (closeBtn) closeBtn.addEventListener('click', function () { tg.close(); });
}

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
