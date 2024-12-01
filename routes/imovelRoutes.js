const express = require('express');
const router = express.Router();
const { verificarToken } = require('../controllers/authController'); // Importa o middleware de verificação de token
const { cadastrarImovel, editarImovel, excluirImovel } = require('../controllers/imovelController');

// Rota para cadastrar imóvel
router.post('/cadastrar', verificarToken, cadastrarImovel);

// Rota para editar imóvel
router.put('/editar/:id', verificarToken, editarImovel);

// Rota para excluir imóvel
router.delete('/excluir/:id', verificarToken, excluirImovel);

module.exports = router;
