const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Мидлвары
app.use(cors()); // Разрешить CORS
app.use(bodyParser.json()); // Парсинг JSON

// Обработка POST-запроса на "/results"
app.post('/results', (req, res) => {
    const { name, score } = req.body;

    if (!name || score === undefined) {
        return res.status(400).json({ message: 'Некорректные данные' });
    }

    console.log(`Имя: ${name}, Счёт: ${score}`);
    // Здесь вы можете добавить логику для сохранения данных в базу данных или обработки результатов

    // Отправить ответ обратно клиенту
    res.status(200).json({ message: 'Результат получен', data: req.body });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
