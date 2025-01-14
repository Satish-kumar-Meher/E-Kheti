import { useEffect, useState } from "react";
// import { SlArrowRightCircle } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import "../css/homes.css"
import "../css/benifits.css"
import { Service } from "./Services";
import { About } from "./About";
import { Contact } from "./Contact";
// import { TypeAnimation } from "react-type-animation";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { SelectCrops } from "../components/layout/SelectCrops";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";



const backgroundImages = [
    // "https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2EwMDkta2Fib29tcGljcy0wODMzLmpwZw.jpg",
    // "https://uiparadox.co.uk/templates/farmer/assets/media/banner/hero-banner-2.png",
    // "https://images.rawpixel.com/image_social_landscape/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZmwzMjEwOTQyNzAzNy1wdWJsaWMtaW1hZ2Uta293c2lxNjUuanBn.jpg", // Add more images as needed
    // "https://images.rawpixel.com/image_social_landscape/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdXB3azYxNzgwMjg5LXdpa2ltZWRpYS1pbWFnZS1rb3dsM25sNy5qcGc.jpg",
    "https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA4L21vdGFybzdfcGhvdG9fb2ZfYV9wbGFudF9ncm93aW5nX2luX2dhcmRlbl9uYXR1cmFsX2xpZ2h0aW5nX3BsYV9lZGQwZDdhMi1hNWU4LTQxNmQtYmQzYi1iZWQ4YzY4OThiNDdfMS5qcGc.jpg"
];


export const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [openSelectbox, setOpenSelectbox] = useState(false);

    const navigate = useNavigate() 
    const location = useLocation()
    const dispatch =  useDispatch()
    const {user} = useSelector(store=>store.auth);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + backgroundImages.length) % backgroundImages.length);
    };


   
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         handleNextImage();
    //     }, 5000); // Change image every 5 seconds
    //     const fetchUser = async () => {
    //         try {
    //           const response = await axios.get(
    //             "http://localhost:9000/auth/login/success",
    //             { withCredentials: true }
    //           );
    //           console.log(response)
    //           if (response.data.success) {
    //               navigate("/");
    //             toast.success("google login succesfully")
                
                
    //           }
    //         } catch (error) {
    //           console.error("Error fetching user data:", error);
    //           toast.error("goole login failed");
    //         }
    //       };
    //       fetchUser()
    //     return () => clearInterval(interval); // Cleanup the interval on component unmount

        

    
    // }, []);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       handleNextImage();
    //     }, 5000); // Change image every 5 seconds
    
    //     // Check if redirected from Google login
    //     const isGoogleLogin = new URLSearchParams(location.search).get("googleLogin");
    
    //     const fetchUser = async () => {
    //       try {
    //         const response = await axios.get(
    //           "http://localhost:9000/auth/login/success",
    //           { withCredentials: true }
    //         );
    
    //         if (response.data.success && isGoogleLogin) {
    //           navigate("/");
    //           toast.success(response.data.message);
    //         }
    //       } catch (error) {
    //         console.error("Error fetching user data:", error);
    //         if (isGoogleLogin) {
    //           toast.error(response.data.message);
    //         }
    //       }
    //     };
    
    //     if (isGoogleLogin) {
    //       fetchUser();
    //     }
    
    //     return () => clearInterval(interval); // Cleanup the interval on component unmount
    //   }, [location,navigate]);


    useEffect(() => {
      const interval = setInterval(() => {
        handleNextImage();
      }, 5000); // Change image every 5 seconds
    
      const isGoogleLogin = new URLSearchParams(location.search).get("googleLogin");
    
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9000/ekheti/v1/g-auth/login/success",
            { withCredentials: true }
          );
    
          if (response.data.success && isGoogleLogin) {
            dispatch(setAuthUser(response.data.user));
            toast.success(response.data.message);

          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          if (isGoogleLogin) {
            toast.error(error.response?.data?.message || "Failed to fetch user data");
          }
        }
      };
    
      if (isGoogleLogin) {
        fetchUser();
      }
    
      return () => clearInterval(interval); // Cleanup on component unmount
    }, [location, navigate]);
    
    

//  // Fetch user info after Google OAuth redirection
//  useEffect(() => {
    

//     fetchUser();
//   }, []);

return (
    // <>
    // <div className="div">HOME</div>
    // </>

    <>
            <div
                className={"image-container "}
                style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
            >
                {/* <button className="arrow left-arrow" onClick={handlePreviousImage} >‹</button>
                <button className="arrow right-arrow" onClick={handleNextImage}>›</button> */}
                <SlArrowLeft className="arrow left-arrow" onClick={handlePreviousImage} ></SlArrowLeft>
                <SlArrowRight className="arrow right-arrow" onClick={handleNextImage}></SlArrowRight>
                <div className="common-container">
                <div className="text-container">
                    <p className="welcome-heading">Welcome to  E-Kheti </p>
                    <p className="welcome-paragraph">Your Partner in Sustainable Farming! Explore expert tips, smart solutions, and a thriving marketplace to elevate your agricultural journey</p>
                    {/* <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Welcome to  E-Kheti ',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'We produce food for Hamsters',
        1000,
        'We produce food for Guinea Pigs',
        1000,
        'We produce food for Chinchillas',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    /> */}
                </div>
                <div className="btn-box">
                    <div className="btn-container">
                        <NavLink to="/about"><button className="btn-1">About
                        </button></NavLink>
                        <button className="btn-2" onClick={() => setOpenSelectbox(true)}>Select Crops</button>
                     {user && user.selectedCrops!=0?(<><button className="btn-3" onClick={() => navigate("/features")} >Explore Crops</button></>):(<></>)}
                            
                  
                            {/* <NavLink to="/chatbot"> <button className="btn-4">Ask Kheti AI</button></NavLink> */}
                    </div>
                    </div>
                    </div>
            </div>
            {/* {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-button" onClick={handleCloseModal}>X</button>
                        <SelectCrops onCropsSelected={updateSelectedCrops} />
                    </div>
                </div>
            )} */}

        <Service/>
        <About/>
        <Contact/>
        <SelectCrops open={openSelectbox} setOpen={setOpenSelectbox}/>


        </>
)

}