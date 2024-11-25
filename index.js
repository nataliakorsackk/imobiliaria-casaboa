// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db'); // Importa a conexão com o banco de dados
const app = express();
const PORT = 3001;
const bcrypt = require('bcrypt');  // Adicione esta linha para importar o bcrypt
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota inicial
app.get('/', (req, res) => {
    res.send('API de Cadastro funcionando!');
});

// Rota de Login
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    // Consultar o usuário no banco de dados
    db.query('SELECT * FROM cliente WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao acessar o banco de dados' });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'E-mail ou senha inválidos' });
        }

        const usuario = results[0]; // Usuário encontrado no banco

        // Verificar senha
        bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Erro ao verificar a senha' });
            }

            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'E-mail ou senha inválidos' });
            }

            // Gerar o token JWT
            const token = jwt.sign({ id: usuario.id, tipo_usuario: usuario.tipo_usuario }, 'secreto', { expiresIn: '1h' });

            // Retornar resposta com token e tipo_usuario
            return res.json({
                success: true,
                token: token,
                tipo_usuario: usuario.tipo_usuario // Retorna o tipo de usuário (admin ou user)
            });
        });
    });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});