# Telegram WebApp с видеоплеером

Веб-приложение для Telegram с встроенным видеоплеером Kinescope.

## Структура проекта

```
telegram_webapp/
├── index.html          # Основная HTML страница
├── styles.css          # Стили приложения
├── app.js              # JavaScript логика для Telegram WebApp API
├── bot_example.py      # Пример бота на Python
├── bot_example.js      # Пример бота на Node.js
└── README.md           # Инструкция по запуску
```

## Развёртывание на GitHub (порядок действий)

### Шаг 1. Создайте репозиторий на GitHub

1. Зайдите на [github.com](https://github.com) и войдите в аккаунт.
2. Нажмите **«+»** → **«New repository»**.
3. Укажите имя репозитория (например, `telegram-video-webapp`).
4. Выберите **Public**, не добавляйте README, .gitignore и лицензию (файлы уже есть локально).
5. Нажмите **«Create repository»**.

### Шаг 2. Инициализируйте Git и загрузите код

В папке проекта выполните в терминале:

```bash
# Инициализация репозитория (если ещё не сделано)
git init

# Добавить все файлы
git add .

# Первый коммит
git commit -m "Initial commit: Telegram WebApp с видеоплеером"

# Подключить удалённый репозиторий (замените USER и REPO на свои)
git remote add origin https://github.com/USER/REPO.git

# Отправить код в ветку main
git branch -M main
git push -u origin main
```

Замените `USER` на ваш логин GitHub, `REPO` — на имя репозитория.

### Шаг 3. Включите GitHub Pages

1. В репозитории на GitHub откройте **Settings** (Настройки).
2. В левом меню выберите **Pages** (в блоке «Code and automation»).
3. В разделе **Source** выберите **Deploy from a branch**.
4. В **Branch** выберите `main` и папку **/ (root)**.
5. Нажмите **Save**.

### Шаг 4. Дождитесь публикации

Через 1–2 минуты сайт будет доступен по адресу:

```
https://USER.github.io/REPO/
```

Главная страница приложения:

```
https://USER.github.io/REPO/index.html
```

или просто:

```
https://USER.github.io/REPO/
```

(обычно GitHub Pages открывает `index.html` по корневому URL.)

### Шаг 5. Подключите WebApp в Telegram

1. Откройте [@BotFather](https://t.me/BotFather).
2. Отправьте `/newapp` (или настройте WebApp для существующего бота).
3. В качестве **URL приложения** укажите:
   ```
   https://USER.github.io/REPO/
   ```
   или
   ```
   https://USER.github.io/REPO/index.html
   ```
4. Сохраните настройки и откройте бота — кнопка Web App должна открывать ваш плеер.

---

**Кратко:** создать репозиторий → `git init`, `add`, `commit`, `remote`, `push` → Settings → Pages → Branch: main → сохранить → использовать полученный URL в BotFather.

## Как запустить в Telegram

### Вариант 1: Использование Telegram Bot API (рекомендуется)

1. **Создайте бота в Telegram:**
   - Откройте [@BotFather](https://t.me/BotFather) в Telegram
   - Отправьте команду `/newbot`
   - Следуйте инструкциям для создания бота
   - Сохраните полученный токен бота

2. **Разместите файлы на веб-сервере:**
   - Загрузите все файлы (`index.html`, `styles.css`, `app.js`) на любой веб-хостинг
   - Убедитесь, что файлы доступны по HTTPS (обязательно для Telegram WebApp)
   - Примеры бесплатных хостингов:
     - [GitHub Pages](https://pages.github.com/)
     - [Netlify](https://www.netlify.com/)
     - [Vercel](https://vercel.com/)
     - [Firebase Hosting](https://firebase.google.com/docs/hosting)

3. **Настройте WebApp в боте:**
   - Откройте [@BotFather](https://t.me/BotFather)
   - Отправьте команду `/newapp`
   - Выберите вашего бота
   - Укажите название приложения
   - Укажите описание
   - Загрузите иконку (опционально)
   - **Важно:** Укажите URL вашего приложения (например: `https://yourdomain.com/index.html`)
   - Укажите короткое имя для приложения

4. **Проверьте работу:**
   - Откройте вашего бота в Telegram
   - Нажмите на кнопку меню (три линии) или найдите кнопку "Web App"
   - Приложение должно открыться с видеоплеером

### Вариант 2: Использование кнопки с WebApp

Если у вас уже есть бот, вы можете добавить кнопку с WebApp. В проекте есть готовые примеры:

**Python (bot_example.py):**
```bash
pip install python-telegram-bot
# Отредактируйте BOT_TOKEN и WEBAPP_URL в файле
python bot_example.py
```

**Node.js (bot_example.js):**
```bash
npm install node-telegram-bot-api
# Отредактируйте BOT_TOKEN и WEBAPP_URL в файле
node bot_example.js
```

Или добавьте кнопку вручную через Bot API:

```json
{
  "text": "Открыть видеоплеер",
  "web_app": {
    "url": "https://yourdomain.com/index.html"
  }
}
```

### Вариант 3: Локальное тестирование (для разработки)

1. **Используйте ngrok или подобный сервис:**
   ```bash
   # Установите ngrok
   # Запустите локальный сервер (например, Python)
   python -m http.server 8000
   
   # В другом терминале запустите ngrok
   ngrok http 8000
   ```

2. **Используйте полученный HTTPS URL** в настройках WebApp в BotFather

## Важные требования

- ✅ **HTTPS обязателен** - Telegram WebApp работает только через HTTPS
- ✅ **Доступность файлов** - все файлы должны быть доступны по указанному URL
- ✅ **CORS заголовки** - убедитесь, что сервер не блокирует запросы от Telegram

## Настройка видеоплеера

Чтобы изменить видео, отредактируйте `src` атрибут iframe в `index.html`:

```html
<iframe 
    src="https://kinescope.io/embed/ВАШ_ID_ВИДЕО" 
    ...
></iframe>
```

## Отладка

1. Откройте приложение в Telegram
2. Используйте встроенные инструменты разработчика Telegram (если доступны)
3. Проверьте консоль браузера через удаленную отладку (для Android можно использовать Chrome DevTools)

## Дополнительные возможности

Приложение использует Telegram WebApp API, который позволяет:
- Получать данные пользователя
- Отправлять данные обратно в бота
- Использовать тему Telegram (светлая/темная)
- Управлять кнопками и интерфейсом

Подробнее: [Telegram WebApp API Documentation](https://core.telegram.org/bots/webapps)
#   t e l e g r a m - v i d e o - w e b a p p  
 