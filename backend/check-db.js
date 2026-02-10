const { Client } = require('pg');

async function checkDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'betsegawnegn',
    database: 'sell_db'
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');
    
    // Check tables
    const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables in database:', tables.rows);
    
    // Check users table structure if it exists
    if (tables.rows.some(row => row.table_name === 'users')) {
      const columns = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users' AND table_schema = 'public'");
      console.log('Users table columns:', columns.rows);
    } else {
      console.log('Users table does not exist');
    }
    
    await client.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkDatabase();