const db = require('../config/db');

// Função para cadastrar imóvel
const cadastrarPropriedade = (req, res) => {
    const { endereco, descricao, num_de_comodos } = req.body;

    if (!endereco || !descricao || !num_de_comodos) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }

    // Query para inserir o imóvel no banco
    const query = 'INSERT INTO imovel (endereco, descricao, num_de_comodos) VALUES (?, ?, ?)';
    db.query(query, [endereco, descricao, num_de_comodos], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar imóvel:', err);
            return res.status(500).json({ error: 'Erro ao cadastrar imóvel' });
        }

        res.status(201).json({ message: 'Imóvel cadastrado com sucesso', id_imovel: result.insertId });
    });
};

// Função para editar imóvel
const editarPropriedade = (req, res) => {
    const { id_imovel, endereco, descricao, num_de_comodos } = req.body;

    if (!id_imovel) {
        return res.status(400).json({ success: false, message: 'ID do imóvel é obrigatório.' });
    }

    const query = 'UPDATE imovel SET endereco = ?, descricao = ?, num_de_comodos = ? WHERE id_imovel = ?';
    db.query(query, [endereco, descricao, num_de_comodos, id_imovel], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao editar imóvel.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Imóvel não encontrado.' });
        }
        return res.status(200).json({ success: true, message: 'Imóvel atualizado com sucesso!' });
    });
};

// Função para excluir imóvel
const excluirPropriedade = (req, res) => {
    const { id_imovel } = req.params;

    if (!id_imovel) {
        return res.status(400).json({ success: false, message: 'ID do imóvel é obrigatório.' });
    }

    const query = 'DELETE FROM imovel WHERE id_imovel = ?';
    db.query(query, [id_imovel], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao excluir imóvel.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Imóvel não encontrado.' });
        }
        return res.status(200).json({ success: true, message: 'Imóvel excluído com sucesso!' });
    });
};

// Função para exibir imóveis
const exibirPropriedades = (req, res) => {
    const query = 'SELECT * FROM imovel'; // Exibe todos os imóveis
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao exibir imóveis.' });
        }
        return res.status(200).json({ success: true, data: result });
    });
};

module.exports = {
    cadastrarPropriedade,
    editarPropriedade,
    excluirPropriedade,
    exibirPropriedades
};
