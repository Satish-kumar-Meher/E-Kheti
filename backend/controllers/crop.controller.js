import mongoose from "mongoose"
import { Crop } from "../models/crops.model.js"
import { User } from "../models/user.model.js"




export const getAllcrops = async (req,res) => {
    try {
        const crops = await Crop.find()
        if (!crops) {
            return res.status(404).json({
                success : false,
                message: "crops are not there"
            })
        }
        return res.status(200).json({
            success : true,
            crops,
        })
    } catch (error) {
      console.log(error)
        return res.status(400).json({
            success : false,
            message : "internal server error"
        })
     
    }

}

export const getCropById = async (req,res) => {
    try {
        const cropId = req.params.id
        const crop = await Crop.findById(cropId)

        if (!crop) {
            return res.status(404).json({ success: false, message: 'Crop not found' });
          }


          return res.status(200).json({
            success: true,
            crop,
          });


    } catch (error) {
        console.error('Error fetching crop:', error);
        return res.status(500).json({ success: false, message: 'Server error. Could not fetch crop.' });
    }
}

export const updateSelectedCrops = async (req, res) => {
    try {
        const { selectedCropIds } = req.body;
        const userId = req.id;

        console.log(selectedCropIds)

        if (!Array.isArray(selectedCropIds)) {
            return res.status(400).json({ message: "Selected crops must be an array of IDs",success : false });

        }

         // Ensure the user selects at least 1 and at most 8 crops
    if (selectedCropIds.length < 1 || selectedCropIds.length > 8) {
        return res.status(400).json({ message: "You must select between 1 and 8 crops",success : false });
      }

    // Convert string IDs to ObjectId
    const objectIdArray = selectedCropIds.map(_id => {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
          throw new Error(`Invalid crop ID: ${_id}`);
      }
      return new mongoose.Types.ObjectId(_id);
  });

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found",success : false });
        }



        user.selectedCrops = objectIdArray
        await user.save();

        return res.status(200).json({ message: "Crops selected successfully",success : true ,selectedCrops: user.selectedCrops });
    } catch (error) {
        console.log(`Error updating selected crops: ${error}`);
        return res.status(500).json({ message: "Internal server error",success : false });
    }
};

export const getSelectedCrops = async (req, res) => {
    try {
      const userId = req.id;  // Assuming the user ID is coming from your authentication middleware
  
      // Find the user
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the user has selected crops
      if (!user.selectedCrops || user.selectedCrops.length === 0) {
        return res.status(400).json({ message: "No crops selected" });
      }
  
      // Fetch the crop details for the selected crops
      const selectedCrops = await Crop.find({ _id: { $in: user.selectedCrops } });
  
      return res.status(200).json({
        message: "Selected crops retrieved successfully",
        selectedCrops
      });
    } catch (error) {
      console.error(`Error fetching selected crops: ${error}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  };