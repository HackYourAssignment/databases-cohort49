 import mysql from 'mysql2/promise';


async function initializeConnection() {
    const connection = await mysql.createConnection({ 
        host: 'localhost', 
        user: 'hyfuser', 
        password: 'hyfpassword',
        database: 'new_world' 
    });
    return connection;
}

function getPopulation(connection, Country, name, code) {
    const query = `SELECT Population FROM ?? WHERE Name = ? AND code = ?`;
    return connection.query(query,  [Country, name, code])
        .then(result => {
            if (result[0].length === 0) {
                throw new Error("Not found");
            }
            
            return result[0][0].Population;
        })
        .catch(err => {
            throw err; 
        });
}

async function main() {
    const connection = await initializeConnection();

    try {
        const population = await getPopulation(connection, 'country', `Netherlands`, 'NLD'); 
        
        console.log(population);
    } catch (err) {
        console.error(err);
    } finally {
        await connection.end();
    }
}

main().catch(e => { console.error(e) });
