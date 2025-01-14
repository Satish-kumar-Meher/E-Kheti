import { useState } from "react";
import "../../css/login.css"
import {  NavLink, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "@/components/layout/PasswordStrengthMeter";
import { Loader2 } from "lucide-react";
import axios from 'axios';
import { toast } from "react-toastify";
// import toast from "react-hot-toast";


export const Register = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    });
const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }


    
    const signupHandler = async (e) => {
        e.preventDefault();
        if (!input.username || !input.email || !input.password) {
            console.log("missing fields")
            toast.error("Please fill in all fields");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:9000/ekheti/v1/user/sendotp',{ email: input.email }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            if (res.data.success) {
                
                toast.success(res.data.message);
                navigate('/verify-otp', { state: { ...input } });
                // setInput({
                //     username: "",
                //     email: "",
                //     password: ""
                // });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


   

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };



    return (
        <>
        <section className="section-login">
        <main>
                <div className="login-container">
                    <div className="login-box">
                        <h2>Create an Account</h2>
                        <form onSubmit={signupHandler}>
                        <div className="input-box">
                        <input
                              type="text"
                              name="username"
                              value={input.username}
                              onChange={handleInput}
                              placeholder="username"
                            />
                            </div>
                            <div className="input-box">
                                <input 
                                type="email" 
                                placeholder="Email" 
                                name="email"
                                value={input.email}
                                onChange={handleInput}
                                 />
                            </div>
                            {/* <div className="input-box">
                            <input
                              type="number"
                              name="phone"
                              value={user.phone}
                              placeholder="Phone"
                              onChange={handleInput}
                            />
                            </div> */}
        
                            <div className="input-box password-box">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="password"
                              value={input.password}
                              onChange={handleInput}
                                    placeholder="Password"
                                />
                                <span className="eye-icon" onClick={togglePasswordVisibility}>
                                    
                                        {passwordVisible ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="eye-slash"><rect width="256" height="256" fill="#ffff"></rect><line x1="48" x2="208" y1="40" y2="216" fill="#ffff" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><path fill="#ffff" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M154.9071 157.59781a40.00028 40.00028 0 0 1-53.8142-59.19562M73.99446 68.59357C33.22519 89.23912 16 128 16 128s32 71.99219 112 71.99219a118.0238 118.0238 0 0 0 53.99756-12.59461M208.60953 169.09937C230.41132 149.5722 240 128 240 128S208 55.99219 128 55.99219a125.31923 125.31923 0 0 0-20.68221 1.68414M135.52737 88.70779a40.02413 40.02413 0 0 1 32.29785 35.52875"></path></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" id="eye"><path fill="#ffff" stroke="#000" d="M25 39c13.036 0 23.352-12.833 23.784-13.379l.491-.621-.491-.621C48.352 23.833 38.036 11 25 11S1.648 23.833 1.216 24.379L.725 25l.491.621C1.648 26.167 11.964 39 25 39zm0-26c10.494 0 19.47 9.46 21.69 12C44.473 27.542 35.509 37 25 37 14.506 37 5.53 27.54 3.31 25 5.527 22.458 14.491 13 25 13z"></path><path fill="#ffff" stroke="#000" d="M25 34c4.963 0 9-4.038 9-9s-4.037-9-9-9-9 4.038-9 9 4.037 9 9 9zm0-16c3.859 0 7 3.14 7 7s-3.141 7-7 7-7-3.14-7-7 3.141-7 7-7z"></path></svg>}
                                        
                                </span>
                            </div>
                            {/* {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>} */}
                            <PasswordStrengthMeter password={input.password}/>
                            {
                    loading ? (
                        <button className="login-button">
                            <Loader2 className="loader flex justify-center align-middle" />
                            Please wait
                        </button>
                    ) : (
                        <button type="submit" className="login-button">Sign Up</button>
                    )
                }
                            {/* <button type="submit" className="login-button">Sign Up</button> */}
                            <div className="links">
                                <NavLink to="/login">Already have an account ? Login</NavLink>
                                
                            </div>
                            <div className="social-login">
                                <button className="google-login">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" id="google"><path fill="#00ac47" d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16"></path><path fill="#4285f4" d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16"></path><path fill="#ffba00" d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z"></path><polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"></polygon><path fill="#ea4435" d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z"></path><polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"></polygon><path fill="#4285f4" d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z"></path></svg> Continue with Google
                                </button>
                                <button className="facebook-login">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="facebook"><path fill="#1976D2" d="M14 0H2C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2z"></path><path fill="#FAFAFA" fill-rule="evenodd" d="M13.5 8H11V6c0-.552.448-.5 1-.5h1V3h-2a3 3 0 0 0-3 3v2H6v2.5h2V16h3v-5.5h1.5l1-2.5z" clip-rule="evenodd"></path></svg> Continue with Facebook
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </main>
                </section>
                </>
            );
}