import bcrypt from 'bcryptjs';
import db from '../models/index'
import { Op, where } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

const createNewUser = async (email, name, address, gender, password, groupId) => {
    try {
        await db.User.create({
            email: email,
            name: name,
            address: address,
            gender: gender,
            password: password,
            groupId: groupId,
        })
    } catch (error) {
        console.log({ error });
        throw error; // Re-throwing the error to handle it in the caller function if needed.
    }

}

const getListUser = async (email) => {
    try {
        let whereCondition = {};
        if (email) {
            whereCondition = {
                [Op.or]: []
            };
            whereCondition[Op.or].push({
                email: {
                    [Op.like]: `%${email}%`
                }
            });
        }
        const users = await db.User.findAll({
            attributes: ['id', 'email', 'name', 'address', 'gender', 'groupId'],
            include: {
                model: db.Group,
                attributes: ['name', 'description']
            },
            raw: true,
            nest: true,
            where: whereCondition
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