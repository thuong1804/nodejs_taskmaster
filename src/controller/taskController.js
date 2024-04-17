import taskService from '../service/taskService'

const handelGetListTask = async (req, res) => {
    const id = req.body.userId
    const groupId = req.body.groupId
    const cookie = req.cookies
    const page = req.query.page;
    const size = req.query.size;
    const {taskTitle, reporter} = req.body
    if (cookie && cookie.login) {
        try {
            if (page && size) {
                const taskList = await taskService.getListTaskWithPagination(id, groupId, +page, +size)
                return res.status(200).json({
                    status: 'Get task success',
                    data: {
                        ...taskList,
                        size: size
                    },
                    result: true
                })

            } else {
                const taskList = await taskService.getListTask(id, groupId, taskTitle, reporter);
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
            }
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
        const { userId, taskTitle, taskDescription, scheduledDate, completedDate, reporter } = req.body
        const scheduledDateParts = scheduledDate.split('-').map(part => parseInt(part));
        const completedDateParts = completedDate.split('-').map(part => parseInt(part));

        if (scheduledDateParts.length !== 3 || completedDateParts.length !== 3) {
            throw new Error("Invalid date format");
        }

        const utcScheduledDate = new Date(Date.UTC(
            scheduledDateParts[2], // Năm
            scheduledDateParts[1] - 1, // Tháng (lưu ý giảm đi 1 vì tháng trong JavaScript bắt đầu từ 0)
            scheduledDateParts[0] // Ngày
        ));

        const utcCompletedDate = new Date(Date.UTC(
            completedDateParts[2], // Năm
            completedDateParts[1] - 1, // Tháng
            completedDateParts[0] // Ngày
        ));

        await taskService.createTask(userId, taskTitle, taskDescription, utcScheduledDate, utcCompletedDate, reporter);
        return res.status(200).json({
            message: 'ok',
            result: true,
            data: { ...req.body }
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const handelUpdateTask = async (req, res) => {
    try {
        const { id, userId, taskTitle, taskDescription, scheduledDate, completedDate, reporter } = req.body
        const scheduledDateParts = scheduledDate.split('-').map(part => parseInt(part));
        const completedDateParts = completedDate.split('-').map(part => parseInt(part));

        if (scheduledDateParts.length !== 3 || completedDateParts.length !== 3) {
            throw new Error("Invalid date format");
        }

        const utcScheduledDate = new Date(Date.UTC(
            scheduledDateParts[2],
            scheduledDateParts[1] - 1,
            scheduledDateParts[0]
        ));

        const utcCompletedDate = new Date(Date.UTC(
            completedDateParts[2],
            completedDateParts[1] - 1,
            completedDateParts[0]
        ));

        await taskService.updateTask(id, userId, taskTitle, taskDescription, utcScheduledDate, utcCompletedDate, reporter);
        return res.status(200).json({
            message: 'ok',
            result: true,
            data: {
                ...req.body,
            }
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const handelDeleteTask = async (req, res) => {
    const id = req.body.id
    try {
        await taskService.deleteTask(id);
        return res.status(200).json({
            status: "success",
            message: 'Delete task success',
            data: {
                id: id
            },
            result: true,
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const handelGetTaskById = async (req, res) => {
    const id = req.body.id
    try {
        const taskDetail = await taskService.getTaskById(id);
        return res.status(200).json({
            status: "success",
            message: 'Get task detail success',
            data: {
                content: taskDetail
            },
            result: true,
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const handelSearchTask = async (req, res) => {
    const query = req.query
    console.log({query})
    try {
        const taskSearch = await taskService.searchTask(query);
        return res.status(200).json({
            status: "success",
            message: 'Search task success',
            data: {
                content: taskSearch
            },
            result: true,
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const handelTaskInProgress = async (req, res) => {
    const isInProgress = req.body.isInProgress
    const id = req.body.id
    try {
        await taskService.taskInProgress(id, isInProgress);
        return res.status(200).json({
            status: "success",
            result: true,
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }

}

const handelTaskCompleted = async(req, res) => {
    const {id, isCompleted} = req.body
    try {
        await taskService.taskCompleted(id, isCompleted);
        return res.status(200).json({
            status: "Task completed success",
            result: true,
        })
    } catch (error) {
        console.log({ error })
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
    handelDeleteTask,
    handelUpdateTask,
    handelGetTaskById,
    handelSearchTask,
    handelTaskInProgress,
    handelTaskCompleted,
}
