// routes/userRoutes.js

const express = require('express');
const { cadastrarUsuario, loginUsuario, verificarToken } = require('../controllers/userController');

const router = express.Router();

// Rota para cadastro de usuário
router.post('/cadastro', cadastrarUsuario);

// Rota de login
router.post('/login', loginUsuario);

// Rota protegida
router.get('/perfil', verificarToken, (req, res) => {
    res.json({ success: true, message: 'Acesso autorizado ao perfil!', user: req.user });
});

module.exports = router;
