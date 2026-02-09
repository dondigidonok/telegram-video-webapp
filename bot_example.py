"""
Пример бота для Telegram с WebApp кнопкой
Требуется установка: pip install python-telegram-bot
"""

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes

# Замените на ваш токен от BotFather
BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"
# Замените на URL вашего размещенного приложения
WEBAPP_URL = "https://yourdomain.com/index.html"


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start"""
    keyboard = [
        [InlineKeyboardButton(
            "🎬 Открыть видеоплеер",
            web_app=WebAppInfo(url=WEBAPP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "Привет! Нажми на кнопку ниже, чтобы открыть видеоплеер:",
        reply_markup=reply_markup
    )


async def web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик данных, полученных от WebApp"""
    data = update.effective_message.web_app_data.data
    # Здесь можно обработать данные, отправленные из WebApp
    await update.message.reply_text(f"Получены данные: {data}")


def main():
    """Запуск бота"""
    application = Application.builder().token(BOT_TOKEN).build()
    
    application.add_handler(CommandHandler("start", start))
    # Обработчик для данных от WebApp (если нужно)
    # application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, web_app_data))
    
    print("Бот запущен...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
