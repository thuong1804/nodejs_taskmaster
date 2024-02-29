import express from "express";
import homeController from '../controller/homeController'
import authController from '../controller/authController';
import taskController from '../controller/taskController';
import apiController from "../controller/testApiController";
import UserController from '../controller/userController'
import verifyToken from '../middleware/auth'
const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.handelHomeController)
    router.post('/login', authController.login)
    router.get('/user', homeController.handelUserController)
    router.get('/user/get-list', UserController.handelGetListUser)
    router.get('/task/get-task', verifyToken, taskController.handelGetListTask)
    router.post('/task/create-task', taskController.handelCreateTask)
    router.post('/user/create-user', UserController.handelCreateUserController)
    router.post('/delete-user/:id', homeController.handelDeleteUser)
    router.post('/update-user/:id', homeController.handelGetIdByUserController)
    router.post('/update-user/', homeController.handelUpdateUser)
    router.get('/api/test', apiController.TestApi)
    return app.use('/', router)
}

export default initWebRoutes;