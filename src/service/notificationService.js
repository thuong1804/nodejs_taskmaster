import dayjs from 'dayjs';
import db from '../models/index'
import { typeValue } from '../constants';

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

const creatNotification = async (type, userId, reporter) => {
    const currentDay = dayjs(new Date())
    try {
        switch (type) {
            case typeValue.CREATE_TASK: {
                const notification = await db.Notification.create({
                    userId: userId,
                    name: 'You have been assigned a new task from',
                    date: currentDay,
                    createBy: reporter,
                });
                return notification;
            }
            case typeValue.CHANGE_PASSWORD: {
                const notification = await db.Notification.create({
                    userId: userId,
                    notificationId: 2,
                });
                return notification;
            }
            case typeValue.CREATE_USER: {
                const notification = await db.Notification.create({
                    userId: userId,
                    date: currentDay,
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

module.exports = {
    getNotification,
    creatNotification,
}