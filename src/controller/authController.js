import auth from '../service/authService';
import { generateToken } from '../service/tokenService'
import { verifyRefreshToken } from '../middleware/auth'
import jwt from 'jsonwebtoken';
import db from '../models/index'

require('dotenv').config();

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await auth.login(email, password);
        const payload = {
            userId: user.id,
            email: email,
            groupId: user.groupId,
        };
        if (!user) {
            return res.status(404).json({
                status: 'User don`t exits',
                result: false,
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

const register = async (req, res) => {
    const { email, name, password, confirmPassword } = req.body
    try {
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: "Confirm password is not correct",
            })
        }
        const accountNew = await auth.register(email, name, password, confirmPassword)
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

module.exports = {
    login,
    logout,
    refreshToken,
    register,
    handelForgotPassword,
    VerifyAuthenticationOTP,
}