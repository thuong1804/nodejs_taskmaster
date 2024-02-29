import taskService from '../service/taskService'


const handelGetListTask = async (req, res) => {
    try {
        const taskList = await taskService.getListTask();
        return res.status(200).json({
            status: 'get list success',
            result: true,
            content: taskList
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const handelCreateTask = async (req, res) => {
    try {
        const { userId, taskTitle, taskDescription, scheduledDate, completedDate } = req.body
        await taskService.createTask(userId, taskTitle, taskDescription, scheduledDate, completedDate);
        return res.status(200).json({
            message: 'ok',
            result: true,
            data: { ...req.body }
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    handelGetListTask,
    handelCreateTask,
}
