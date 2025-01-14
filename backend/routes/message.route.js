
import express from "express";
 import isAuthenticated from "../middlewares/isAuthenticated.js";
// import upload from "../middlewares/multer.js";
import { deleteAllMessages, getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route('/send/:id').post(isAuthenticated, sendMessage);
router.route('/all/:id').get(isAuthenticated, getMessage);
router.route('/deleteAll/:id').delete(isAuthenticated, deleteAllMessages); // New route for deleting all chats 

export default router;
