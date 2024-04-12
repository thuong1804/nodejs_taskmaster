import db from '../models/index'
const { Op } = require("sequelize");

const getListTask = async (userId, groupId) => {
    try {
        if (groupId === 1) {
            const tasks = await db.Task.findAll({
                raw: true,
                nest: true,
                include: {
                    model: db.User,
                    attributes: ['id', 'email', 'name']
                },
            });
            return tasks
        } else {
            const tasks = await db.Task.findAll({
                where: {
                    userId: userId
                },
                raw: true,
                nest: true,
                include: {
                    model: db.User,
                    attributes: ['id', 'email', 'name']
                },
            });
            return tasks
        }
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const getListTaskWithPagination = async (userId, groupId, page, size) => {
    try {
        let whereCondition = {};

        if (groupId !== 1) {
            whereCondition.userId = userId;
        }

        const { count, rows } = await db.Task.findAndCountAll({
            offset: (page - 1) * size,
            limit: size,
            raw: true,
            nest: true,
            include: {
                model: db.User,
                attributes: ['id', 'email', 'name']
            },
            where: whereCondition,
        });

        const totalPages = Math.ceil(count / size);

        return {
            totalRows: count,
            totalPages: totalPages,
            content: rows,
        };

    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const createTask = async (
    userId,
    taskTitle,
    taskDescription,
    scheduledDate,
    completedDate,
    reporter
) => {
    try {
        await db.Task.create({
            userId: userId,
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            scheduledDate: scheduledDate,
            completedDate: completedDate,
            reporter: reporter,
        })
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const updateTask = async (
    id,
    userId,
    taskTitle,
    taskDescription,
    scheduledDate,
    completedDate,
    reporter
) => {
    try {
        await db.Task.update({
            userId: userId,
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            scheduledDate: scheduledDate,
            completedDate: completedDate,
            reporter: reporter
        }, {
            where: {
                id: id,
            }
        })
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const deleteTask = async (id) => {
    try {
        await db.Task.destroy({
            where: {
                id: id
            }
        })
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const getTaskById = async (id) => {
    try {
        const tasks = await db.Task.findOne({
            where: {
                id: id
            },
        });
        return tasks
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const searchTask = async (query) => {
    try {
        const tasks = await db.Task.findAll({
            where: {
                [Op.or]: [
                    {
                        taskTitle: {
                            [Op.like]: `%${query.taskTitle}%`
                        }
                    },
                    // {
                    //     reporter: parseInt(query.reporter || null)
                    // }
                ]
            }
        });
        return tasks
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const taskInProgress = async(id, isInProgress) => {
    try {
        const tasks = await db.Task.update({
            isInProgress: isInProgress,
        }, {
            where: {
                id: {
                    [Op.in]: id
                }
            }
        });
        return tasks
    } catch (error) {
        console.log({error})
        throw error;
    }
}

const taskCompleted = async(id, isCompleted) => {
    try {
        const tasks = await db.Task.update({
            isCompleted: isCompleted
        }, {
            where: {
                id: {
                    [Op.in]: id
                }
            }
        });
        return tasks
    } catch (error) {
        console.log({error})
        throw error;
    }
}

module.exports= {
    getListTask,
    createTask,
    deleteTask,
    updateTask,
    getListTaskWithPagination,
    getTaskById,
    searchTask,
    taskCompleted,
    taskInProgress,
}