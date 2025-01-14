// // import { Dialog, DialogContent } from "@radix-ui/react-dialog"
// import { DialogHeader,DialogContent,Dialog } from "../ui/dialog"
// import { useEffect, useState } from "react"
// import axios from "axios"
// import { toast } from "react-toastify"





// export const SelectCrops = ({open,setOpen}) => {

// const [crops,setCrops] = useState([])
 
// const getCropsData = async () => {
//     try {
//         const res = await axios.get("http://localhost:9000/ekheti/v1/crop/all", {withCredentials:true})
//         if(res.success){
//             console.log(res.data.crops)
//             setCrops(res.data.crops)
//         }

        
//     } catch (error) {
//         console.log(error)
//         toast.error("crops data reload failded")
//     }
// }

// useEffect(() => {
// getCropsData()
// },[crops]) 

//     return(
//         <>
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogContent onInteractOutside={() => setOpen(false)}>
//             <DialogHeader className="text-center font-semibold">Select Your Crops</DialogHeader>
//             <div className="crop-selection-section">
//             <div className="crop-container">
//       {crops.map(crop => (
//         <div
//           key={crop.id}
//         //   className={`crop-item ${selectedCrops.includes(crop.id) ? 'selected' : ''}`}
//             className="crop-item"
//         //   onClick={() => toggleCropSelection(crop)}
//         >
//           <div className="crop-image-container">
//             <img src={crop.imgUrl} alt={crop.name} className="crop-image" />
//           </div>
//           <p className="crop-name">{crop.name}</p>
//         </div>
//       ))}
//     </div>
//     {/* <button onClick={handleSubmit} className="add-crops-button">Add Crops</button>   */}
//     <button  className="add-crops-button">Add Crops</button>  


//     </div>

//             </DialogContent>
//         </Dialog>
//         </>
//     )
// }






import { Dialog, DialogContent , DialogTitle, } from '../ui/dialog';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./selectcrops.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import { setAllCrops } from '@/redux/cropSlice';

export const SelectCrops = ({ open, setOpen }) => {
    const [crops, setCrops] = useState([]);
    const [selectedCrops, setSelectedCrops] = useState([]);
    // console.log("select dialog is opend",open)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth);
    const { Crops } = useSelector(store => store.crop);
    const getCropsData = async () => {
        try {
            const res = await axios.get("http://localhost:9000/ekheti/v1/crop/all", { withCredentials: true });
            // console.log(res)
            if (res.data.success) {

                setCrops(res.data.crops);
                dispatch(setAllCrops(res.data.crops));
            } else {
                toast.error("Failed to load crops");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load crops");
        }
    };

    useEffect(() => {
        getCropsData(); // Run only once on component mount
        console.log("all crops",Crops)
    }, []);


    const toggleCropSelection = (crop) => {
        if (selectedCrops.includes(crop._id)) {
            setSelectedCrops(selectedCrops.filter(_id => _id !== crop._id));
        } else {
            setSelectedCrops([...selectedCrops, crop._id]);
        }
    };


    const handleSubmit = async () => {
        // console.log(selectedCrops)
        if (selectedCrops.length === 0) {
            toast.error("Please select at least one crop.");
            return;
        }
        if (selectedCrops.length > 8) {
            toast.error("You can only select up to 8 crops.");
            return;
        }
        if(user){
        try {
            
            const res = await axios.post(
                "http://localhost:9000/ekheti/v1/crop/selectcrops",
                { selectedCropIds: selectedCrops },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            )

            if(res.data.success){
                toast.success("crops selected successfully")
                const updatedUserData = {
                    ...user,
                    selectedCrops:res.data.selectedCrops
                };
                dispatch(setAuthUser(updatedUserData));
                navigate("/features")
                setSelectedCrops([])
                setOpen(false)
            }else{
                toast.error("failed to select register")
            }

        } catch (error) {
            console.log("error in subbmitting selected crops:",error);
            toast.error(error.response.data.message)
            setSelectedCrops([])
        }
    }
    else{
        toast.error("Please login first")
        navigate("/login")
    }
    }





    return (
        <Dialog open={open} onOpenChange={setOpen} className="App">
            <DialogContent  onInteractOutside={() => setOpen(false)}>
                <DialogTitle className="text-center font-semibold text-customColor text-3xl">
                    Select Your Crops
                </DialogTitle>
                <div className="crop-selection-section">
                    <div className="crop-container">
                        {crops.map((crop,index) => (
                            <div key={index} 
                            className={`crop-item ${selectedCrops.includes(crop._id)  ? 'selected' : ''}`}
                            onClick={() => toggleCropSelection(crop)}
                            >
                                <div className="crop-image-container">
                                    <img src={crop.imgUrl} alt={crop.name} className="crop-image" />
                                </div>
                                <p className="crop-name">{crop.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="btn-container">
                    <button onClick={handleSubmit} className="add-crops-button">
                        Add Crops
                    </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};







// import { Dialog, DialogContent , DialogTitle, DialogDescription} from '../ui/dialog';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// // import "./selectcrops.css";

// // JSX
// export const SelectCrops = ({ open, setOpen }) => {
//     const [crops, setCrops] = useState([]);
//     console.log("select dialog is opend", open);

//     const getCropsData = async () => {
//         try {
//             const res = await axios.get("http://localhost:9000/ekheti/v1/crop/all", { withCredentials: true });
//             console.log(res);
//             if (res.data.success) {
//                 setCrops(res.data.crops);
//             } else {
//                 toast.error("Failed to load crops");
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to load crops");
//         }
//     };

//     useEffect(() => {
//         getCropsData(); // Run only once on component mount
//     }, []);

//     return (
//         <Dialog open={open} onOpenChange={setOpen} className="text-center p-5 font-sans">
//             <DialogContent onInteractOutside={() => setOpen(false)}>
//                 <DialogTitle className="text-lg font-semibold text-center">
//                     Select Your Crops
//                 </DialogTitle>
//                 <DialogDescription className="text-sm text-center">
//                     Choose from the list below to add your crops.
//                 </DialogDescription>
//                 <div className="mb-10">
//                     <div className="flex flex-wrap justify-center gap-5 my-5">
//                         {crops.map((crop) => (
//                             <div
//                                 key={crop.id}
//                                 className="text-center cursor-pointer transition-transform hover:scale-105 w-24"
//                             >
//                                 <div className="w-20 h-20 mb-2 overflow-hidden rounded-full bg-white shadow-md transition-all">
//                                     <img src={crop.imgUrl} alt={crop.name} className="object-cover w-full h-full" />
//                                 </div>
//                                 <p className="text-sm font-medium -left-3">{crop.name}</p>
//                             </div>
//                         ))}
//                     </div>
//                     <button
//                         onClick={() => console.log("Handle submit")}
//                         className="mt-5 px-4 py-2 text-white text-lg rounded bg-gradient-to-r from-green-500 to-gray-800 hover:bg-opacity-80"
//                     >
//                         Add Crops
//                     </button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };
