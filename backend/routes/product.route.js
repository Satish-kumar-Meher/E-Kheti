import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addProduct, addProductReview, deleteProduct, deleteProductReview, getAllProducts, getProductById, getProductReviews, getUserProdduct, updateProduct } from "../controllers/product.controller.js";


const router = express.Router();

router.route("/addproduct").post(isAuthenticated, upload.single('image'), addProduct);
router.route("/allproduct").get(isAuthenticated,getAllProducts);
router.route("/userproduct/all").get(isAuthenticated, getUserProdduct);
router.route("/productdetails/:id").get(isAuthenticated,getProductById);
router.route("/:id/updateproduct").post(isAuthenticated,updateProduct);
router.route("/deleteproduct/:id").delete(isAuthenticated,deleteProduct);
router.route("/:id/addreview").post(isAuthenticated,addProductReview);
router.route("/:id/productreview/all").get(isAuthenticated,getProductReviews);
router.route("/deletereview/:id").delete(isAuthenticated,deleteProductReview)

export default router;
