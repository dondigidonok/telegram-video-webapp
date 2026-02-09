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

// Обход ограничения Widevine на Android: открыть страницу во внешнем браузере
// В WebView Telegram на Android защищённый контент (Widevine) часто не воспроизводится.
// Во внешнем браузере (Chrome) DRM работает. См.:
// https://stackoverflow.com/questions/53143363/how-to-enable-protected-content-in-a-webview
function openInBrowser() {
    var url = window.location.href;
    if (tg.openLink) {
        tg.openLink(url, { try_instant_view: false });
    } else {
        window.open(url, '_blank');
    }
}

(function initAndroidBanner() {
    if (tg.platform === 'android') {
        var banner = document.getElementById('android-browser-banner');
        var btn = document.getElementById('open-in-browser-btn');
        if (banner) banner.hidden = false;
        if (btn) btn.addEventListener('click', openInBrowser);
    }
})();

// Обработка закрытия приложения
window.addEventListener('beforeunload', () => {
    tg.close();
});
