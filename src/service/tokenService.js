import jwt from 'jsonwebtoken';
require('dotenv').config();

const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn:'2h'
    })
    const refreshToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_REFRESH, {
        expiresIn:'2h'
    })

    return {accessToken, refreshToken}
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