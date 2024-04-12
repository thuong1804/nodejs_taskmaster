import jwt from 'jsonwebtoken';
require('dotenv').config();
import db from '../models/index'

const generateToken = async (payload) => {
    try {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30m'
        })
        const refreshToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_REFRESH, {
            expiresIn: '3d'
        })
        const existingUserToken = await db.UserToken.findOne(
            {
                where: { userId: payload.userId }
            });
        if (existingUserToken) {
            await existingUserToken.destroy();
        }
        await db.UserToken.create({ userId: payload.userId, token: refreshToken });
        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        console.error('Error:', error);
        return Promise.reject(error);
    }
}

const updateRefreshToken = (users, refreshToken) => {
    if (users) {
        return {
            ...users,
            refreshToken: refreshToken,
        }
    }
}
module.exports = {
    generateToken,
    updateRefreshToken
}