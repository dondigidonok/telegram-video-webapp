# Telegram WebApp — видеоплеер Kinescope

Мини-приложение для Telegram: открывается внутри мессенджера и показывает видео из [Kinescope](https://kinescope.io) с поддержкой Widevine DRM.

- Работает на ПК, iPhone и Android (в обычном браузере).
- На Android внутри Telegram видео с DRM может не воспроизводиться — в приложении есть кнопки «Открыть в Chrome / Firefox / …», чтобы открыть страницу во внешнем браузере.

---

## Что внутри репозитория

| Файл | Назначение |
|------|------------|
| `index.html` | Страница с плеером (iframe Kinescope) и баннером для Android |
| `styles.css` | Стили страницы и кнопок |
| `app.js` | Логика Telegram WebApp: тема, кнопки «Открыть в браузере» |
| `bot_example.py` | Пример бота на Python с кнопкой Web App |
| `bot_example.js` | Пример бота на Node.js с кнопкой Web App |

---

## Как выложить на GitHub и открыть в Telegram

### 1. Создать репозиторий на GitHub

- Зайти на [github.com](https://github.com) → **New repository**.
- Имя, например: `telegram-video-webapp`.
- Репозиторий **Public**, без галочек README / .gitignore / License.

### 2. Залить код

В папке проекта:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ВАШ_ЛОГИН/telegram-video-webapp.git
git branch -M main
git push -u origin main
```

Подставьте свой логин вместо `ВАШ_ЛОГИН`.

### 3. Включить GitHub Pages

- В репозитории: **Settings** → слева **Pages**.
- **Source:** Deploy from a branch.
- **Branch:** `main`, папка **/ (root)** → **Save**.

Через 1–2 минуты приложение будет доступно по адресу:

**`https://ВАШ_ЛОГИН.github.io/telegram-video-webapp/`**

### 4. Подключить Web App к боту в Telegram

- Написать [@BotFather](https://t.me/BotFather).
- Создать бота: `/newbot` (если ещё нет).
- Настроить Mini App: `/newapp` или **Bot Settings** → **Configure Mini App**.
- В качестве **URL приложения** указать:  
  **`https://ВАШ_ЛОГИН.github.io/telegram-video-webapp/`**

После этого в боте появится кнопка, по нажатию откроется ваш плеер.

---

## Как поменять видео

В `index.html` найдите iframe и замените ID видео в ссылке:

```html
<iframe src="https://kinescope.io/embed/ВАШ_ID_ВИДЕО" ...></iframe>
```

ID берётся из Kinescope (в адресе или настройках встраивания).

---

## Android и Widevine DRM

- **Внутри Telegram на Android** встроенный браузер не всегда поддерживает защищённый контент (Widevine). Это ограничение приложения Telegram, а не этого проекта.
- Поэтому в приложении на Android показывается баннер с кнопками: **Chrome**, **Firefox**, **Opera** и др. По нажатию страница открывается во внешнем браузере — там видео с DRM обычно воспроизводится.
- В обычном Chrome на Android (не в инкогнито) Widevine должен работать. Если нет — проверьте поддержку DRM: [shaka-player-demo.appspot.com/support.html](https://shaka-player-demo.appspot.com/support.html).

Подробнее: [Kinescope — возможные проблемы](https://docs.kinescope.io/player/v2.172.0/common-problems/).

---

## Требования

- Сайт должен открываться по **HTTPS** (GitHub Pages даёт его автоматически).
- Для бота нужен токен от [@BotFather](https://t.me/BotFather).

---

## Примеры ботов с кнопкой Web App

**Python:**

```bash
pip install python-telegram-bot
```

В `bot_example.py` укажите `BOT_TOKEN` и `WEBAPP_URL` (ваш URL с GitHub Pages), затем:

```bash
python bot_example.py
```

**Node.js:**

```bash
npm install node-telegram-bot-api
```

В `bot_example.js` укажите `BOT_TOKEN` и `WEBAPP_URL`, затем:

```bash
node bot_example.js
```

После запуска бот отправит кнопку, по которой откроется ваше приложение.

---

## Полезные ссылки

- [Telegram WebApp (Mini Apps)](https://core.telegram.org/bots/webapps)
- [Kinescope — встраивание плеера](https://docs.kinescope.io/)
- [Kinescope — возможные проблемы и решения](https://docs.kinescope.io/player/v2.172.0/common-problems/)
