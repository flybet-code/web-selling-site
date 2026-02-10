const { Client } = require('pg');

async function testConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'betsegawnegn',
    database: 'sell_db'
  });

  try {
    await client.connect();
    console.log('✅ Successfully connected to PostgreSQL');
    
    const result = await client.query('SELECT version()');
    console.log('PostgreSQL version:', result.rows[0].version);
    
    const dbResult = await client.query('SELECT current_database()');
    console.log('Connected to database:', dbResult.rows[0].current_database);
    
    await client.end();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error details:', error);
  }
}

testConnection();