import { where } from 'sequelize';
import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')

const hashUserPassWord = (password) => {
    const hashPass = bcrypt.hashSync(password, salt);
    return hashPass;
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const OTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
});

const login = async (email, password) => {
    try {
        const user = await db.User.findOne({
            where: {
                email: email,
            }
        })
        const passwordMatch = checkPassword(password, user.password);
        if (!passwordMatch) {
            throw new Error("Incorrect password");
        }
        return user;
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const register = async (email, name, password) => {
    try {
        const user = await db.User.create({
            email,
            name,
            password: hashUserPassWord(password),
            confirmPassword: hashUserPassWord(password),
        },
    )
        return user;
    } catch (error) {
        console.log({ error });
        throw error;
    }
}

const sendForgotPasswordEmail = async (email, code) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        logger: true,
        debug: true,
        secureConnection: false,
        auth: {
            user: 'thuong123tvt@gmail.com',
            pass: 'tlgv flwr bvkq ktvp',
        },
        tls: {
            rejectUnauthorized: true,
        }
    });

    let mailOptions = {
        from: 'thuong123tvt@gmail.com',
        to: email,
        subject: 'Reset Password Code',
        text: `OTP authentication code is ${code}`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        await db.AuthenticationCode.create({
            code: OTP,
            emailUser: email,
        })
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

const forgotPassword = async (email) => {
    sendForgotPasswordEmail(email, OTP)
        .then(success => {
            if (success) {
                console.log('Email sent successfully!');
            } else {
                console.log('Failed to send email!');
            }
        });
}

const authenticationOTP = async(code, emailUSer) => {
    try {
        await db.AuthenticationCode.findOne({
            where: {
                code: code,
                emailUSer: emailUSer,
            }
        },
    )
    } catch (error) {
        console.log({ error });
        throw error;
    }
}


module.exports = {
    login,
    register,
    forgotPassword,
    authenticationOTP,
}