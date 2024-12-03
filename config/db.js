
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',     
    password: '1407vitoria',    
    database: 'imobiliaria' 
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        return;
    }
    console.log('Conexão com o MySQL estabelecida!');
});

module.exports = db;