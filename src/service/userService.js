import connectionMysql from '../configs/connectionMysql'
import bcrypt from 'bcryptjs';
const  salt = bcrypt.genSaltSync(10);
const connection = connectionMysql();


const hashUserPassWord = (password) => {
   return bcrypt.hashSync(password, salt);
}

const createNewUser = (email, name, password) => {
    let hashPassWord = hashUserPassWord(password);
    connection.query('INSERT INTO `users`(email, name, password) VALUES (?,?,?)', [email, name, hashPassWord],
    function (error, results, fields) {
        if (error) {
            console.log({ error })
        }
    });
}

module.exports = {
    createNewUser
}