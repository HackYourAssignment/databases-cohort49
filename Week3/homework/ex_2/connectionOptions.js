const serverConnection = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
};

const databaseConnection = {
  ...serverConnection,
  database: 'account_db',
};

export { serverConnection, databaseConnection };
