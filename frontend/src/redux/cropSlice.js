import {createSlice} from "@reduxjs/toolkit"


const cropSlice = createSlice({
    name:"crop",
    initialState:{
        
        Crops:null,
        singleCrop : null,
    },
    reducers:{
        // actions
        
        setAllCrops : (state,action) => {
            state.Crops = action.payload;
        },
        setSingleCrop : (state,action) => {
            state.singleCrop = action.payload;
        },
    }
});
export const {
   setAllCrops,
   setSingleCrop,
} = cropSlice.actions;
export default cropSlice.reducer;