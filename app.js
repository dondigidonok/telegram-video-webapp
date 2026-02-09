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

// Обход ограничения Widevine на Android: открыть страницу во внешнем браузере.
// API Telegram принимает только один try_browser за вызов, автоматический fallback недоступен,
// поэтому показываем кнопки выбора — пользователь нажимает тот браузер, который у него установлен.
// Список идентификаторов: https://core.telegram.org/api/web-events#web-app-open-link
var EXTERNAL_BROWSERS = [
    { id: 'chrome', name: 'Chrome' },
    { id: 'firefox', name: 'Firefox' },
    { id: 'opera', name: 'Opera' },
    { id: 'samsung', name: 'Samsung' },
    { id: 'edge', name: 'Edge' },
    { id: 'brave', name: 'Brave' },
    { id: 'vivaldi', name: 'Vivaldi' },
    { id: 'kiwi', name: 'Kiwi' },
    { id: 'uc', name: 'UC' }
];

function openInBrowser(browserId) {
    var url = window.location.href;
    if (tg.openLink) {
        tg.openLink(url, { try_instant_view: false, try_browser: browserId });
    } else {
        window.open(url, '_blank');
    }
}

(function initAndroidBanner() {
    if (tg.platform === 'android') {
        var banner = document.getElementById('android-browser-banner');
        var container = document.getElementById('browser-buttons');
        if (!banner || !container) return;
        banner.hidden = false;
        EXTERNAL_BROWSERS.forEach(function (b) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'browser-btn browser-btn-small';
            btn.textContent = b.name;
            btn.addEventListener('click', function () { openInBrowser(b.id); });
            container.appendChild(btn);
        });
    }
})();

// Обработка закрытия приложения
window.addEventListener('beforeunload', () => {
    tg.close();
});
