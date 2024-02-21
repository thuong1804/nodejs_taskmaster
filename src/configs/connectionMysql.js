import mysql2 from 'mysql2';

module.exports = function () {
    //Establish Connection to the DB
    const connection = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt'
    });

    //Instantiate the connection
    connection.connect(function (err) {
        if (err) {
            console.log(`connectionRequest Failed ${err.stack}`)
        } else {
            console.log(`DB connectionRequest Successful ${connection.threadId}`)
        }
    });

    return connection
}