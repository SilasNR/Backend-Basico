const mysql = require('mysql2/promise');

async function listarBancos() {
  const connection = await mysql.createConnection({
    host: 'bancoteste.ct886ggck7q0.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'a4s5d6f1',
    port: 3306
  });

  try {
    const [rows] = await connection.query('SHOW DATABASES;');
    console.log('📚 Bancos disponíveis na instância:');
    rows.forEach(row => console.log('- ' + row.Database));
  } catch (err) {
    console.error('Erro ao listar bancos:', err.message);
  } finally {
    await connection.end();
  }
}

listarBancos();
