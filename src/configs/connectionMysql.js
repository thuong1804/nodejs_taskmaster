import mysql2 from 'mysql2/promise';
import bluebird from 'bluebird'
module.exports = async function () {
    //Establish Connection to the DB
    try {
        // Establish Connection to the DB
        const connection = await mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'jwt',
            Promise: bluebird
        });

        // Instantiate the connection
        await connection.connect();

        console.log(`DB connectionRequest Successful ${connection.threadId}`);
        return connection;
    } catch (err) {
        console.error(`DB connectionRequest Failed: ${err.stack}`);
        throw err; // Rethrow the error to be caught by the caller
    }
}