import mysql from 'mysql2/promise';
import { serverConnection } from './connectionOptions.js';
import fileQuery from './fileQuery.js';

export const pool = mysql.createPool(serverConnection);

fileQuery(pool, 'transactions_create_tables');
