import auth from '../service/authService';
import {generateToken, updateRefreshToken} from '../service/tokenService'
require('dotenv').config();


const login = async(req, res) => {
    const {email, password} = req.body;
    const payload = {
        email: email,
    };
    try {
        const user = await auth.login(email, password);
        if (!user) {
           return res.status(402).json({
                status: 'login failed',
                result: false,

            })
        }
        const tokens = generateToken(payload)
        return res.status(200).json({
            status: 'login success',
            data: {
                content: {
                    email: req.body.email,
                    tokens,
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
module.exports = {
    login,
}