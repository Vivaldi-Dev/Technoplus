const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

// Configuração do CORS deve ser antes de qualquer rota
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

const router = require('./routes/routes');

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'server is running'
    });
});

app.use('/api', router);

const PORT = process.env.APP_PORT || 5000;

app.use('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});
