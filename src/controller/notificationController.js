import notificationService from '../service/notificationService'

const getNotificationController = async(req, res) => {
    const {userId} = req.body
    try {
        const notificationList = await notificationService.getNotification(userId)
        if (!notificationList) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Failed get list notification",
            });
        }
        return res.status(200).json({
            status: "success",
            message: 'Get list success',
            data: {
                content: notificationList
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

module.exports = {
    getNotificationController,
}