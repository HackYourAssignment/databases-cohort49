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

const insertData = async () => {
    try {
        await connectToDatabase();

        const insertAccountData = `
            INSERT INTO account (balance) VALUES 
            (1000.00),
            (1500.50),
            (2000.75);
        `;

        const insertAccountChangesData = `
            INSERT INTO account_changes (account_number, amount, remark) VALUES 
            (1, 500.00, 'Initial deposit'),
            (2, 1500.50, 'Initial deposit'),
            (3, 2000.75, 'Initial deposit'),
            (1, -200.00, 'ATM withdrawal'),
            (2, 300.00, 'Salary deposit');
        `;

        await queryDatabase(insertAccountData);
        console.log("Data inserted into account table successfully");

        await queryDatabase(insertAccountChangesData);
        console.log("Data inserted into account_changes table successfully");

    } catch (err) {
        console.error(err);
    } finally {
        await endConnection();
    }
};

insertData();