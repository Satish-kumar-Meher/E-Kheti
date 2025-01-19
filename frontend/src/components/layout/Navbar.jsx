
import { useState, useEffect, useRef } from "react";
import { matchPath, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./navbars.css";
// import { useAuth } from "../store/auth";
import logo from "../../images/Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

// import { Toast } from "react-toastify/dist/components";

export const Navbar = () => {
    // const { isLoggedIn } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(store=>store.auth);
    
    let isLoggedIn 
    if(user){
        isLoggedIn=true;
    }

    console.log("user from nav",user)

    


    // const [isselected, setIsselected] = useState(false)
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const select =() => {

        setIsselected(true);
    }


    // const logoutHandler = async () => {
    //     try {
    //         const res = await axios.get('http://localhost:9000/auth/logout', { withCredentials: true });
    //         if (res.data.success) {
    //             // dispatch(setAuthUser(null));
    //             // dispatch(setSelectedPost(null));
    //             // dispatch(setPosts([]));
    //             // navigate("/login");
    //             toast.success(res.data.message);
    //             navigate("/login")
    //         }
    //     } catch (error) {
    //         toast.error(error.message);
    //     }
    // }

    const logoutHandler = async () => {
        try {
            console.log("Attempting to log out...");
            const res = await axios.get('http://localhost:9000/ekheti/v1/g-auth/logout', {
                withCredentials: true,
            });
            console.log("Response:", res);
    
            if (res.data.success) {
                dispatch(setAuthUser(null));
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error("Logout failed.");
            }
        } catch (error) {
            console.error("Logout Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong during logout.");
        }
    };
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname)
    }

    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <NavLink to="/">
                            <img src={logo} alt="E-Kheti" />
                        </NavLink>
                    </div>
                    <div className="hamburger" onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                    <ul ref={menuRef} className={`nav-links ${isMenuOpen ? "open" : ""}`}>
                        <li><NavLink to="/" onClick={closeMenu}>
                        
                                        HOME
        
                        </NavLink></li>
                        <li><NavLink to="/about" onClick={closeMenu}>ABOUT</NavLink></li>
                        {isLoggedIn ? (
                            <>
                               <li><NavLink  
                                to={user!==null?(`/profile/${user._id}`):"/"}
                                onClick={
                           
                                   closeMenu // Call the second function
                                 }
                                 >
                                
                                PROFILE
                        
                        </NavLink></li>
                                <li><NavLink to="/community" onClick={closeMenu}>COMMUNITY</NavLink></li>
                                <li><NavLink to="/marketing" onClick={closeMenu}>DUKAAN</NavLink></li>
                                <li><NavLink to="/" onClick={logoutHandler} >LOGOUT</NavLink></li>
                            </>
                        ) : (
                            <>
                             
                                <li><NavLink to="/register" onClick={closeMenu}>REGISTER</NavLink></li>
                                <li><NavLink to="/login" onClick={closeMenu}>LOGIN</NavLink></li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};
