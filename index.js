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

// Usar as rotas de usuários
app.use('/api', userRoutes);

// Usar as rotas de imóveis
app.use('/api/imoveis', imovelRoutes);

app.get('/api/imoveis', async (req, res) => {
    try {
        const imoveis = await db.query('SELECT * FROM imovel');
        console.log(imoveis); // Verifique se a consulta retorna os imóveis corretamente
        res.status(200).json({ imoveis });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao carregar imóveis' });
    }
});




// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});