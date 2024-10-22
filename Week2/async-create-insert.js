const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

// Promisify the bind function of query function of connection object
// Pass connection object (because bind expects "this")
// Afterwards execQuery will work as a function that returns a promise but
// we don't have to call "then" over that promise
const execQuery = util.promisify(connection.query.bind(connection));

/**
 * Asynchronously seeds the database by creating the necessary tables and inserting initial data.
 *
 * This function performs the following steps:
 * 1. Connects to the database.
 * 2. Creates the `students` and `teachers` tables if they do not already exist.
 * 3. Inserts initial student data into the `students` table.
 * 4. Handles any errors that occur during the process.
 * 5. Closes the database connection.
 *
 * @async
 * @function seedDatabase
 * @returns {Promise<void>} A promise that resolves when the database has been seeded.
 */
async function seedDatabase() {
  const CREATE_STUDENTS_TABLE = `
    CREATE TABLE IF NOT EXISTS students (
      student_number INT,
      student_name VARCHAR(50),
      date_of_birth DATE,
      grade FLOAT,
      gender ENUM('m', 'f')
    );`;
  const CREATE_TEACHERS_TABLE = `
    CREATE TABLE IF NOT EXISTS teachers (
      teacher_number INT,
      teacher_name VARCHAR(50),
      date_of_birth DATE,
      subject TEXT,
      gender ENUM('m', 'f')
    );`;
  const students = [
    {
      student_number: 4444,
      student_name: 'Benno',
      date_of_birth: '1995-04-26',
      grade: 8.3,
      gender: 'm',
    },
    {
      student_number: 3333,
      student_name: 'Henriata',
      date_of_birth: '1998-05-12',
      grade: 8.5,
      gender: 'm',
    },
  ];

  connection.connect();

  try {
    // call the function that returns promise
    await execQuery(CREATE_STUDENTS_TABLE);
    await execQuery(CREATE_TEACHERS_TABLE);
    students.forEach(async student => {
      await execQuery('INSERT INTO students SET ?', student);
    });
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

seedDatabase();
