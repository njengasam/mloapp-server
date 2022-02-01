import knex from 'knex';
import 'dotenv/config';

export const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL
    }
});