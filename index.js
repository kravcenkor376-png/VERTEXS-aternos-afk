const mineflayer = require('mineflayer');
const http = require('http');

// 1. Фейковий веб-сервер для безкоштовного тарифу Render
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Бот активний і працює!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Фейковий веб-сервер запущено на порту ${PORT}`);
});

// 2. Логіка підключення до вашого сервера Aternos
function createBot() {
    const bot = mineflayer.createBot({
        host: 'vartexs.aternos.me',         // Адреса сервера
        port: 24669,                        // Точний порт
        username: 'AFK_Bot_Cloud',          // Нікнейм бота
        version: '1.21.11'                  // Оновлено під вашу версію гри
    });

    bot.on('spawn', () => {
        console.log('Бот успішно зайшов на сервер vartexs.aternos.me!');
        // Анти-AFK рухи (стрибок раз на хвилину)
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 60000);
    });

    bot.on('end', () => {
        console.log('Бот вилетів. Перепідключення за 10 секунд...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('Помилка роботи бота:', err));
}

createBot();
