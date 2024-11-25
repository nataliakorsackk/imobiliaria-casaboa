// controllers/userController.js
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Importa a conexão com o banco
const secretKey = 'seu-segredo'; // Defina uma chave secreta para o JWT



const cadastrarUsuario = (req, res) => {
    const { nome, email, senha, telefone, tipoUsuario } = req.body;

    // Criptografando a senha antes de salvar no banco
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao criptografar a senha.' });
        }

        const query = 'INSERT INTO cliente (nome, email, senha, telefone, tipo_usuario) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [nome, email, hashedPassword, telefone, tipoUsuario], (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Erro no cadastro.' });
            }
            return res.status(201).json({ success: true, message: 'Cadastro realizado com sucesso!' });
        });
    });
};

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Token de autenticação ausente.' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Salva as informações do usuário no request
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token inválido.' });
    }
};

const bcrypt = require('bcryptjs');

const loginUsuario = (req, res) => {
    const { email, senha } = req.body;

    const query = 'SELECT * FROM cliente WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor.' });
        }

        if (result.length > 0) {
            // Verificando a senha usando bcrypt
            bcrypt.compare(senha, result[0].senha, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Erro ao comparar a senha.' });
                }

                if (isMatch) {
                    const token = jwt.sign({ id: result[0].id_cliente, email: result[0].email }, secretKey, { expiresIn: '1h' });
                    return res.json({ success: true, message: 'Login bem-sucedido!', token });
                } else {
                    return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
                }
            });
        } else {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
        }
    });
};


module.exports = { cadastrarUsuario, loginUsuario, verificarToken };
