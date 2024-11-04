import mysql from 'mysql2/promise';
import { databaseConnection } from './connectionOptions.js';
import fileQuery from './fileQuery.js';

export const pool = mysql.createPool(databaseConnection);

await fileQuery(pool, 'transactions_insert_values');
