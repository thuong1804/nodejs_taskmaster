import connectionMysql from '../config/connectionMysql'
import bcrypt from 'bcryptjs';
import db from '../models/index'
import { emit } from 'nodemon';
const  salt = bcrypt.genSaltSync(10);


const hashUserPassWord = (password) => {
   return bcrypt.hashSync(password, salt);
}

const createNewUser = async (email, username, address, gender, password) => {
    try {
        await db.User.create({
            email: email,
            username: username,
            address: address,
            gender: gender,
            password: password,
        })
    } catch (error) {
        console.log({ error });
        throw error; // Re-throwing the error to handle it in the caller function if needed.
    }

}

const getListUser = async () => {
    try {
        const users = await db.User.findAll({
            attributes: ['id', 'email', 'name', 'address', 'gender', 'groupId'],
            include: {
                model: db.Group,
                attributes: ['name', 'description']
            },
            raw: true,
            nest: true
        });
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
            },
          });
    } catch (error) {
        console.log({ error });
        throw error; // Re-throwing the error to handle it in the caller function if needed.
    }
}

const getProfileUser = async (email) => {
    try {
       const user = await db.User.findOne({
            where: {
              email: email,
            },
            attributes: ['id', 'email', 'name', 'address', 'gender', 'groupId'],
            include: {
                model: db.Group,
                attributes: ['name', 'description']
            },
          });
          return user
    } catch (error) {
        console.log({ error });
        throw error; // Re-throwing the error to handle it in the caller function if needed.
    }
}



const getUserById = async (id) => {
    try {
        const user = await db.User.findOne({
            where: {
                id
            }
        });
        return user;
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const updateUser = async (id, email, name, address, gender, groupId) => {
    try {
        await db.User.update({
            email,
            name,
            groupId,
            address,
            gender
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
    getProfileUser,
}