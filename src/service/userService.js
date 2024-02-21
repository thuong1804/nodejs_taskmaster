import connectionMysql from '../configs/connectionMysql'
import bcrypt from 'bcryptjs';
const  salt = bcrypt.genSaltSync(10);


const hashUserPassWord = (password) => {
   return bcrypt.hashSync(password, salt);
}

const createNewUser = async (email, name, password) => {
    try {
        let hashPassWord = hashUserPassWord(password);
        const connection = await connectionMysql();
        const [row, fields]  = await connection.execute('INSERT INTO `users`(email, name, password) VALUES (?,?,?)', [email, name, hashPassWord])
        return row
    } catch (error) {
        console.log({ error });
        throw error; // Re-throwing the error to handle it in the caller function if needed.
    }

}

const getListUser = async () => {
    try {
        const connection = await connectionMysql();
        const [row, fields] = await connection.execute('SELECT * FROM `users`');
        return row;
    } catch (error) {
        console.log({ error });
        throw error; // Re-throwing the error to handle it in the caller function if needed.
    }
}

const deleteUser = async (id) => {
    try {
        const connection = await connectionMysql();
        const [row, fields] = await connection.execute('DELETE FROM `users` WHERE id=?',[id]);
        return row;
    } catch (error) {
        console.log({ error });
        throw error; // Re-throwing the error to handle it in the caller function if needed.
    }
}



const getUserById = async (id) => {
    try {
        const connection = await connectionMysql();
        const [row, fields] = await connection.execute('SELECT * FROM `users` WHERE id=?',[id]);
        return row;
    } catch (error) {
        console.log({ error });
        throw error; // Re-throwing the error to handle it in the caller function if needed.
    }
}

const updateUser = async (id, email, name) => {
    try {
        const connection = await connectionMysql();
        const [row, fields] = await connection.execute('UPDATE `users` SET `email`=?, `name`=? WHERE id=?',[email, name, id]);
        return row;
    } catch (error) {
        console.log({ error });
        throw error; // Re-throwing the error to handle it in the caller function if needed.
    }
}
module.exports = {
    createNewUser,
    getListUser,
    deleteUser,
    updateUser,
    getUserById,
}