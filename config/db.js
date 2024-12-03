
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'dpg-ct7718d2ng1s73caq900-a', 
    user: 'imobiliaria_ks6m_user',     
    password: 'Oym2VxUexifovpDPAXYyJ7S67TdbFYwL',    
    database: 'imobiliaria_ks6m',
    port: 5432
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        return;
    }
    console.log('Conexão com o MySQL estabelecida!');
});

module.exports = db;