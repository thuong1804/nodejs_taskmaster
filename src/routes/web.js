import express from "express";
import homeController from '../controller/homeController'
import authController from '../controller/authController';
import taskController from '../controller/taskController';
import notificationController from '../controller/notificationController';
import UserController from '../controller/userController'
import {refreshToken} from '../controller/authController'
import {authenticatedToken} from '../middleware/auth'

const router = express.Router();
const initWebRoutes = (app) => {

    router.get('/', homeController.handelHomeController)
    router.post('/api/refreshToken', refreshToken)
    router.post('/login', authController.login)
    router.post('/logout', authController.logout),
    router.post('/register', authController.register)
    router.post('/sendEmail', authController.handelForgotPassword)
    router.post('/recover-code', authController.VerifyAuthenticationOTP)
    router.post('/change-password-forgot', authController.handelUpdatePasswordForget)
    router.post('/change-password', authenticatedToken, authController.handelUpdatePassword)
    

    router.post('/api/users', authenticatedToken, UserController.handelGetListUser)
    router.post('/api/delete-user/:id', authenticatedToken,UserController.handelDeleteUser)
    router.post('/api/create-user', authenticatedToken, UserController.handelCreateUserController)
    router.get('/api/profile', authenticatedToken, UserController.handelGetProfileUser)
    router.post('/api/get-id-user/:id', authenticatedToken, UserController.handelGetByIdUser)
    router.put('/api/update-user', authenticatedToken, UserController.handelUpdateUser)
    router.post('/api/upload-avatar', authenticatedToken, UserController.handleUploadAvatar)
    router.post('/api/delete-avatar/:imgName', authenticatedToken, UserController.handelDeleteAvatar)
    router.put('/api/update-profile', authenticatedToken, UserController.handelUpdateProfile)


    router.post('/api/tasks', authenticatedToken, taskController.handelGetListTask)
    router.post('/api/create-task', authenticatedToken, taskController.handelCreateTask)
    router.post('/api/delete-task', authenticatedToken, taskController.handelDeleteTask)
    router.put('/api/update-task', authenticatedToken, taskController.handelUpdateTask)
    router.post('/api/get-id-task/:id', authenticatedToken, taskController.handelGetTaskById)
    router.post('/api/search', authenticatedToken, taskController.handelSearchTask)
    router.post('/api/status', authenticatedToken, taskController.handelUpdateStatus)


    router.post('/api/notifications', notificationController.getNotificationController)



    return app.use('/', router)
}

export default initWebRoutes;