
import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
});

db.raw('SELECT 1')
  .then(() => {
    console.log('MySQL connected');
  })
  .catch((error) => {
    console.error('Error connecting to MySQL:', error);
  });

export default db;