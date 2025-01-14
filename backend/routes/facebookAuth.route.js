import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Facebook Authentication and Redirect
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// Facebook Callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${process.env.URL}/login`,
  }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated", success: false });
      }

      const { first_name, last_name, email } = req.user._json;
      const name = `${first_name} ${last_name}`;
      let user = await User.findOne({ email });
      const isNew = !user;

      if (isNew) {
        // Create a new user if not found
        user = await User.create({
          username: name,
          email,
          password: Date.now(), // Dummy password
        });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id.toString() }, process.env.SECRET_KEY, { expiresIn: "1d" });

      // Set cookie and send response
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      }).json({
        message: isNew ? `Welcome to E-Kheti, ${name}` : `Welcome back, ${name}`,
        success: true,
        user,
      });
    } catch (error) {
      console.error("Error in Facebook callback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Login failed
router.get("/login/failed", (req, res) => {
  res.status(401);
  throw new Error("Login Failed");
});

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Logout failed" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ message: "Failed to destroy session" });
      }

      res.clearCookie("connect.sid");
      res.clearCookie("token");

      return res.status(200).json({
        message: "Logout successful",
        success: true,
      });
    });
  });
});

export default router;
