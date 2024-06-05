import db from '../models/index'
import { Op } from 'sequelize';
import { hashUserPassWord } from '../utils';

const createNewUser = async (
    email, 
    name, 
    address, 
    gender, 
    password, 
    groupId, 
    phone, 
    birthDay
) => {
    try {
        await db.User.create({
            email: email,
            name: name,
            address: address,
            gender: gender,
            password: hashUserPassWord(password),
            groupId: groupId,
            phone: phone,
            birthDay: birthDay,
        })
    } catch (error) {
        console.log({ error });
        throw error;
    }

}

const getListUser = async (email, gender, groupId) => {
    try {
        let whereCondition = {};
        const additionalConditions = [];

        if (email) {
            additionalConditions.push({
                email: {
                    [Op.like]: `%${email}%`
                }
            });
        }
        if (gender) {
            additionalConditions.push({
                gender: {
                    [Op.eq]: parseInt(gender)
                }
            });
        }

        if (groupId) {
            additionalConditions.push({
                groupId: {
                    [Op.eq]: parseInt(groupId)
                }
            });
        }

        if (additionalConditions.length > 0) {
            whereCondition = {
                [Op.and]: [
                    whereCondition,
                    ...additionalConditions
                ]
            };
        }
        
        const users = await db.User.findAll({
            attributes: ['id', 'email', 'name', 'address', 'gender', 'groupId', 'phone', 'birthDay', 'avatar'],
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
        throw error;
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
        throw error;
    }
}

const getProfileUser = async (email) => {
    try {
        const user = await db.User.findOne({
            where: {
                email: email,
            },
            attributes: ['id', 'email', 'name', 'address', 'gender', 'groupId', 'avatar', 'phone', 'birthDay'],
            include: {
                model: db.Group,
                attributes: ['name', 'description']
            },
        });
        return user
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const updateAvatar = async (id, avatar) => {
    try {
        await db.User.update({
            avatar,
        }, {
            where: {
                id,
            }
        });
    } catch (error) {
        console.log({ error });
        throw error;
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

const updateUser = async (id, email, name, address, gender, groupId, phone, birthDay) => {
    try {
        await db.User.update({
            email,
            name,
            groupId,
            address,
            gender,
            phone,
            birthDay,
        }, {
            where: {
                id: id
            }
        });
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const updateProfile = async (
    id, 
    email, 
    name, 
    address, 
    gender, 
    phone, 
    birthDay, 
    avatar, 
    groupId,
) => {
    try {
        await db.User.update({
            email,
            name,
            address,
            gender,
            phone,
            birthDay,
            avatar,
            groupId,
        }, {
            where: {
                id: id
            }
        });
    } catch (error) {
        console.log({ error });
        throw error;
    }
}
module.exports = {
    createNewUser,
    getListUser,
    deleteUser,
    updateUser,
    getUserById,
    getProfileUser,
    updateAvatar,
    updateProfile,
}