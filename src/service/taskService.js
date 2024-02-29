import db from '../models/index'


const getListTask = async () => {
    try {
        // const users = await db.Task.findOne({
        //     where: {id: 1},
        //     include: {model: db.User },
        //     raw: true,
        //     nest: true,
        // });
        const users = await db.Task.findAll({
            include: {
                model: db.User,
                attributes: ['id', 'email', 'username']
            },

        });
        return users
    } catch (error) {
        console.log({ error });
        throw error;
    }
}
const createTask = async (userId, taskTitle, taskDescription,  scheduledDate, completedDate) => {
    try {
        await db.Task.create({
            userId: userId,
            taskTitle: taskTitle,
            taskDescription: taskDescription,
            scheduledDate: scheduledDate,
            completedDate: completedDate,
        })
    } catch (error) {
        console.log({ error });
        throw error;
    }

}

module.exports= {
    getListTask,
    createTask,
}