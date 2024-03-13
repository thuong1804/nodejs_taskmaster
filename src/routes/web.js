import express from "express";
import homeController from '../controller/homeController'
import authController from '../controller/authController';
import taskController from '../controller/taskController';
import apiController from "../controller/testApiController";
import UserController from '../controller/userController'
import {refreshToken} from '../controller/authController'
import {authenticatedToken, verifyRefreshToken} from '../middleware/auth'
const router = express.Router();
const initWebRoutes = (app) => {
    router.get('/', homeController.handelHomeController)
    router.post('/api/refreshToken', refreshToken)
    router.post('/login', authController.login)
    router.post('/logout', authController.logout)

    router.get('/api/users', authenticatedToken, UserController.handelGetListUser)
    router.post('/api/delete-user/:id', UserController.handelDeleteUser)
    router.post('/api/create-user', UserController.handelCreateUserController)
    router.get('/api/profile', authenticatedToken, UserController.handelGetProfileUser)
    router.post('/api/get-id-user/:id', UserController.handelGetByIdUser)
    router.put('/api/update-user', UserController.handelUpdateUser)


    router.get('/api/tasks', authenticatedToken, taskController.handelGetListTask)
    router.post('/api/create-task', taskController.handelCreateTask)
    router.get('/api/test', apiController.TestApi)
    return app.use('/', router)
}

export default initWebRoutes;