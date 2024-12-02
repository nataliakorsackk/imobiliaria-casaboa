// routes/imovelRoutes.js
const express = require('express');
const router = express.Router();
const { Imovel } = require('../models/imovelModels'); // Certifique-se de que o modelo está correto

// Rota para cadastrar imóvel
router.post('/cadastrar', async (req, res) => {
    try {
        const { endereco, descricao, num_comodos } = req.body;

        // Validação dos campos
        if (!endereco || !descricao || !num_comodos) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        }

        // Salvando no banco de dados
        const novoImovel = await Imovel.create({
            endereco,
            descricao,
            num_comodos,
        });

        res.status(201).json({ message: 'Imóvel cadastrado com sucesso!', imovel: novoImovel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar imóvel', error });
    }
});

module.exports = router;
