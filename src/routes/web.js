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
    router.get('/api/users', UserController.handelGetListUser)
    router.post('/api/delete-user/:id', UserController.handelDeleteUser)
    router.post('/api/create-user', UserController.handelCreateUserController)
    router.post('/api/get-id-user/:id', UserController.handelGetByIdUser)
    router.put('/api/update-user', UserController.handelUpdateUser)
    router.get('/task/get-task', verifyToken, taskController.handelGetListTask)
    router.post('/task/create-task', taskController.handelCreateTask)
    router.get('/api/test', apiController.TestApi)
    return app.use('/', router)
}

export default initWebRoutes;