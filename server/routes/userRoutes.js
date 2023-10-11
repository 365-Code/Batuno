import express from 'express'
import { avatarController, forgetPasswordController, getAllUsersController, loginController, registerController } from '../controllers/userControllers.js'


const router = express.Router();


router.post('/register', registerController);
router.post('/login', loginController);
router.put('/set-avatar/:id', avatarController);
router.get('/getAllUsers/:id', getAllUsersController);
router.put("/forgotPassword", forgetPasswordController);



export default router