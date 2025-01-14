// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
// import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
// import { Loader2 } from "lucide-react"
// import { useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// export const EditProfile = ({ open, setOpen }) => {
//     const imageRef = useRef();
//     const { user } = useSelector(store => store.auth);
//     const [input, setInput] = useState({
//         profilePicture: user?.profilePicture,
//         bio: user?.bio,
//         gender: user?.gender
//     });
//     const navigate = useNavigate();
//     const dispatch = useDispatch();


//     const fileChangeHandler = (e) => {
//         const file = e.target.files?.[0];
//         if (file) setInput({ ...input, profilePicture: file });
//     }

//     const selectChangeHandler = (value) => {
//         setInput({ ...input, gender: value });
//     }


//     const editProfileHandler = async () => {
//         console.log(input);
//         const formData = new FormData();
//         formData.append("bio", input.bio);
//         formData.append("gender", input.gender);
//         if(input.profilePicture){
//             formData.append("profilePicture", input.profilePicture);
//         }
//         try {
//             setLoading(true);
//             const res = await axios.post('http://localhost:3000/api/v1/user/profile/edit', formData,{
//                 headers:{
//                     'Content-Type':'multipart/form-data'
//                 },
//                 withCredentials:true
//             });
//             if(res.data.success){
//                 const updatedUserData = {
//                     ...user,
//                     bio:res.data.user?.bio,
//                     profilePicture:res.data.user?.profilePicture,
//                     gender:res.data.user.gender
//                 };
//                 dispatch(setAuthUser(updatedUserData));
//                 navigate(`/profile/${user?._id}`);
//                 toast.success(res.data.message);
//             }

//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.messasge);
//         } finally{
//             setLoading(false);
//         }
//     }

//     return(
//         <Dialog open={open} onOpenChange={setOpen} >
//             <DialogContent  onInteractOutside={() => setOpen(false)}>
//                             <DialogTitle className="text-center font-semibold text-customColor text-3xl">
//                                 Edit Your Profile
//                             </DialogTitle>
//                             <div className='flex max-w-2xl mx-auto pl-10'>
//             <section className='flex flex-col gap-6 w-full my-8'>
//                 <h1 className='font-bold text-xl'>Edit Profile</h1>
//                 <div className='flex items-center justify-between bg-gray-100 rounded-xl p-4'>
//                     <div className='flex items-center gap-3'>
//                         <Avatar>
//                             <AvatarImage src={user?.profilePicture} alt="post_image" />
//                             <AvatarFallback>CN</AvatarFallback>
//                         </Avatar>
//                         <div>
//                             <h1 className='font-bold text-sm'>{user?.username}</h1>
//                             <span className='text-gray-600'>{user?.bio || 'Bio here...'}</span>
//                         </div>
//                     </div>
//                     <input ref={imageRef} onChange={fileChangeHandler} type='file' className='hidden' />
//                     <Button onClick={() => imageRef?.current.click()} className='bg-[#0095F6] h-8 hover:bg-[#318bc7]'>Change photo</Button>
//                 </div>
//                 <div>
//                     <h1 className='font-bold text-xl mb-2'>Bio</h1>
//                     <Textarea value={input.bio} onChange={(e) => setInput({ ...input, bio: e.target.value })} name='bio' className="focus-visible:ring-transparent" />
//                 </div>
//                 <div>
//                     <h1 className='font-bold mb-2'>Gender</h1>
//                     <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
//                         <SelectTrigger className="w-full">
//                             <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectGroup>
//                                 <SelectItem value="male">Male</SelectItem>
//                                 <SelectItem value="female">Female</SelectItem>
//                             </SelectGroup>
//                         </SelectContent>
//                     </Select>
//                 </div>
//                 <div className='flex justify-end'>
//                     {
//                         loading ? (
//                             <Button className='w-fit bg-[#0095F6] hover:bg-[#2a8ccd]'>
//                                 <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                                 Please wait
//                             </Button>
//                         ) : (
//                             <Button onClick={editProfileHandler} className='w-fit bg-[#0095F6] hover:bg-[#2a8ccd]'>Submit</Button>
//                         )
//                     }
//                 </div>
//             </section>
//         </div>
//                             </DialogContent>
//         </Dialog>
//     )
// }







import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // Assuming you have a reusable Input component
import { Loader2 } from "lucide-react";
import { setAuthUser, setUserProfile } from "@/redux/authSlice";
// import "./editprofile.css";

export const EditProfile = () => {
    const imageRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        bio: user?.bio || "",
        gender: user?.gender || "",
        phoneNumber: user?.phoneNumber || "",
        role: user?.role || "",
        profilePicture: user?.profilePicture || "",
        username: user?.username || "",
        address: {
            country: user.address.country || "",
            state: user.address.state || "",
            district: user.address.district || "",
            block: user.address.block || "",
            town: user.address.town || "",
            village: user.address.village || "",
            PIN: user.address.PIN || "",
        },
    });

    // const [address, setAddress] = useState(user?.address || {});
    const [loading, setLoading] = useState(false);

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, profilePicture: file });
    };

    // const selectChangeHandler = (value) => {
    //     setInput({ ...input, gender: value });
    // };

    const selectChangeHandler = (value) => {
        setInput((prevInput) => ({
            ...prevInput,
            gender: value,
        }));
    };

    const selectRoleHandler = (value) => {
        setInput((prevInput) => ({
            ...prevInput,
            role: value,
        }));
    };

    
    const editProfileHandler = async () => {
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("role", input.role);
        formData.append("username", input.username);
    
        // Add address fields
        Object.keys(input.address).forEach((key) => {
            formData.append(`address[${key}]`, input.address[key]);
        });
    
        if (input.profilePicture) {
            formData.append("profilePicture", input.profilePicture);
        }
    
        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:9000/ekheti/v1/user/profile/edit",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
    
            if (res.data.success) {
                const updatedUserData = {
                    ...user,
                    ...res.data.user,
                };
                dispatch(setAuthUser(updatedUserData));
                dispatch(setUserProfile(updatedUserData));
    
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col  items-center justify-center min-h-screen bg-gray-50 p-6">
<div className="bg-white  rounded-xl shadow-lg w-full max-w-3xl p-6 overflow-y-auto">
    <div className="flex flex-col relative top-[85px] gap-6">
        <h1 className="font-bold text-[#2d504c] text-2xl">Edit Your Profile</h1>
        {/* Profile Picture */}
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4 max-w-screen-md">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage className="max-w-[25%] rounded-[50%]" src={user?.profilePicture} alt="profile_image" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/* <div>
                    <h1 className="font-bold text-sm">{user?.username}</h1>
                    <span className="text-gray-600">{user?.bio || "Bio here..."}</span>
                </div> */}
            </div>
            <input
                ref={imageRef}
                onChange={fileChangeHandler}
                type="file"
                className="hidden"
            />
            <Button
                onClick={() => imageRef?.current.click()}
                className="bg-[#2e645d] text-white px-4 py-2 rounded-lg hover:bg-[#489a8f]"
            >
                Change photo
            </Button>
        </div>
        {/* Username */}
        <div>
            <h1 className="font-bold text-lg text-[#1b3a36] mb-2">Username</h1>
            <Input
                value={input.username}
                onChange={(e) => setInput({ ...input, username: e.target.value })}
                placeholder="Enter your username"
                className="border text-[#326962] border-gray-300 rounded-lg p-2 w-full"
            />
        </div>
        {/* Bio */}
        <div>
            <h1 className="font-bold text-[#1b3a36] text-lg mb-2">Bio</h1>
            <Textarea
                value={input.bio}
                onChange={(e) => setInput({ ...input, bio: e.target.value })}
                name="bio"
                placeholder="Enter your bio"
                className="border text-[#326962] border-gray-300 rounded-lg p-2 w-full"
            />
        </div>
        {/* Gender */}
        <div>
            <h1 className="font-bold text-[#1b3a36] mb-2">Gender</h1>
            <select
            value={input.gender}
            onChange={(event) => selectChangeHandler(event.target.value)}
            className="w-full text-[#326962] border border-gray-300 rounded-lg p-2"
        >
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        </div>
        {/* Phone Number */}
        <div>
            <h1 className="font-bold text-[#1b3a36] text-lg mb-2">Phone Number</h1>
            <Input
                type="text"
                placeholder="Phone Number"
                value={input.phoneNumber}
                onChange={(e) => setInput({ ...input, phoneNumber: e.target.value })}
                className="border text-[#326962] border-gray-300 rounded-lg p-2 w-full"
            />
        </div>
        {/* Role */}
        <div>
            <h1 className="font-bold text-[#1b3a36] text-lg mb-2">Role</h1>
            <select
            value={input.role}
            onChange={(event) => selectRoleHandler(event.target.value)}
            className="w-full text-[#326962] border border-gray-300 rounded-lg p-2"
        >
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
        </select>
        </div>
        {/* Address */}
        {/* <div>
            <h1 className="font-bold text-[#1b3a36] text-lg mb-2">Address</h1>
            <div className="grid grid-cols-2 gap-4">
                {["Country", "State", "District", "Block", "Town", "Village", "PIN"].map(
                    (field) => (
                        <Input
                            key={field}
                            placeholder={field}
                            value={address[field.toLowerCase()] || ""}
                            onChange={(e) =>
                                addressChangeHandler(field.toLowerCase(), e.target.value)
                            }
                            className="border text-[#326962] border-gray-300 rounded-lg p-2 w-full"
                        />
                    )
                )}
            </div>
        </div> */}

        {/* Address */}
<div>
    <h1 className="font-bold text-[#1b3a36] text-lg mb-2">Address</h1>
    <div className="grid grid-cols-2 gap-4">
        {["country", "state", "district", "block", "town", "village", "PIN"].map(
            (field) => (
                <Input
                    key={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={input.address[field] || ""}
                    onChange={(e) =>
                        setInput((prevInput) => ({
                            ...prevInput,
                            address: {
                                ...prevInput.address,
                                [field]: e.target.value,
                            },
                        }))
                    }
                    className="border text-[#326962] border-gray-300 rounded-lg p-2 w-full"
                />
            )
        )}
    </div>
</div>


        {/* Submit Button */}
        <div className="flex justify-end">
            {loading ? (
                <Button className="w-fit bg-[#2e645d] text-white px-4 py-2 mb-7 rounded-lg hover:bg-[#489a8f]">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>
            ) : (
                <Button
                    onClick={editProfileHandler}
                    className="w-fit bg-[#2e645d] text-white px-4 py-2 mb-7 rounded-lg hover:bg-[#489a8f]"
                >
                    Submit
                </Button>
            )}
        </div>
    </div>
</div>
</div>
    );
};














// return (
//     <Dialog open={open} onOpenChange={setOpen} className="p-40" >
//         <DialogContent onInteractOutside={() => setOpen(false)} >
//             <DialogTitle className="text-center font-semibold text-customColor text-3xl">
//                 Edit Your Profile
//             </DialogTitle>
//             <div>
//                 <section >
//                     <h1 className="font-bold text-xl">Edit Profile</h1>
//                     {/* Profile Picture */}
//                     <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
//                         <div className="flex items-center gap-3">
//                             <Avatar>
//                                 <AvatarImage
//                                     src={user?.profilePicture}
//                                     alt="profile_image"
//                                 />
//                                 <AvatarFallback>CN</AvatarFallback>
//                             </Avatar>
//                             <div>
//                                 <h1 className="font-bold text-sm">{user?.username}</h1>
//                                 <span className="text-gray-600">
//                                     {user?.bio || "Bio here..."}
//                                 </span>
//                             </div>
//                         </div>
//                         <input
//                             ref={imageRef}
//                             onChange={fileChangeHandler}
//                             type="file"
//                             className="hidden"
//                         />
//                         <Button
//                             onClick={() => imageRef?.current.click()}
//                             className="bg-[#0095F6] h-8 hover:bg-[#318bc7]"
//                         >
//                             Change photo
//                         </Button>
//                     </div>
//                     {/* Username */}
//                     <div>
//                         <h1 className="font-bold text-xl mb-2">Username</h1>
//                         <Input
//                             value={input.username}
//                             onChange={(e) =>
//                                 setInput({ ...input, username: e.target.value })
//                             }
//                             placeholder="Enter your username"
//                         />
//                     </div>
//                     {/* Bio */}
//                     <div>
//                         <h1 className="font-bold text-xl mb-2">Bio</h1>
//                         <Textarea
//                             value={input.bio}
//                             onChange={(e) =>
//                                 setInput({ ...input, bio: e.target.value })
//                             }
//                             name="bio"
//                             className="focus-visible:ring-transparent"
//                         />
//                     </div>
//                     {/* Gender */}
//                     <div>
//                         <h1 className="font-bold mb-2">Gender</h1>
//                         <Select
//                             defaultValue={input.gender}
//                             onValueChange={selectChangeHandler}
//                         >
//                             <SelectTrigger className="w-full">
//                                 <SelectValue />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectGroup>
//                                     <SelectItem value="male">Male</SelectItem>
//                                     <SelectItem value="female">Female</SelectItem>
//                                 </SelectGroup>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                     {/* Phone Number */}
//                     <div>
//                         <h1 className="font-bold text-xl mb-2">Phone Number</h1>
//                         <Input
//                             type="text"
//                             placeholder="Phone Number"
//                             value={input.phoneNumber}
//                             onChange={(e) =>
//                                 setInput({ ...input, phoneNumber: e.target.value })
//                             }
//                         />
//                     </div>
//                     {/* Role */}
//                     <div>
//                         <h1 className="font-bold text-xl mb-2">Role</h1>
//                         <Input
//                             type="text"
//                             placeholder="Role"
//                             value={input.role}
//                             onChange={(e) =>
//                                 setInput({ ...input, role: e.target.value })
//                             }
//                         />
//                     </div>
//                     {/* Address */}
//                     <div>
//                         <h1 className="font-bold text-xl mb-2">Address</h1>
//                         <div className="grid grid-cols-2 gap-4">
//                             <Input
//                                 placeholder="Country"
//                                 value={address.country || ""}
//                                 onChange={(e) =>
//                                     addressChangeHandler("country", e.target.value)
//                                 }
//                             />
//                             <Input
//                                 placeholder="State"
//                                 value={address.state || ""}
//                                 onChange={(e) =>
//                                     addressChangeHandler("state", e.target.value)
//                                 }
//                             />
//                             <Input
//                                 placeholder="District"
//                                 value={address.district || ""}
//                                 onChange={(e) =>
//                                     addressChangeHandler("district", e.target.value)
//                                 }
//                             />
//                             <Input
//                                 placeholder="Block"
//                                 value={address.block || ""}
//                                 onChange={(e) =>
//                                     addressChangeHandler("block", e.target.value)
//                                 }
//                             />
//                             <Input
//                                 placeholder="Town"
//                                 value={address.town || ""}
//                                 onChange={(e) =>
//                                     addressChangeHandler("town", e.target.value)
//                                 }
//                             />
//                             <Input
//                                 placeholder="Village"
//                                 value={address.village || ""}
//                                 onChange={(e) =>
//                                     addressChangeHandler("village", e.target.value)
//                                 }
//                             />
//                             <Input
//                                 placeholder="PIN"
//                                 value={address.PIN || ""}
//                                 onChange={(e) =>
//                                     addressChangeHandler("PIN", e.target.value)
//                                 }
//                             />
//                         </div>
//                     </div>
//                     {/* Submit Button */}
//                     <div className="flex justify-end">
//                         {loading ? (
//                             <Button className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]">
//                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                 Please wait
//                             </Button>
//                         ) : (
//                             <Button
//                                 onClick={editProfileHandler}
//                                 className="w-fit bg-[#0095F6] hover:bg-[#2a8ccd]"
//                             >
//                                 Submit
//                             </Button>
//                         )}
//                     </div>
//                 </section>
//             </div>
//         </DialogContent>
//     </Dialog>
// );