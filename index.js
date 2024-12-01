// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const imovelRoutes = require('./routes/imovelRoutes'); // Importando as rotas de imóveis
const db = require('./config/db'); // Conexão com o banco de dados

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota inicial
app.get('/', (req, res) => {
    res.send('API de Cadastro e Login funcionando!');
});

// Usar as rotas do arquivo userRoutes.js
app.use('/api', userRoutes);

// Usar as rotas de imóveis
app.use('/api/imoveis', imovelRoutes);

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
