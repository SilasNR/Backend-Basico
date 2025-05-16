const sql = require('mssql');

async function listarBancos() {
  const config = {
    user: 'silasadmin',
    password: 'Minhasenha123',
    server: 'silasserver.database.windows.net',
    port: 1433,
    options: {
      encrypt: true, // obrigatório para Azure
      trustServerCertificate: false
    }
  };

  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT name FROM sys.databases');
    
    console.log('📚 Bancos disponíveis na instância:');
    result.recordset.forEach(db => console.log('- ' + db.name));
  } catch (err) {
    console.error('Erro ao listar bancos:', err.message);
  } finally {
    sql.close();
  }
}

listarBancos();
