import express from 'express';
import { getAllcrops, getCropById, getSelectedCrops, updateSelectedCrops } from '../controllers/crop.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';


const router = express.Router();





// Route to get all crops
router.get('/all', getAllcrops);

// Route to get crop by ID
router.get('/cropdetails/:id', getCropById);

// Route to update selected crops for the user (must be authenticated)
router.post('/selectcrops', isAuthenticated, updateSelectedCrops);

// Route to get selected crops for the authenticated user
router.get('/selectedcrops', isAuthenticated, getSelectedCrops);

export default router;