import userService from '../service/userService'
import db from '../models/index'

const handelGetListUser = async (req, res) => {
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
            message: 'Get list success',
            data: {
                content: userList
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

const handelDeleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await userService.deleteUser(id);
        return res.status(200).json({
            status: "success",
            message: 'Get list success',
            data: {
                userId: id
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

const handelGetByIdUser = async (req, res) => {
    const id = req.params.id
    try {
    const user = await userService.getUserById(id);
        return res.status(200).json({
            status: "success",
            message: 'Get list success',
            data: {
                content: user
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

const handelUpdateUser = async (req, res) => {
    const {id, email, name, address, gender, groupId} = req.body
    try {
   await userService.updateUser(id, email, name, address, gender, groupId);
        return res.status(200).json({
            status: "success",
            message: 'Update user success',
            data: {
                content:  {
                    email,
                    name,
                    address,
                    gender,
                    groupId
                }
            },
            result: true,
        })
    } catch (error) {
        console.log({error})
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
    handelDeleteUser,
    handelGetByIdUser,
    handelUpdateUser,
}