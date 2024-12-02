

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', // Substitua pelo host do seu banco
    user: 'root',      // Substitua pelo seu usuário MySQL
    password: '1407vitoria',      // Substitua pela sua senha MySQL
    database: 'imobiliaria' // Nome do banco de dados
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        return;
    }
    console.log('Conexão com o MySQL estabelecida!');
});

module.exports = db;