import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Products } from "../models/product.model.js";
import { Post } from "../models/post.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import otpGenerator from "otp-generator"
import { OTP } from "../models/otp.model.js";
import { mailSender } from "../mail/mailSender.js";
import crypto from "crypto";

import resetPasswordTemplate from "../mail/resetPasswordTemplate.js";
import resetPasswordSuccess from "../mail/resetPasswordSuccesful.js";
import { Crop } from "../models/crops.model.js";


export const sendOTP = async (req, res) => {
    try {
        // fetch email from request body
        const { email } = req.body;

        //check if user already exist
        const checkUserPresent = await User.findOne({ email });

        //if user already exist, then return a response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            });
        }

        //else generate a otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        

        const otpInDB = await OTP.find();
        console.log("Generated OTP:", otp);
        console.log("Stored OTPs:", otpInDB);

        //check unique otp or not
        const result = await OTP.findOne({otp: otp});
        console.log("Result is Generating OTP ")
        console.log("OTP", otp)
        console.log("Result", result)

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            // result = await OTP.findOne({ otp });
        }


        //create an entry for OTP in db
        const otpBody = await OTP.create({email,otp});
        console.log("OTP Body", otpBody)

        //return response
        res.status(200).json({
            success: true,
            message: "OTP sent Successfully",
            otp,
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
            error: error.message,
        });
    }
};

export const signIn = async (req,res) => {
    try {
        const { username, email, password} = req.body;
        const {otp} = req.body;
        console.log(req.body)
        if (!username || !email || !password || !otp) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
                otp
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Try different email",
                success: false,
            });
        };


        const recentOtp = await OTP.find({ email })
            .sort({ createdAt: -1 })
            .limit(1);
        console.log("recent otp" ,otp, recentOtp);

        //validate otp
        if (recentOtp.length === 0) {
            //otp not found
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        } 
        else if (otp !== recentOtp[0].otp) {
            //invalid otp
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword
        });


        

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
            // user,

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });

    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        };

        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        // populate each post if in the posts array
        const populatedPosts = await Promise.all(
            user.posts.map( async (postId) => {
                const post = await Post.findById(postId);
                if(post.author.equals(user._id)){
                    return post;
                }
                return null;
            })
        )
        const populatedProducts = await Promise.all(
            user.addedProducts.map( async (productId) => {
                const product = await Products.findById(productId);
                if(product.seller.equals(user._id)){
                    return product;
                }
                return null;
            })
        )
        // const populatedCrops = await Promise.all(
        //     user.selectedCrops.map( async (cropsId) => {
        //         const crops = await Crop.findById(cropsId);
        //         if(crops._id.equals(selectedCrops)){
        //             return crops;
        //         }
        //         return null;
        //     })
        // )

        
        // user = {
        //     _id: user._id,
        //     username: user.username,
        //     email: user.email,
        //     profilePicture: user.profilePicture,
        //     bio: user.bio,
        //     followers: user.followers,
        //     following: user.following,
        //     posts: populatedPosts,
        //     products : populatedProducts,

        // }
        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            gender: user.gender,
            followers: user.followers,
            following: user.following,
            posts: populatedPosts.filter(Boolean), // Filter out null values
            bookmarks: user.bookmarks,
            selectedCrops: user.selectedCrops,
            addedProducts: populatedProducts.filter(Boolean), // Filter out null values
            favoriteProducts: user.favoriteProducts,
            address: user.address, // Nested address object
            phoneNumber: user.phoneNumber,
            role: user.role,
            dateCreated: user.dateCreated,
        };
        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            message: `Welcome back ${user.username}`,
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
    }
};



export const logout = async (_, res) => {
    try {
        return res.cookie("token", "", { maxAge: 0 }).json({
            message: 'Logged out successfully.',
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};


export const deleteAccount = async (req,res) => {
    try {
        const userId = req.params.id
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            message:"Account delete successfully",
            success:true
        })
    

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Error comes in delete Account",
            success:false
        })
    }
}

// router.get("/logout", (req, res) => {
//     req.logout(err => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({ message: "Logout Error" });
//       }
//       req.session.destroy(() => {
//         res.clearCookie("token");
//         res.redirect(`${process.env.URL}/login`);
//       });
//     });
//   });
  

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId).select("-password").populate({path:'posts', createdAt:-1}).populate('bookmarks').populate({path:'addedProducts',createdAt:-1})
        .populate('selectedCrops').populate('favoriteProducts');
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// export const editProfile = async (req, res) => {
//     try {
//         const userId = req.id;
//         const { bio, gender,address,phoneNumber,role,username } = req.body;
//         const profilePicture = req.file;
//         let cloudResponse;

//         if (profilePicture) {
//             const fileUri = getDataUri(profilePicture);
//             cloudResponse = await cloudinary.uploader.upload(fileUri);
//         }

//         const user = await User.findById(userId).select('-password');
//         if (!user) {
//             return res.status(404).json({
//                 message: 'User not found.',
//                 success: false
//             });
//         };
//         if (username) user.username = username;
//         if (bio) user.bio = bio;
//         if (gender) user.gender = gender;
//         if (address) {
//             if (address.country) user.address.country = address.country;
//             if (address.state) user.address.state = address.state;
//             if (address.district) user.address.district = address.district;
//             if (address.block) user.address.block = address.block;
//             if (address.town) user.address.town = address.town;
//             if (address.PIN) user.address.PIN = address.PIN;
//             if (address.village) user.address.village = address.village;
//         }
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (role) user.role = role;
//         if (profilePicture) user.profilePicture = cloudResponse.secure_url;

//         await user.save();

//         return res.status(200).json({
//             message: 'Profile updated succesfully',
//             success: true,
//             user
//         });

//     } catch (error) {
//         console.log(error);
//     }
// };


export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, gender, address, phoneNumber, role, username } = req.body;
        const profilePicture = req.file;
        let cloudResponse;

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        }

        // Update user details
        if (username) user.username = username;
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (role) user.role = role;
        if (address) {
            user.address = { ...user.address, ...address };
        }
        if (cloudResponse) {
            user.profilePicture = cloudResponse.secure_url;
        }

        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully.',
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Something went wrong while updating the profile.',
            success: false,
        });
    }
};


export const getSuggestedUsers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
        if (!suggestedUsers) {
            return res.status(400).json({
                message: 'Currently do not have any users',
            })
        };
        return res.status(200).json({
            success: true,
            users: suggestedUsers
        })
    } catch (error) {
        console.log(error);
    }
};


export const followOrUnfollow = async (req, res) => {
    try {
        const followKrneWala = req.id; // patel
        const jiskoFollowKrunga = req.params.id; // shivani
        if (followKrneWala === jiskoFollowKrunga) {
            return res.status(400).json({
                message: 'You cannot follow/unfollow yourself',
                success: false
            });
        }

        const user = await User.findById(followKrneWala);
        const targetUser = await User.findById(jiskoFollowKrunga);

        if (!user || !targetUser) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
        // mai check krunga ki follow krna hai ya unfollow
        const isFollowing = user.following.includes(jiskoFollowKrunga);
        if (isFollowing) {
            // unfollow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $pull: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWala } }),
            ])
            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        } else {
            // follow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $push: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followKrneWala } }),
            ])
            return res.status(200).json({ message: 'followed successfully', success: true });
        }
    } catch (error) {
        console.log(error);
    }
}

export const changePassword = async (req, res) => {
    try {
        const userId = req.id; // Assuming user is authenticated and ID is available
        const { currentPassword, newPassword , confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Please provide both current and new passwords",
                success: false,
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Current password is incorrect",
                success: false,
            });
        }
        if (newPassword !== confirmPassword) {
            return res.status(401).json({
                message: "Confirm password should be same with new password",
                success: false,
            })
        }
        const hashedNewPassword = await bcrypt.hash(confirmPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        

        return res.status(200).json({
            message: "Password changed successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};


export const updateEmail = async (req, res) => {
    try {
        const userId = req.id; // Assuming user is authenticated
        console.log(userId)
        const { newEmail , currentPassword } = req.body;

        if (!newEmail) {
            return res.status(400).json({
                message: "Please provide new email to update",
                success: false,
            });
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "password is incorrect",
                success: false,
            });
        }

        if (newEmail) {
            const emailExists = await User.findOne({ email: newEmail });
            if (emailExists) {
                return res.status(400).json({
                    message: "Email already in use, try another one",
                    success: false,
                });
            }
            user.email = newEmail;
        }

        // if (newUsername) {
        //     const usernameExists = await User.findOne({ username: newUsername });
        //     if (usernameExists) {
        //         return res.status(400).json({
        //             message: "Username already in use, try another one",
        //             success: false,
        //         });
        //     }
        //     user.username = newUsername;
        // }

        await user.save();

        return res.status(200).json({
            message: "Email updated successfully",
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};


export const resetPasswordToken = async(req, res) => {
    try{
        //get email from req. body
        const email = req.body.email;
        // const id = "66a4f38ce6df3d57858c0eb1";

        //check user for this email, email validation
        console.log(email);

        const user = await User.findOne({email: email});
        console.log(user);
        
        // User.f
        if(!user){
            return res.json({   
                success: false,
                message: "Your email is not registred with us",
            })
        }

        //generate token
        const token = crypto.randomBytes(20).toString("hex")

        //update user by adding token and expiring time 
        const updatedDetails = await User.findOneAndUpdate(
            {email: email}, 
            {token: token, resetPasswordExpires: Date.now() + 5*60*1000}, //30 minutes
            {new: true},
        );
        console.log("DETAILS", updatedDetails)

        //create url
        const url = `http://localhost:5173/reset-password/${token}`; //frontend link

        //send a mail containing the url
        await mailSender(email, resetPasswordTemplate(url), "Password Reset Link")

        return res.status(200).json({
            success: true,
            message: "Email sent Successfully"
            
        })
    }
    catch(error){
        console.log(error);
        return res.status(200).json({
            success: false,
            message: "Something went wrong , while generating token",
            error: error.message,
        })
    }
}

//reset password
export const  resetPassword = async(req, res) => {
    try{
        //data fetch
        const {password, confirmPassword, token} = req.body;
        //token ke aadhar per aap user details ko fetch karke laoge

        //validation
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password Do not Match",
            })
        }

        //get user details from db using token
        const UserDetails = await User.findOne({token: token});

        //if no entry -> invalid token
        if(!UserDetails){
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            })
        }

        //token expires 
        if(UserDetails.resetPasswordExpires < Date.now() ){
            return res.status(401).json({
                success: false,
                message: "Token is expired, please regenerate your token",
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update the password
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new: true},
        )

        await mailSender(UserDetails.email,resetPasswordSuccess(),"Successfully Reset Password")

        return res.status(200).json({
            success: true,
            message: "Password reset Successfully",
            token,
        })
    }
    catch(error){
        console.log(error);
        return res.status(200).json({
            success: false,
            message: "Something went wrong , while reset password",
        })
    }
}