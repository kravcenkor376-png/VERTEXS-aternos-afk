const mineflayer = require('mineflayer');
const http = require('http');

// 1. Створюємо фейковий вебсайт для обходу обмежень Render
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Бот активний і працює!');
});

// Render автоматично дає порт у змінну оточення, або використовуємо 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Фейковий веб-сервер запущено на порту ${PORT}`);
});

// 2. Основна логіка самого бота Minecraft
function createBot() {
    const bot = mineflayer.createBot({
        host: 'IP_ВАШОГО_СЕРВЕРА.aternos.me', 
        port: 25565,                         
        username: 'AFK_Bot_Cloud',                 
        version: '1.20.1' // Вкажіть вашу версію                     
    });

    bot.on('spawn', () => {
        console.log('Бот у хмарі успішно зайшов на сервер!');
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 60000);
    });

    bot.on('end', () => {
        console.log('Бот вилетів. Перепідключення за 10 секунд...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('Помилка бота:', err));
}

createBot();
