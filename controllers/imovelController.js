// controllers/imovelController.js
const db = require('../config/db');

// Função para cadastrar imóvel
const cadastrarImovel = (req, res) => {
    const { endereco, descricao, num_comodos } = req.body;
    const query = 'INSERT INTO imoveis (endereco, descricao, num_comodos) VALUES (?, ?, ?)';
    db.query(query, [endereco, descricao, num_comodos], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar imóvel:', err);
            return res.status(500).json({ message: 'Erro ao cadastrar imóvel' });
        }
        res.status(201).json({ message: 'Imóvel cadastrado com sucesso!' });
    });
};

// Função para editar imóvel
const editarImovel = (req, res) => {
    const { id } = req.params;
    const { endereco, descricao, num_comodos } = req.body;
    const query = 'UPDATE imoveis SET endereco = ?, descricao = ?, num_comodos = ? WHERE id = ?';
    db.query(query, [endereco, descricao, num_comodos, id], (err, result) => {
        if (err) {
            console.error('Erro ao editar imóvel:', err);
            return res.status(500).json({ message: 'Erro ao editar imóvel' });
        }
        res.status(200).json({ message: 'Imóvel atualizado com sucesso!' });
    });
};

// Função para excluir imóvel
const excluirImovel = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM imoveis WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir imóvel:', err);
            return res.status(500).json({ message: 'Erro ao excluir imóvel' });
        }
        res.status(200).json({ message: 'Imóvel excluído com sucesso!' });
    });
};

module.exports = { cadastrarImovel, editarImovel, excluirImovel };
