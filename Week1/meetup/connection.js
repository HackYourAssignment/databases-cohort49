import mysql from 'mysql2/promise';

const createConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'meetup'
    });
};

export { createConnection };  

