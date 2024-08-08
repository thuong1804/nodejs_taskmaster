import dayjs from 'dayjs';
import db from '../models/index'
import { DATETIME_FORMAT_DISPLAY, typeValue } from '../constants';
import { Op, where } from 'sequelize';

const getNotification = async (userId) => {
    try {
        const notification = await db.Notification.findAll({
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'email', 'name',]
                },

            ],
            raw: true,
            nest: true,
            where: {
                userId: userId,
            },

        });
        return notification
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const creatNotification = async (type, userId, reporter, owner, taskTitle) => {
    const currentDay = dayjs(new Date())
    try {
        switch (type) {
            case typeValue.CREATE_TASK: {
                const userReporter = await db.User.findOne({
                    where: {
                        id: reporter,
                    }
                })

                const notification = await db.Notification.create({
                    userId: owner,
                    name: `You have been assigned a new task`,
                    description: `You have been assigned a new task from ${userReporter.name}`,
                    date: currentDay,
                    createBy: reporter,
                    link: 'tasks'
                });
                return notification;
            }
            case typeValue.CHANGE_PASSWORD: {
                const notification = await db.Notification.create({
                    userId: userId,
                    name: 'You have changed your new password',
                    description: `You have changed your new password at ${dayjs(currentDay).format(DATETIME_FORMAT_DISPLAY)}`,
                    date: currentDay,
                });
                return notification;
            }
            case typeValue.CREATE_USER: {
                const notification = await db.Notification.create({
                    name: `Welcome to task master`,
                    description: `You created your account at ${dayjs(currentDay).format(DATETIME_FORMAT_DISPLAY)}`,
                    userId: userId,
                    date: currentDay,
                });
                return notification;
            }
            case typeValue.DEAD_LINE: {
                const notification = await db.Notification.create({
                    name: `Task is due soon`,
                    description: `Task ${taskTitle} is about to expire`,
                    userId: userId,
                    date: currentDay,
                    link: 'tasks'
                });
                return notification;
            }
            default:
                throw new Error('Invalid type');
        }
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const readOne = async (id) => {
    try {
        await db.Notification.update({
            seen: true,
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

const readAll = async (userId) => {
    try {
        await db.Notification.update({
            seen: true,
        }, {
            where: {
                userId: {
                    [Op.in]: userId
                }
            }
        });
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

module.exports = {
    getNotification,
    creatNotification,
    readOne,
    readAll,
}