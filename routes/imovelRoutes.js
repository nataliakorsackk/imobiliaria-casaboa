const express = require('express');
const { verificarToken } = require('../middlewares/authMiddleware');
const {
    cadastrarPropriedade,
    editarPropriedade,
    excluirPropriedade,
    exibirPropriedades
} = require('../controllers/imovelController');

const router = express.Router();

// Rota para cadastrar imóvel (admin)
router.post('/cadastrar-propriedade', verificarToken, (req, res) => {
    if (req.user.tipoUsuario !== 'administrador') {
        return res.status(403).json({ success: false, message: 'Acesso negado.' });
    }
    cadastrarPropriedade(req, res);
});

// Rota para editar imóvel (admin)
router.put('/editar-propriedade', verificarToken, (req, res) => {
    if (req.user.tipoUsuario !== 'administrador') {
        return res.status(403).json({ success: false, message: 'Acesso negado.' });
    }
    editarPropriedade(req, res);
});

// Rota para excluir imóvel (admin)
router.delete('/excluir-propriedade/:id_imovel', verificarToken, (req, res) => {
    if (req.user.tipoUsuario !== 'administrador') {
        return res.status(403).json({ success: false, message: 'Acesso negado.' });
    }
    excluirPropriedade(req, res);
});

// Rota para exibir propriedades (pode ser acessada por qualquer usuário)
router.get('/propriedades', exibirPropriedades);

module.exports = router;
