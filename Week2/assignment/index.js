import fs from 'fs/promises';
import mysql from 'mysql2/promise';
import populateDB from './populate_db.js';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
});

async function main() {
  //extract sql queries from files
  const readQueries = (fileNames) =>
    Promise.all(
      fileNames.map((fileName) =>
        fs.readFile(`./queries/${fileName}.sql`, 'utf-8'),
      ),
    );

  const [createDB, createAuthors, createPapers, queryJoins, queryAggregates] =
    await readQueries([
      'ex0_create_db',
      'ex1_authors',
      'ex2_papers',
      'ex3_join',
      'ex4_funcs',
    ]);

  //create the database and use it in subsequent pool connections
  await pool.query(createDB);
  pool.on('connection', (connection) => connection.query('USE academic_db'));

  //create the tables and populate them
  await pool.query(createAuthors + createPapers);
  await populateDB();

  //run the queries concurrently
  let results = await Promise.all([
    pool.query(queryJoins),
    pool.query(queryAggregates),
  ]);

  results = [results[0][0], results[1][0]];

  await fs.writeFile(
    './results_&_dummyData/results.json',
    JSON.stringify(results, null, 2),
  );
}

main()
  .catch(console.error)
  .finally(() => pool.end());
