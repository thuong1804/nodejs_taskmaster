import db from '../models/index'


const getListTask = async () => {
    try {
        const tasks = await db.Task.findAll({
            // where: {
            //     email: email
            // },
            include: {model: db.User },
            raw: true,
            nest: true,
            include: {
                model: db.User,
                attributes: ['id', 'email', 'name']
            },
        });
        // const users = await db.Task.findAll({
        //     include: {
        //         model: db.User,
        //         attributes: ['id', 'email', 'name']
        //     },

        // });
        return tasks
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