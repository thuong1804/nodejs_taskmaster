import dayjs from 'dayjs'
import taskService from '../service/taskService'

const handelGetListTask = async (req, res) => {
    const id = req.body.userId
    const groupId = req.body.groupId
    const cookie = req.cookies
    const page = req.query.page;
    const size = req.query.size;
    const { taskTitle, reporter } = req.body
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
        const {
            userId,
            taskTitle,
            taskDescription,
            scheduledDate,
            completedDate,
            reporter,
            owner,
            status,
        } = req.body
    
        const scheduledDateParts = dayjs(scheduledDate)
        const completedDateParts = dayjs(completedDate)

        await taskService.createTask(
            userId,
            taskTitle,
            taskDescription,
            scheduledDateParts,
            completedDateParts,
            reporter,
            owner,
            status,
        );
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
        const {
            id,
            userId,
            taskTitle,
            taskDescription,
            scheduledDate,
            completedDate,
            reporter,
            owner,
        } = req.body

        const scheduledDateParts = dayjs(scheduledDate)
        const completedDateParts = dayjs(completedDate)

        await taskService.updateTask(
            id,
            userId,
            taskTitle,
            taskDescription,
            scheduledDateParts,
            completedDateParts,
            reporter,
            owner,
        );
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

const handelUpdateStatus = async (req, res) => {
    const { id, status } = req.body;
    try {
        await taskService.updateStatus(id, status);
        return res.status(200).json({
            status: "success",
            message: 'Update status success',
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
    handelUpdateStatus
}
