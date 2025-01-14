import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for the product'],
    maxlength: [5, 'Product price cannot exceed 5 digits'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide the available quantity'],
    default: 1,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for the product'],
    enum: [
      'Grains',
      'Vegetables',
      'Fruits',
      'Legumes',
      'Dairy',
      'Poultry',
      'Seeds',
      'Other',
    ],
    default: 'Other',
  },
  location: {
    type: String,
    required: [true, 'Please provide the location where the product is available'],
  },
//   images: [
//     {
//       url: {
//         type: String,
//         required: true,
//       },
//       public_id: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
image: 
{
  type: String,
  required : true,
},
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for farmers/buyers
    required: true,
  },
  contactNumber: {
    type: String,
    required: [true, 'Please provide a contact number'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
      },
      profilePicture : {
        type : String,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true
    // Useful for perishable products like fruits or vegetables
  },
  isOrganic: {
    type: Boolean,
    default: false, // Mark if the product is organic
  },
//   tags: [
//     {
//       type: String,
//     },
//   ],
});

export const Product = mongoose.model('Product', productSchema);
