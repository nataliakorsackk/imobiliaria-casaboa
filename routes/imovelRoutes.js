const express = require('express');
const router = express.Router();
const { Imovel } = require('../models/imovelModels');

// Cadastrar imóvel
router.post('/cadastrar', async (req, res) => {
    try {
        const { endereco, descricao, num_comodos, data_nascimento } = req.body;
        const id_cliente = req.user ? req.user.id : 1; // Substituir com autenticação real

        const novoImovel = await Imovel.create({ endereco, descricao, num_de_comodos: num_comodos, data_nascimento, id_cliente });
        res.status(201).json({ message: 'Imóvel cadastrado com sucesso!', imovel: novoImovel });
    } catch (error) {
        console.error('Erro ao cadastrar imóvel:', error);
        res.status(500).json({ message: 'Erro ao cadastrar imóvel' });
    }
});

// Listar imóveis
router.get('/', async (req, res) => {
    try {
        const imoveis = await Imovel.findAll();
        res.json({ imoveis });
    } catch (error) {
        console.error('Erro ao listar imóveis:', error);
        res.status(500).json({ message: 'Erro ao listar imóveis' });
    }
});

// Editar imóvel
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { endereco, descricao, num_comodos, data_nascimento } = req.body;
        const id_cliente = req.user.id;

        const updated = await Imovel.update(
            { endereco, descricao, num_de_comodos: num_comodos, data_nascimento },
            { where: { id_imovel: id, id_cliente } }
        );

        if (updated) {
            res.status(200).json({ message: 'Imóvel atualizado com sucesso!' });
        } else {
            res.status(403).json({ message: 'Você não tem permissão para editar este imóvel.' });
        }
    } catch (error) {
        console.error('Erro ao editar imóvel:', error);
        res.status(500).json({ message: 'Erro ao editar imóvel' });
    }
});

// Excluir imóvel
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const id_cliente = req.user.id;

        const deleted = await Imovel.destroy({ where: { id_imovel: id, id_cliente } });
        if (deleted) {
            res.status(200).json({ message: 'Imóvel excluído com sucesso!' });
        } else {
            res.status(403).json({ message: 'Você não tem permissão para excluir este imóvel.' });
        }
    } catch (error) {
        console.error('Erro ao excluir imóvel:', error);
        res.status(500).json({ message: 'Erro ao excluir imóvel' });
    }
});

module.exports = router;
