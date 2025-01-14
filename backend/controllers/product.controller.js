import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Product } from "../models/productss.model.js";
import { User } from "../models/user.model.js";


// const checkIfSeller = async (req, res, next) => {

//     const userId = req.id
//     const loggedInUser = await User.findById(userId)

//     // Check if the user has a role set
//     if (!loggedInUser.role) {
//       return res.status(400).json({
//         success: false,
//         message: 'Role is not set. Please update your profile to select a role.',
//       });
//     }
  
//     // Check if the user is a seller
//     if (loggedInUser.role !== 'seller') {
//       return res.status(403).json({
//         success: false,
//         message: 'Access denied. Only sellers can perform this action.',
//       });
//     }
//   req.id = userId;
//     next(); // Proceed to the next middleware or route handler
//   };

export const addProduct = async (req,res) => {
    try {
        // checkIfSeller(req, res, async () => {
      const { name, description, price, stock, category, location, contactNumber, isOrganic, expiryDate } = req.body;
      
      const sellerId = req.id; // Assuming the seller is authenticated and their ID is in req.user
      const image = req.file

      if (!image) return res.status(400).json({ message: 'Image required' });

        // image upload 
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        // buffer to data uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);


    //   // Create a new product
    //   const newProduct = new Product({
    //     name,
    //     description,
    //     price,
    //     quantity,
    //     category,
    //     location,
    //     seller: sellerId,
    //     contactNumber,
    //     isOrganic,
    //     tags,
    //     expiryDate,
    //   });
  

const product = await Product.create({
    name,
    description,
    price,
    stock,
    category,
    location,
    contactNumber,
    isOrganic,
    expiryDate,
    seller : sellerId,
    image: cloudResponse.secure_url,


})

const user = await User.findById(sellerId);
       
   if(user) {
    user.addedProducts.push(product._id)
    await user.save();
   }
  
   await product.populate({ path: 'seller', select: '-password' });

      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product,
      });
    // });
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ success: false, message: 'Server error. Could not create product.' });
    }
  };

  // Get all products
export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find().populate({ path : 'seller', select :'username profilePicture'}); // Populating seller details (username, profile picture)
      return res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ success: false, message: 'Server error. Could not fetch products.' });
    }
  };
  


  export const getUserProdduct = async (req, res) => {
    try {
        const sellerId = req.id;

        const products = await Product.find({ seller: sellerId }).sort({ createdAt: -1 }).populate({
            path: 'seller',
            select: 'username, profilePicture'
        })


        return res.status(200).json({
            products,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

  // Get single product by ID
export const getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
  
      const product = await Product.findById(productId).populate('seller', 'username profilePicture');
      
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      return res.status(500).json({ success: false, message: 'Server error. Could not fetch product.' });
    }
  };

//   // Update product (Only the seller can update their own product)
// export const updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const sellerId = req.id; // Assuming the seller's ID is in req.user

//     let product = await Product.findById(productId);
    
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     // Check if the authenticated user is the seller
//     if (product.seller.toString() !== sellerId.toString()) {
//       return res.status(403).json({ success: false, message: 'Unauthorized to update this product' });
//     }

//     // Update product fields
//     const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });

//     return res.status(200).json({
//       success: true,
//       message: 'Product updated successfully',
//       product: updatedProduct,
//     });
//   } catch (error) {
//     console.error('Error updating product:', error);
//     return res.status(500).json({ success: false, message: 'Server error. Could not update product.' });
//   }
// };


export const updateProduct = async (req, res) => {
  try {
      const productId = req.params.id;
      const sellerId = req.id;
      
      // Find the product by ID
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Check if the authenticated user is the seller
    if (product.seller.toString() !== sellerId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized to update this product' });
    }

      // Update only the fields that are provided (and not blank)
      if (req.body.name) product.name = req.body.name;
      if (req.body.price) product.price = req.body.price;
      if (req.body.category) product.category = req.body.category;
      if (req.body.description) product.description = req.body.description;
      if (req.body.stock !== undefined) product.stock = req.body.stock; // For numeric fields, explicitly check for undefined
      if (req.body.location) product.location = req.body.location;
      if (req.body.expiryDate) product.expiryDate = req.body.expiryDate;


      // Save the updated product
      // const updatedProduct =
       await product.save();

      return res.status(200).json({
          message: 'Product updated successfully',
          product,
          // : updatedProduct,
      });
  } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Server error', error });
  }
};


// Delete product (Only the seller can delete their own product)
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Get the product ID from request params
    const sellerId = req.id; // Get the seller (authenticated user) ID from request

    // Find the product by its ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if the authenticated user is the owner (seller) of the product
    if (product.seller.toString() !== sellerId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this product' });
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    // Remove the product ID from the seller's product list (assuming there's a reference in the user model)
    let seller = await User.findById(sellerId);
    seller.products = seller.products.filter(id => id.toString() !== productId); // Remove the product ID
    await seller.save(); // Save the updated seller document

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ success: false, message: 'Server error. Could not delete product.' });
  }
};



// Add a review to a product
export const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const userId = req.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const alreadyReviewed = product.reviews.find((rev) => rev.user.toString() === userId.toString());

    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: 'Product already reviewed' });
    }

    const reviewedUser = await User.findById(userId)


    const review = {
      user: userId,
      name: reviewedUser.username,
      profilePicture : reviewedUser.profilePicture,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();

    return res.status(201).json({
      success: true,
      message: 'Review added',
      // product,
    });
  } catch (error) {
    console.error('Error adding review:', error);
    return res.status(500).json({ success: false, message: 'Server error. Could not add review.' });
  }
};

// Get all reviews of a product
export const getProductReviews = async (req, res) => {
  try {
    const productId = req.params.id;
    
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ success: false, message: 'Server error. Could not fetch reviews.' });
  }
};

// // Delete a product review
// export const deleteProductReview = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const reviewId = req.id;
    
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     product.reviews = product.reviews.filter((rev) => rev.user.toString() !== reviewId.toString());

//     product.numOfReviews = product.reviews.length;
    
//     product.ratings =
//       product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

//     await product.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Review deleted successfully',
//     });
//   } catch (error) {
//     console.error('Error deleting review:', error);
//     return res.status(500).json({ success: false, message: 'Server error. Could not delete review.' });
//   }
// };



// Delete a product review
export const deleteProductReview = async (req, res) => {
  try {
    const productId = req.params.id; // Product ID from the request parameters
    const userId = req.id; // Get the ID of the authenticated user from req.id

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Filter out the review where the user matches the authenticated user's ID
    product.reviews = product.reviews.filter((rev) => rev.user.toString() !== userId.toString());

    // Update the number of reviews
    product.numOfReviews = product.reviews.length;

    // Recalculate the average ratings
    product.ratings =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        : 0; // Set ratings to 0 if no reviews left

    // Save the updated product
    await product.save();

    return res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ success: false, message: 'Server error. Could not delete review.' });
  }
};
