import express from "express"
import passport from "passport"
import axios from "axios"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken";
// import generateToken from "../utils/generateToken.js"
import dotenv from "dotenv"
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";
dotenv.config()

const router = express.Router()

// authenticate the user using google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect:`${process.env.URL}?googleLogin=true`,
    failureRedirect: `${process.env.URL}/login`,
  })
)


// // Authenticate the user using Google and register/login user to DB
// router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: `${process.env.URL}/login` }),
//     async (req, res) => {
//       try {
//         if (req.user) {
//           // Check if the user already exists in the database
//           let user = await User.findOne({ email: req.user._json.email });
  
//           if (!user) {
//             // Register a new user if not found
//             user = new User({
//               username: req.user._json.name,
//               email: req.user._json.email,
//               password: Date.now(), // Using a dummy password
//             });
//             await user.save();
//           }
  
//           // Generate a token for the user
//           generateToken(res, user._id);
  
//           // Send a success response
//           return res.status(200).json({
//             // user: { ...req.user, isAdmin: user.isAdmin },
//             user,
//             message: "Successfully logged in",
//             success : true,
//             // _id: user._id,

//           });
//         }
  
//         // If the user is not authenticated
//         res.status(403).json({ message: "Not Authorized" });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error and others" });
//       }
//     }
//   );





// forward the request to goggle's authentication server
router.get("/google", async (req, res) => {
  try {
    const response = await axios.get(
      "https://accounts.google.com/o/oauth2/v2/auth",
    
    // "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly%20https%3A//www.googleapis.com/auth/calendar.readonly&state=state_parameter_passthrough_value&redirect_uri=https%3A//oauth2.example.com/code&access_type=offline&response_type=code&client_id=583306224539-atbcaa8ne8g85e8kc006o6vmq99qiid0.apps.googleusercontent.com",
      {
        params: req.query,
      }
    )
    res.send(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// // //register or login user to DB
// router.get("/login/success", async (req, res) => {
//   if (req.user) {
//     const userExists = await User.findOne({ email: req.user._json.email })
//     if (userExists) {
//     //   generateToken(res, userExists._id)
//     const token = await jwt.sign({ userId: userExists._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

//     return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
//         message: `Welcome back ${req.user._json.name}`,
//         success: true,
//         user:userExists
//     });
//     } else {
//       const user = await User.create({
//         username: req.user._json.name,
//         email: req.user._json.email,
//         password: Date.now(), //dummy password
//       })
//     //   generateToken(res, user._id)
      

//       await user.save()

//       const token = await jwt.sign({ userId: userExists._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

//     return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
//         message: `Welcome to our app  ${req.user._json.name}`,
//         success: true,
//         user
//     });
//     }

    

//     res.status(200).json({
//         user : req.user,
//       message: "Succesfully logged in",
//       success : true,
//     })
//   } else {
//     res.status(403).json({
//       message: "Not Authorized",
//     })
//   }
// })




// // Register or login user to DB
// router.get("/login/success", async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(403).json({ message: "Not Authorized" });
//     }

//     console.log(req.user)

//     const { name, email } = req.user._json;
//     let user = await User.findOne({ email });
//     if(user){
//       var isNew = false;
//     }
//     else{
//       isNew = true
//     }

//     if (!user) {
//       // Create a new user if not found
//       user = await User.create({
//         username: name,
//         email,
//         password: Date.now(), // Dummy password
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id.toString() }, process.env.SECRET_KEY, { expiresIn: '1d' });

//     // Set cookie and send response
//     res.cookie('token', token, {
//       httpOnly: true,
//       sameSite: 'strict',
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     }).json({
//       message: isNew ? `Welcome to our app, ${name}` : `Welcome back, ${name}`,
//       success: true,
//       user,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

  

router.get("/login/success", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated", success: false });
    }

    console.log("Authenticated user:", req.user);

    const { name, email ,picture} = req.user._json;
    let user = await User.findOne({ email });
    const isNew = !user;

    
  //   if (picture) {
  //     const fileUri = getDataUri(picture);
  //     cloudResponse = await cloudinary.uploader.upload(fileUri);
  // }


    if (isNew) {
      // Create a new user if not found
      user = await User.create({
        username: name,
        email,
        password: Date.now(), // Dummy password
        profilePicture: picture
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id.toString() }, process.env.SECRET_KEY, { expiresIn: '1d' });

    // Set cookie and send response
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }).json({
      message: isNew ? `Welcome to E-Kheti, ${name}` : `Welcome back, ${name}`,
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in /login/success:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




//login failed
router.get("/login/failed", (req, res) => {
  res.status(401)
  throw new Error("Login Failed")
})

// //logout
// router.get("/logout", (req, res) => {
//   req.logout(err => {
//     if (err) {
//       console.log(err)
//     }
//     res.redirect("/")
//   })
// })

// // Logout route in your GoogleAuth controller
// router.get("/logout", (req, res) => {
//   req.logout(err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Logout failed" });
//     }
//     res.clearCookie("token");
    
//     return res.status(200).json({message:"Logout succefull",
//       success:true,
//     })
//     // res.redirect(`${process.env.URL}/login`);
//   });
// });


router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Logout failed" });
    }

    // Explicitly destroy the session
    req.session.destroy(err => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ message: "Failed to destroy session" });
      }

      // Clear session and auth cookies
      res.clearCookie("connect.sid"); // Default session cookie
      res.clearCookie("token");

      return res.status(200).json({
        message: "Logout successful",
        success: true,
      });
    });
  });
});


export default router