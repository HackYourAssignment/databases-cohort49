import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * read queries from a .sql file in the same directory and execute them
 */
export default async function fileQuery(pool, fileName) {
  try {
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const sqlFilePath = `${currentDir}/${fileName}.sql`;

    const createQuery = await fs.readFile(sqlFilePath, 'utf-8');

    await pool.query(createQuery);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
