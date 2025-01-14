// // import React from 'react'

// // export const  ProfilePage = () => {
// //   return (
// //     <div className='h-[100vh] w-[100vw] bg-red-400'>
// //       <h1>PROFILE PAGE</h1>
// //     </div>
// //   )
// // }


// import React, { useState } from "react";
// import "./ProfilePage.css";

// export const ProfilePage = () => {
//   // Active tab state
//   const [activeTab, setActiveTab] = useState("about");

//   // Sample data
//   const user = {
//     address: {
//       country: "USA",
//       state: "New Hampshire",
//       district: "Rockingham",
//       block: "Block 1",
//       town: "Portsmouth",
//       PIN: 123456,
//       village: "Westfield",
//     },
//     phoneNumber: 9876543210,
//     role: "Buyer",
//     dateCreated: new Date("2019-11-26"),
//     gender: "male",
//   };

//   const posts = ["post1.jpg", "post2.jpg", "post3.jpg"];
//   const products = ["product1.jpg", "product2.jpg"];
//   const bookmarkedPosts = ["bookmarked1.jpg", "bookmarked2.jpg"];
//   const favoriteProducts = ["favorite1.jpg", "favorite2.jpg"];

//   // Render the content based on the active tab
//   const renderContent = () => {
//     switch (activeTab) {
//       case "about":
//         return (
//           <div className="about-tab">
//             <h3>About</h3>
//             <p><strong>Country:</strong> {user.address.country}</p>
//             <p><strong>State:</strong> {user.address.state}</p>
//             <p><strong>District:</strong> {user.address.district}</p>
//             <p><strong>Block:</strong> {user.address.block}</p>
//             <p><strong>Town:</strong> {user.address.town}</p>
//             <p><strong>PIN:</strong> {user.address.PIN}</p>
//             <p><strong>Village:</strong> {user.address.village}</p>
//             <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
//             <p><strong>Role:</strong> {user.role}</p>
//             <p><strong>Date Created:</strong> {user.dateCreated.toDateString()}</p>
//             <p><strong>Gender:</strong> {user.gender}</p>
//           </div>
//         );
//       case "posts":
//         return (
//           <div className="posts-tab">
//             <h3>Posts</h3>
//             <div className="images-grid">
//               {posts.map((post, index) => (
//                 <img key={index} src={post} alt={`Post ${index + 1}`} />
//               ))}
//             </div>
//           </div>
//         );
//       case "products":
//         return (
//           <div className="products-tab">
//             <h3>Products</h3>
//             <div className="images-grid">
//               {products.map((product, index) => (
//                 <img key={index} src={product} alt={`Product ${index + 1}`} />
//               ))}
//             </div>
//           </div>
//         );
//       case "bookmarked":
//         return (
//           <div className="bookmarked-tab">
//             <h3>Bookmarked Posts</h3>
//             <div className="images-grid">
//               {bookmarkedPosts.map((post, index) => (
//                 <img key={index} src={post} alt={`Bookmarked ${index + 1}`} />
//               ))}
//             </div>
//           </div>
//         );
//       case "favorite":
//         return (
//           <div className="favorite-tab">
//             <h3>Favorite Products</h3>
//             <div className="images-grid">
//               {favoriteProducts.map((product, index) => (
//                 <img key={index} src={product} alt={`Favorite ${index + 1}`} />
//               ))}
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="main-container">
//     <div className="profile-page">
//       {/* Profile Header */}
//       <div className="profile-header">
//         <img
//           src="https://via.placeholder.com/100"
//           alt="Profile"
//           className="profile-picture"
//         />
//         <div className="profile-details">
//           <h1 className="name">Sam Lanson</h1>
//           <p className="connections">250 connections</p>
//           <p className="bio">Bio</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="tabs">
//         <ul>
//           <li
//             className={activeTab === "about" ? "active" : ""}
//             onClick={() => setActiveTab("about")}
//           >
//             About
//           </li>
//           <li
//             className={activeTab === "posts" ? "active" : ""}
//             onClick={() => setActiveTab("posts")}
//           >
//             Posts
//           </li>
//           <li
//             className={activeTab === "products" ? "active" : ""}
//             onClick={() => setActiveTab("products")}
//           >
//             Your Products
//           </li>
//           <li
//             className={activeTab === "bookmarked" ? "active" : ""}
//             onClick={() => setActiveTab("bookmarked")}
//           >
//             Saved Posts
//           </li>
//           <li
//             className={activeTab === "favorite" ? "active" : ""}
//             onClick={() => setActiveTab("favorite")}
//           >
//             Favorite Products
//           </li>
//         </ul>
//       </div>

//       {/* Content */}
//       <div className="tab-content">{renderContent()}</div>
//     </div>
//     </div>
//   );
// };







// import React, { useEffect, useState } from "react";
// import "./ProfilePage.css";
// import { Edit } from "lucide-react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// // import useGetuser from "@/hooks/useGetuser";
// // import { setuser } from "@/redux/authSlice";
// // import axios from "axios";

// export const ProfilePage = ({ isOwnProfile = false }) => {
//   const params = useParams()
//   const userId = params.id
//   console.log(userId)
//   // const dispatch = useDispatch()
//   // useGetuser(userId)
  

//   const [isFollowing, setIsFollowing] = useState(false);
//   const { user } = useSelector(store => store.auth);
//   const [userProfile,setUserProfile] = useState({})

//   const fetchUserProfile = async () => {
//     console.log("fetchUserProfile called");
//     try {
//         console.log(`Fetching user profile from: http://localhost:9000/ekheti/v1/user/${userId}/profile`);
//         const res = await axios.get(
//             `http://localhost:9000/ekheti/v1/user/${userId}/profile`, 
//             { withCredentials: true }
//         );
//         if (res.data.success) { 
//             console.log("Fetched user data:", res.data.user);
//             // dispatch(setUserProfile(res.data.user));
//             setUserProfile(res.data.user)
//         } else {
//             console.warn("API responded with success:false", res.data);
//         }
//     } catch (error) {
//         console.error("Error in fetchUserProfile:", error);
//     }
// };

// useEffect(() => {
//     console.log("useEffect triggered with userId:", userId);
//     if (userId) {
//         fetchUserProfile();
//     } else {
//         console.log("userId is undefined or null");
//     }
// }, []);



//   // console.log(user)
//   // const isLoggedInuser = user?._id === user?._id;
  
//   // Sample data
//   // const user = {
//   //   name: "Sam Lanson",
//   //   connections: 250,
//   //   bio: "Passionate about farming and tech.",
//   //   postsCount: 15,
//   //   followersCount: 500,
//   //   followingCount: 120,
//   //   address: {
//   //     country: "USA",
//   //     state: "New Hampshire",
//   //     district: "Rockingham",
//   //     block: "Block 1",
//   //     town: "Portsmouth",
//   //     PIN: 123456,
//   //     village: "Westfield",
//   //   },
//   //   phoneNumber: 9876543210,
//   //   role: "Buyer",
//   //   dateCreated: new Date("2019-11-26"),
//   //   gender: "male",
//   // };

//   const posts = ["post1.jpg", "post2.jpg", "post3.jpg"];
//   const products = ["product1.jpg", "product2.jpg"];
//   const bookmarkedPosts = ["bookmarked1.jpg", "bookmarked2.jpg"];
//   const favoriteProducts = ["favorite1.jpg", "favorite2.jpg"];

//   // Active tab state
//   const [activeTab, setActiveTab] = useState("about");
//   // Render the content based on the active tab
//   const renderContent = () => {
//     if (!userProfile) return <p>Loading...</p>; // Handle loading state
//     switch (activeTab) {
//       case "about":
//         return (
//           <div className="about-tab">
//             <p><strong>Role:</strong> {userProfile.role}</p>
//             <p><strong>Country:</strong> {userProfile.address.country}</p>
//             <p><strong>State:</strong> {userProfile.address.state}</p>
//             <p><strong>District:</strong> {userProfile.address.district}</p>
//             <p><strong>Block:</strong> {userProfile.address.block}</p>
//             <p><strong>Town:</strong> {userProfile.address.town}</p>
//             <p><strong>PIN:</strong> {userProfile.address.PIN}</p>
//             <p><strong>Village:</strong> {userProfile.address.village}</p>
//             <p><strong>Phone Number:</strong> {userProfile.phoneNumber}</p>
//             <p><strong>Date Created:</strong> {userProfile.dateCreated.toDateString()}</p>
//             <p><strong>Gender:</strong> {userProfile.gender}</p>
//           </div>
//         );
//       case "posts":
//         return (
//           <div className="posts-tab">
//             <h3>Posts</h3>
//             <div className="images-grid">
//               {posts.map((post, index) => (
//                 <img key={index} src={post} alt={`Post ${index + 1}`} />
//               ))}
//             </div>
//           </div>
//         );
//       case "products":
//         return (
//           <div className="products-tab">
//             <h3>Products</h3>
//             <div className="images-grid">
//               {products.map((product, index) => (
//                 <img key={index} src={product} alt={`Product ${index + 1}`} />
//               ))}
//             </div>
//           </div>
//         );
//       case "bookmarked":
//         return (
//           <div className="bookmarked-tab">
//             <h3>Bookmarked Posts</h3>
//             <div className="images-grid">
//               {bookmarkedPosts.map((post, index) => (
//                 <img key={index} src={post} alt={`Bookmarked ${index + 1}`} />
//               ))}
//             </div>
//           </div>
//         );
//       case "favorite":
//         return (
//           <div className="favorite-tab">
//             <h3>Favorite Products</h3>
//             <div className="images-grid">
//               {favoriteProducts.map((product, index) => (
//                 <img key={index} src={product} alt={`Favorite ${index + 1}`} />
//               ))}
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   // Handle follow/unfollow
//   const handleFollowToggle = () => {
//     setIsFollowing((prev) => !prev);
//   };

//   return (
//     <div className="main-container">
//       <div className="profile-page">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <img
//             src="https://via.placeholder.com/100"
//             alt="Profile"
//             className="profile-picture"
//           />
//           <div className="profile-details">
//             <h6 className="name">{userProfile.username}</h6>
//             <p className="bio">{userProfile.bio}</p>
//             </div>
//             <div className="profile-information">
//             <div className="profile-stats">
//               <span><strong>Posts:</strong> {userProfile.postsCount}</span><br />
//               <span><strong>Followers:</strong> {userProfile.followersCount}</span><br />
//               <span><strong>Following:</strong> {userProfile.followingCount}</span><br />
//             </div>
//             <div className="profile-actions">
//             {/* Conditional Button */}
//             {isOwnProfile ? (
//               <button className="edit-button"><Edit style={{ marginRight: '5px' }} size={18} />Edit Profile</button>
//             ) : (
//               <button
//                 className={`${isFollowing ? "unfollow-button" : "follow-button"}`}
//                 onClick={handleFollowToggle}
//               >
//                 {isFollowing ? "Unfollow" : "Follow"}
//               </button>
//             )}
//             </div>
//             </div>
          
//         </div>

//         {/* Tabs */}
//         <div className="tabs">
//           <ul>
//             <li
//               className={activeTab === "about" ? "active" : ""}
//               onClick={() => setActiveTab("about")}
//             >
//               About
//             </li>
//             <li
//               className={activeTab === "posts" ? "active" : ""}
//               onClick={() => setActiveTab("posts")}
//             >
//               Posts
//             </li>
//             <li
//               className={activeTab === "products" ? "active" : ""}
//               onClick={() => setActiveTab("products")}
//             >
//               Products
//             </li>
//             <li
//               className={activeTab === "bookmarked" ? "active" : ""}
//               onClick={() => setActiveTab("bookmarked")}
//             >
//               Saved 
//             </li>
//             <li
//               className={activeTab === "favorite" ? "active" : ""}
//               onClick={() => setActiveTab("favorite")}
//             >
//               Cart
//             </li>
//           </ul>
//         </div>

//         {/* Content */}
//         <div className="tab-content">{renderContent()}</div>
//       </div>
//     </div>
//   );
// };





import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// import { EditProfile } from "./EditProfile";

// import axios from "axios";

export const ProfilePage = ({ isOwnProfile = false }) => {
  const params = useParams();
  const userId = params.id;
  console.log(userId);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useGetUserProfile(userId);

  const [activeTab, setActiveTab] = useState("about");
  const [isFollowing, setIsFollowing] = useState(false);

  // const [openSelectbox, setOpenSelectbox] = useState(false);

  const { userProfile,user } = useSelector((store) => store.auth);
  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const posts = ["post1.jpg", "post2.jpg", "post3.jpg"];
  const products = ["product1.jpg", "product2.jpg"];
  const bookmarkedPosts = ["bookmarked1.jpg", "bookmarked2.jpg"];
  const favoriteProducts = ["favorite1.jpg", "favorite2.jpg"];

  console.log("user profile -> ",userProfile)
  // Handle null userProfile
  if (!userProfile) {
    return <p>Loading profile...</p>;
  }
  const renderContent = () => {
    // if (!userProfile) return <p>Loading...</p>; // Handle loading state
    
    switch (activeTab) {
      case "about":
        return (
          <div className="about-tab">
            <p><strong>Role:</strong> {userProfile.role}</p>
            <p><strong>Country:</strong> {userProfile.address?.country || "N/A"}</p>
            <p><strong>State:</strong> {userProfile.address?.state || "N/A"}</p>
            <p><strong>District:</strong> {userProfile.address?.district || "N/A"}</p>
            <p><strong>Block:</strong> {userProfile.address?.block || "N/A"}</p>
            <p><strong>Town:</strong> {userProfile.address?.town || "N/A"}</p>
            <p><strong>PIN:</strong> {userProfile.address?.PIN || "N/A"}</p>
            <p><strong>Village:</strong> {userProfile.address?.village || "N/A"}</p>
            <p><strong>Phone Number:</strong> {userProfile?.phoneNumber || "N/A"}</p>
            <p><strong>Date Created:</strong> {new Date(userProfile.dateCreated).toDateString()}</p>
            <p><strong>Gender:</strong> {userProfile?.gender || "N/A"}</p>
          </div>
        );
      case "posts":
        return (
          <div className="posts-tab">
         
            <div className="images-grid">
              {posts.map((post, index) => (
                <img key={index} src={post} alt={`Post ${index + 1}`} />
              ))}
            </div>
          </div>
        );
      case "products":
        return (
          <div className="products-tab">
            
            <div className="images-grid">
              {products.map((product, index) => (
                <img key={index} src={product} alt={`Product ${index + 1}`} />
              ))}
            </div>
          </div>
        );
      case "bookmarked":
        return (
          <div className="bookmarked-tab">
            
            <div className="images-grid">
              {bookmarkedPosts.map((post, index) => (
                <img key={index} src={post} alt={`Bookmarked ${index + 1}`} />
              ))}
            </div>
          </div>
        );
      case "favorite":
        return (
          <div className="favorite-tab">
            
            <div className="images-grid">
              {favoriteProducts.map((product, index) => (
                <img key={index} src={product} alt={`Favorite ${index + 1}`} />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <>
    <div className="main-container">
      <div className="profile-page">
        <div className="profile-header">
          {/* <img
            src={userProfile.profilePicture?(userProfile.profilePicture):("https://via.placeholder.com/100")}
            alt="Profile"
            className="profile-picture"
          /> */}
          <img
  src={userProfile.profilePicture}
  alt=""
  className="profile-picture"
/>


          {/* <Avatar className='h-32 w-32'>
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
          <div className="profile-details">
            <h6 className="name">{userProfile?.username}</h6>
            <p className="bio">{userProfile?.bio}</p>
          </div>
          <div className="profile-information">
            <div className="profile-stats">
              <span><strong>Posts:</strong> {userProfile?.postsCount || 0}</span><br />
              <span><strong>Followers:</strong> {userProfile?.followersCount || 0}</span><br />
              <span><strong>Following:</strong> {userProfile?.followingCount || 0}</span><br />
            </div>
            <div className="profile-actions">
              {isLoggedInUserProfile ? (
                <button className="edit-button" onClick={() => navigate("/editprofile")}>
                  <Edit style={{ marginRight: "5px" }} size={18} />
                  Edit Profile
                </button>
              ) : (
                <button
                  className={`${isFollowing ? "unfollow-button" : "follow-button"}`}
                  onClick={handleFollowToggle}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="tabs">
          <ul>
            <li
              className={activeTab === "about" ? "active" : ""}
              onClick={() => setActiveTab("about")}
            >
              About
            </li>
            <li
              className={activeTab === "posts" ? "active" : ""}
              onClick={() => setActiveTab("posts")}
            >
              Posts({userProfile.posts.length})
            </li>
            <li
              className={activeTab === "products" ? "active" : ""}
              onClick={() => setActiveTab("products")}
            >
              Products({userProfile.addedProducts.length})
            </li>
            <li
              className={activeTab === "bookmarked" ? "active" : ""}
              onClick={() => setActiveTab("bookmarked")}
            >
              Saved({userProfile.bookmarks.length})
            </li>
            <li
              className={activeTab === "favorite" ? "active" : ""}
              onClick={() => setActiveTab("favorite")}
            >
              Cart({userProfile.favoriteProducts.length})
            </li>
          </ul>
        </div>
        <div className="tab-content">{renderContent()}</div>
      </div>
    </div>
    {/* <EditProfile open={openSelectbox} setOpen={setOpenSelectbox}/> */}
    </>
  );
};
