/**
 * Пример бота для Telegram с WebApp кнопкой (Node.js)
 * Требуется установка: npm install node-telegram-bot-api
 */

const TelegramBot = require('node-telegram-bot-api');

// Замените на ваш токен от BotFather
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
// Замените на URL вашего размещенного приложения
const WEBAPP_URL = 'https://yourdomain.com/index.html';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    const keyboard = {
        inline_keyboard: [[
            {
                text: '🎬 Открыть видеоплеер',
                web_app: { url: WEBAPP_URL }
            }
        ]]
    };
    
    bot.sendMessage(chatId, 'Привет! Нажми на кнопку ниже, чтобы открыть видеоплеер:', {
        reply_markup: keyboard
    });
});

// Обработчик данных от WebApp (если нужно)
bot.on('message', (msg) => {
    if (msg.web_app_data) {
        const data = msg.web_app_data.data;
        bot.sendMessage(msg.chat.id, `Получены данные: ${data}`);
    }
});

console.log('Бот запущен...');
