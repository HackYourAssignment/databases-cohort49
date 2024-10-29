const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "madatabase",
});

const connectToDatabase = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                reject("Error connecting to the database: " + err.stack);
            } else {
                console.log("Connected to the database");
                resolve();
            }
        });
    });
};

const queryDatabase = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const endConnection = () => {
    return new Promise((resolve, reject) => {
        connection.end((err) => {
            if (err) {
                reject("Error ending the connection: " + err);
            } else {
                console.log("Connection ended.");
                resolve();
            }
        });
    });
};

const createTables = async () => {
    try {
        await connectToDatabase();

        const createAccountTable = `
            CREATE TABLE IF NOT EXISTS account (
                account_number INT AUTO_INCREMENT PRIMARY KEY,
                balance DECIMAL(15, 2) NOT NULL
            );
        `;

        const createAccountChangesTable = `
            CREATE TABLE IF NOT EXISTS account_changes (
                change_number INT AUTO_INCREMENT PRIMARY KEY,
                account_number INT NOT NULL,
                amount DECIMAL(15, 2) NOT NULL,
                changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                remark TEXT,
                FOREIGN KEY (account_number) REFERENCES account(account_number)
            );
        `;

        await queryDatabase(createAccountTable);
        console.log("Account table created successfully");

        await queryDatabase(createAccountChangesTable);
        console.log("Account_changes table created successfully");

    } catch (err) {
        console.error(err);
    } finally {
        await endConnection();
    }
};

createTables();
