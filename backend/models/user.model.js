import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:
    {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    profilePicture:
    {
        type: String,
        default: ''
    },
    bio:
    {
        type: String,
        default: ''
    },

    gender:
    {
        type: String,
        enum: ['male', 'female']
    },
    followers:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    following:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    posts:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],
    bookmarks:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }
        ],

    selectedCrops : 
    [
        {
            type: mongoose.Schema.Types.ObjectId,
                ref: 'Crop'
        }
    ],
    addedProducts :
    [
        {
            type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
        }
    ],
    favoriteProducts :
    [
        {
            type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
        }
    ],
    address : 
    {
        country : {

            type : String,
             default: ''
        },
        state : {

            type : String,
             default: ''
        },
        district : {

            type : String,
             default: ''
        },
        block : {

            type : String,
             default: ''
        },
        town : {

            type : String,
             default: ''
        },
        PIN : {
            type : Number,
             default: ''
        },
        village : {

            type : String,
             default: ''
        }
    },
    phoneNumber : 
    {
        type : Number,
         default: ''
    },
    role : 
    {
        type : String,
        enum : ['Buyer','Seller'],
         default: 'Seller'
    },
    dateCreated : 
    {
        type : Date,
        default : Date.now,
    },
    token : {
        type : String,
    },
    resetPasswordExpires : {
        type : Date,
    }

}, { timestamps: true });

export const User =  mongoose.model("User", userSchema)

