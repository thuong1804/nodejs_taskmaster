import connectionMysql from '../config/connectionMysql'
import bcrypt from 'bcryptjs';
import db from '../models/index'
const  salt = bcrypt.genSaltSync(10);


const hashUserPassWord = (password) => {
   return bcrypt.hashSync(password, salt);
}

const createNewUser = async (email, username, password) => {
    try {
        let hashPassWord = hashUserPassWord(password);
        await db.User.create({
            email: email,
            username: username,
            password: hashPassWord,
        })
    } catch (error) {
        console.log({ error });
        throw error; // Re-throwing the error to handle it in the caller function if needed.
    }

}

const getListUser = async () => {
    try {
        const users = await db.User.findAll();
        return users
    } catch (error) {
        console.log({ error });
        throw error; // Re-throwing the error to handle it in the caller function if needed.
    }
}

const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: {
              id: id,
            }
          });
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

const updateUser = async (id, email, username) => {
    try {
        await db.User.update({
            email: email,
            username: username,
        }, {
            where: {
                id: id
            }
        });
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