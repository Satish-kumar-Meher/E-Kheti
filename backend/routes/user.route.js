import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import {
    loginSchema,
    signupSchema
} from "../validator/zod_validator.js";
import {
    changePassword,
    editProfile,
    followOrUnfollow,
    getProfile,
    getSuggestedUsers,
    login,
    logout,
    resetPassword,
    resetPasswordToken,
    sendOTP,
    signIn,
    updateEmail,

} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";



const router = express.Router();


router.route("/signin").post(validate(signupSchema), signIn)
router.route("/sendotp").post(sendOTP)
router.route("/login").post(validate(loginSchema), login)
router.route("/logout").get(logout)
router.route('/:id/profile').get(isAuthenticated, getProfile);
router.route('/profile/edit').post(isAuthenticated, upload.single('profilePicture'), editProfile);
router.route('/suggested').get(isAuthenticated, getSuggestedUsers);
router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);
router.route("/changepassword").post(isAuthenticated, changePassword);
router.route("/updateemail").post(isAuthenticated, updateEmail);
router.route("/forgot-reset-password").post(resetPassword)
router.route("/forgot-reset-password-token").post(resetPasswordToken)



export default router;