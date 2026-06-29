const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'IP_ВАШОГО_СЕРВЕРА.aternos.me', 
        port: 25565,                         
        username: 'AFK_Bot_Cloud',                 
        version: '1.20.1'                    
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

    bot.on('error', (err) => console.log('Помилка роботи бота:', err));
}

createBot();
