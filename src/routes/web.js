import express from "express";
import homeController from '../controller/homeController'

const router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.handelHomeController)
    router.get('/user', homeController.handelUserController)
    router.get('/user/get-list', homeController.handelGetListUser)
    router.post('/user/create-user', homeController.handelCreateUserController)
    router.post('/delete-user/:id', homeController.handelDeleteUser)
    router.post('/update-user/:id', homeController.handelGetIdByUserController)
    router.post('/update-user/', homeController.handelUpdateUser)
    return app.use('/', router)
}

export default initWebRoutes;