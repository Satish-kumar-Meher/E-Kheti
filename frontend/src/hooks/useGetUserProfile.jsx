import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const useGetUserProfile = (userId) => {
    console.log("userProfile function is called")
    const dispatch = useDispatch();
    // const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log("try blog entry")
                const res = await axios.get(`http://localhost:9000/ekheti/v1/user/${userId}/profile`, { withCredentials: true });
                if (res.data.success) { 
                    console.log("user :",res.data.user)
                    dispatch(setUserProfile(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserProfile();
    }, [userId]);
};
export default useGetUserProfile;


// import { setUserProfile } from "@/redux/authSlice";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// const useGetUserProfile = (userId) => {
//     console.log("useGetUserProfile function is called");
//     console.log(`userId: ${userId}`);

//     const dispatch = useDispatch();
//     // const [userProfile, setUserProfile] = useState(null);


//     const fetchUserProfile = async () => {
//         console.log("fetch user is called")
//         try {
//             console.log(`Attempting to fetch user profile from: http://localhost:9000/ekheti/v1/user/${userId}/profile`);
//             const res = await axios.get(
//                 `http://localhost:9000/ekheti/v1/user/${userId}/profile`, 
//                 { withCredentials: true }
//             );
//             if (res.data.success) { 
//                 console.log("Fetched user data:", res.data.user);
//                 dispatch(setUserProfile(res.data.user));
//             } else {
//                 console.log("fetching in user details")
//                 console.warn("API responded with success:false", res.data);
//             }
//         } catch (error) {
//             console.log("error in fetching user")
//             console.error("Error in fetchUserProfile:", error);
//         }
//     };
//     useEffect(() => {
//         console.log("use effect is called")
//         fetchUserProfile();
//         console.log("fetchuserprofile is called")
//     }, [userId]);
// };

// export default useGetUserProfile;


// import { setUserProfile } from "@/redux/authSlice";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// // Function outside the hook
// const fetchUserProfileData = async (userId, dispatch) => {
//     try {
//         const res = await axios.get(
//             `http://localhost:9000/ekheti/v1/user/${userId}/profile`, 
//             { withCredentials: true }
//         );
//         if (res.data.success) {
//             dispatch(setUserProfile(res.data.user));
//         } else {
//             console.warn("API responded with success:false", res.data);
//         }
//     } catch (error) {
//         console.error("Error in fetchUserProfile:", error);
//     }
// };

// // Custom hook
// const useGetUserProfile = (userId) => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (userId) {
//             fetchUserProfileData(userId, dispatch);
//         }
//     }, [userId, dispatch]);
// };

// export default useGetUserProfile;


// import { setUserProfile } from "@/redux/authSlice";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const useGetUserProfile = (userId) => {
//     console.log("useGetUserProfile function is called");
//     console.log(`userId: ${userId}`);

//     const dispatch = useDispatch();
//     console.log("dispatch",dispatch)

//     const fetchUserProfile = async () => {
//         console.log("fetchUserProfile called");
//         try {
//             console.log(`Fetching user profile from: http://localhost:9000/ekheti/v1/user/${userId}/profile`);
//             const res = await axios.get(
//                 `http://localhost:9000/ekheti/v1/user/${userId}/profile`, 
//                 { withCredentials: true }
//             );
//             if (res.data.success) { 
//                 console.log("Fetched user data:", res.data.user);
//                 dispatch(setUserProfile(res.data.user));
//             } else {
//                 console.warn("API responded with success:false", res.data);
//             }
//         } catch (error) {
//             console.error("Error in fetchUserProfile:", error);
//         }
//     };

//     useEffect(() => {
//         console.log("useEffect triggered with userId:", userId);
//         if (userId) {
//             fetchUserProfile();
//         } else {
//             console.log("userId is undefined or null");
//         }
//     }, []);
// };

// export default useGetUserProfile;
