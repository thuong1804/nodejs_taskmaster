import userService from '../service/userService'
import db from '../models/index'

const handelGetListUser = async (req, res) => {
    console.log({ req })
    try {
        const userList = await userService.getListUser();
        if (!userList) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Failed get list user",
            });
        }
        return res.status(200).json({
            status: "success",
            message: 'Thank you for registering with us. Your account has been successfully created.',
            data: {
                content: req.body
            },
            result: true,
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

const handelCreateUserController = async (req, res) => {
    try {
        const { email, username, address, gender, password } = req.body;
        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems you already have an account, please log in instead.",
            });
        }
        await userService.createNewUser(email, username, address, gender, password)
        return res.status(200).json({
            status: "success",
            message: 'Thank you for registering with us. Your account has been successfully created.',
            data: {
                ...req.body
            },
            result: true,
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
    handelCreateUserController,
    handelGetListUser,
}