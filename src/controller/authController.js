import auth from '../service/authService';
import { generateToken } from '../service/tokenService'
import { verifyRefreshToken } from '../middleware/auth'
import jwt from 'jsonwebtoken';
import db from '../models/index'
import { checkPassword } from '../utils';
import notificationService from '../service/notificationService'
import { typeValue } from '../constants';

require('dotenv').config();

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await auth.login(email);
        if (!user) {
            return res.status(404).json({
                status: 'User don`t exits',
                result: false,
            })
        }

        const payload = {
            userId: user.id,
            email: email,
            groupId: user.groupId,
        };
     
        const passwordMatch = checkPassword(password, user.password);
        if (!passwordMatch) {
                return res.status(400).json({
                status: 'INCORRECT_PASSWORD',
                result: false,
                code: 400,
                message: "Incorrect password",
            })
        }
        const { accessToken, refreshToken } = await generateToken(payload)
        res.cookie('login', accessToken, { httpOnly: false })
        res.cookie('refreshToken', refreshToken, { httpOnly: false })
        return res.status(200).json({
            status: 'login success',
            data: {
                content: {
                    email: req.body.email,
                    accessToken,
                    refreshToken,
                },
            },
            result: true
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

const logout = async (req, res) => {
    try {
        return res.status(200).json({
            status: 'login success',
            result: true
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }
}

const handelUpdatePassword = async (req, res) => {
    const {email, password, newPassword} = req.body;

    try {
        const user = await db.User.findOne({
            where:{
                email: email,
            }
        })
        const passwordMatch = checkPassword(password, user.password);
        if (!passwordMatch) {
            return res.status(404).json({
                status: 'error',
                code: 400,
                message: "Invalid current password",
            })
        }
        if (newPassword.length < 8) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: "Password is too short. Please enter a password with at least 8 characters.",
            })
        }
        await auth.updatePassword(email, password, newPassword);
        return res.status(200).json({
            status: 'login success',
            result: true,
            data: {
                password,
                newPassword,
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }
}

const register = async (req, res) => {
    const { email, name, password, confirmPassword } = req.body
    const type = typeValue.CREATE_USER
    const existingEmail = await db.User.findOne({
       where: {
        email: email
       }
    })
    if (existingEmail) {
        return res.status(400).json({
            status: 'EMAIL_ERROR',
            code: 400,
            message: "Email existing",
        })
    }
    try {
        if (password.length < 8) {
            return res.status(400).json({
                status: 'PASSWORD_ERROR',
                code: 400,
                message: "Password is too short. Please enter a password with at least 8 characters.",
            })
        }
        const accountNew = await auth.register(email, name, password, confirmPassword)
        await notificationService.creatNotification(type, accountNew.id)
        return res.status(200).json({
            status: 'Register new account success',
            data: accountNew,
            result: true
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }
}

const refreshToken = (req, res) => {
    verifyRefreshToken(req.body.refreshToken)
        .then((tokenDetails) => {
            const payload = {
                id: tokenDetails.userId,
                group: tokenDetails.groupId,
                email: tokenDetails.email,
            };
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "14m" }
            );
            res.status(200).json({
                error: false,
                accessToken,
                message: "Access token created successfully",
            });
        })
        .catch((err) => {
            console.log({ err })
            res.status(400).json(err);
        })
}

const handelForgotPassword = async (req, res) => {
    const { email } = req.body;
    const existingEmail = await db.User.findOne({ where: { email } });

    if (!existingEmail) {
        return res.status(404).json({
            status: 'error',
            result: false,
            code: 404,
            text: 'The email does not exist in the system.'
        })
    }
    try {
        await auth.forgotPassword(email)
        return res.status(200).json({
            status: 'Email sent successfully',
            data: email,
            result: true
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }
}

const VerifyAuthenticationOTP = async (req, res) => {
    const { code, emailUSer } = req.body;
    try {
        await auth.authenticationOTP(code, emailUSer)
        return res.status(200).json({
            status: 'Valid authentication code',
            result: true
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }
}

const handelUpdatePasswordForget = async(req, res) => {
    const {email, password} = req.body;
    if (password.length < 8) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: "Password is too short. Please enter a password with at least 8 characters.",
        })
    }
    try {
        await auth.updatePasswordForgot(email, password)
        return res.status(200).json({
            status: 'Change Password success',
            result: true
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: "error",
            code: 500,
            message: "Internal Server Error",
        });
    }

}

module.exports = {
    login,
    logout,
    refreshToken,
    register,
    handelForgotPassword,
    VerifyAuthenticationOTP,
    handelUpdatePasswordForget,
    handelUpdatePassword,
}