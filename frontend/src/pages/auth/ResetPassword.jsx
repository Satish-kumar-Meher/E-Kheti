import { useState } from "react";
// import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
// import Input from "../components/Input";
import { Lock, Eye, EyeOff } from "lucide-react";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import axios from "axios";
import "../../css/resetpassword.css";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [Loading, setLoading] = useState(false);

	// const { resetPassword, error, isLoading, message } = useAuthStore();
	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

        try {
			setLoading(true);
			// Send request to reset password
			const response = await axios.post("http://localhost:9000/ekheti/v1/user/forgot-reset-password", {
				password,
				confirmPassword,
				token, // Send token from the URL
			});

			// Handle success response
			if (response.data.success) {
				toast.success("Password reset successfully");
				navigate("/login"); // Redirect to login page
			} else {
				// toast.error(response.data.message);
                toast.error("password rset failed")
			}
		} catch (error) {
			console.error("Error resetting password:", error);
			toast.error("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
		
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<div className='reset-password-container'>
			<div className='reset-password-content'>
				<h2 className='reset-password-title'>Reset Password</h2>
				{/* {error && <p className='error-message'>{error}</p>} */}
				{/* {message && <p className='success-message'>{message}</p>} */}

				<form onSubmit={handleSubmit}>
					<div className='input-group'>
						<input
							icon={Lock}
							type={showPassword ? 'text' : 'password'}
							placeholder='New Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
                            className="reset-input"
						/>
						<div
							onClick={togglePasswordVisibility}
							className='password-toggle'
						>
							{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</div>
					</div>

					<div className='input-group'>
						<input
							icon={Lock}
							type={showConfirmPassword ? 'text' : 'password'}
							placeholder='Confirm New Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
                            className="reset-input"
						/>
						<div
							onClick={toggleConfirmPasswordVisibility}
							className='password-toggle'
						>
							{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</div>
					</div>

					<button
						className='reset-password-button'
						type='submit'
						disabled={Loading}
					>
						{Loading ? "Resetting..." : "Set New Password"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
