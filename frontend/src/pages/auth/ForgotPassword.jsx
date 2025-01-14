import { useState } from "react";
// import { useAuthStore } from "../store/authStore";
// import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import '../../css/forgotpassword.css'; // Import the CSS file
// import { Input } from "postcss";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [Loading, setLoading] = useState(false);
    // const { isLoading, forgotPassword } = useAuthStore();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // await forgotPassword(email);


    //     setIsSubmitted(true);
    // };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true while making the request
if(email===""){
toast.error("Enter the email")
}
        try {
            const response = await axios.post('http://localhost:9000/ekheti/v1/user/forgot-reset-password-token', {email}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.data.success) {
                // If the email was sent successfully
                setIsSubmitted(true);
                toast.success("Email sent succesfully")
                setLoading(false);
            } else {
                // Handle error (e.g. email not registered)
                setLoading(false);
                toast.error(response.data.message); // Show message
            }
        } catch (error) {
            console.error("Error sending email:", error);
            toast.error(error.message)
            setLoading(false);
        }
    };

    return (
        <div className={`forgot-password-container ${isSubmitted ? 'visible' : ''}`}>
            <div className='forgot-password-content'>
                <h2 className='forgot-password-title'>Forgot Password</h2>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <p className='forgot-password-description'>
                            Enter your email address and we will send you a link to reset your password.
                        </p>
                        <input
                            icon={Mail}
                            type='email'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='forgot-password-input'
                        />
                        <button className='forgot-password-button' type='submit'>
                            {Loading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
                        </button>
                    </form>
                ) : (
                    <div className='text-center'>
                        <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <Mail className='h-8 w-8 text-white' />
                        </div>
                        <p className='forgot-password-description'>
                            If an account exists for {email}, you will receive a password reset link shortly.
                        </p>
                    </div>
                )}
            </div>

            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <Link to={"/login"} className='link-back'>
                    <ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
