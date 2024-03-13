import jwt from 'jsonwebtoken';
require('dotenv').config();
import db from '../models/index'

const verifyRefreshToken = async (refreshToken) => {
    const privateKey = process.env.ACCESS_TOKEN_SECRET_REFRESH;
    try {
        const tokenDetails = jwt.verify(refreshToken, privateKey);
        return tokenDetails
      } catch (error) {
        console.error('Error:', error);
        return Promise.reject({ error: true, message: "Invalid refresh token" });
      }
}

const authenticatedToken = (req, res, next) => {
    const authorizationHeader = req.headers?.['authorization'];
    const token = authorizationHeader?.split(' ')?.[1];
    if (!token) return res?.sendStatus(401);
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
            if(error) return res.sendStatus(401);
            next();
        });
    } catch (error) {
        console.error({error});
        return res.sendStatus(500);
    }
};

module.exports = {
    verifyRefreshToken,
    authenticatedToken,
};