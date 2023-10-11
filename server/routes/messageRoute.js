import { getMessages, sendMessage } from "../controllers/messageController.js";
import express from 'express';


const router = express.Router();


router.post('/sendMessage', sendMessage);
router.post('/getMessages', getMessages)





export default router