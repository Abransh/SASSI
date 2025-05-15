const { Client } = require('pg');
const fs = require('fs');

// Read SQL file
const sql = fs.readFileSync('data.sql', 'utf8');

// Connect to Supabase (use the verified connection string)
const client = new Client({
  host: 'db.njepuedyhcwopzluitbo.supabase.co', // UPDATED: Use the correct format
  port: 5432,
  database: 'postgres',
  user: 'postgres.njepuedyhcwopzluitbo', // Double-check this
  password: 'Abranshis@2807',
  ssl: { rejectUnauthorized: false }
});

async function importData() {
  try {
    await client.connect();
    console.log('Connected to Supabase');
    
    // Execute the SQL
    console.log('Importing data...');
    await client.query(sql);
    
    console.log('Data import completed successfully');
  } catch (err) {
    console.error('Error importing data:', err);
  } finally {
    await client.end();
  }
}

importData();