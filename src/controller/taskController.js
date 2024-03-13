import taskService from '../service/taskService'
const handelGetListTask = async (req, res) => {
    const cookie = req.cookies
    if (cookie && cookie.login) {
        try {
            const taskList = await taskService.getListTask();
            if (!taskList) {
                return res.status(402).json({
                    status: 'Get list task failed',
                    result: false,

                })
            }
            return res.status(200).json({
                status: 'Get profile success',
                data: {
                    content: taskList,
                },
                result: true
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
