import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the product'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the product'],
  },
  price: {
    type: String,
    required: [true, 'Please provide a price for the product'],
  },
  cropName: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  image: 
    {
      type: String,
      required : true,
    },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  stock : {
    type : String,
    required : true,
  },
  views: {
    type: Number,
    default: 0,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export const Products =  mongoose.model('Products', productSchema);


