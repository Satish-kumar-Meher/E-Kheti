// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { useAuthStore } from "../store/authStore";
// import toast from "react-hot-toast";
// import axios from 'axios';
// import "../css/emailVerification.css"

// const EmailVerificationPage = () => {
// 	const [code, setCode] = useState(["", "", "", "", "", ""]);
//     const [Loading, setLoading] = useState(false);
// 	const inputRefs = useRef([]);
// 	const navigate = useNavigate();

// 	// const { error, isLoading, verifyEmail } = useAuthStore();

// 	const handleChange = (index, value) => {
// 		const newCode = [...code];

// 		// Handle pasted content
// 		if (value.length > 1) {
// 			const pastedCode = value.slice(0, 6).split("");
// 			for (let i = 0; i < 6; i++) {
// 				newCode[i] = pastedCode[i] || "";
// 			}
// 			setCode(newCode);

// 			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
// 			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
// 			inputRefs.current[focusIndex].focus();
// 		} else {
// 			newCode[index] = value;
// 			setCode(newCode);

// 			if (value && index < 5) {
// 				inputRefs.current[index + 1].focus();
// 			}
// 		}
// 	};

// 	const handleKeyDown = (index, e) => {
// 		if (e.key === "Backspace" && !code[index] && index > 0) {
// 			inputRefs.current[index - 1].focus();
// 		}
// 	};

//     const {username,email,password} = location.state || {}

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
//         if(!username || !email || !password){
//             toast.error("missing user information from body")
//             console.log("state error comes")
//             return
//         }
// 		const otp = code.join("");
// 		try {
//             setLoading(true);
//             const res = await axios.post('http://localhost:9000/ekheti/v1/user/register', {
//                 username,
//                 email,
//                 password,
//                 otp
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 navigate("/login");
//                 toast.success(res.data.message);
//                 // setInput({
//                 //     username: "",
//                 //     email: "",
//                 //     password: ""
//                 // });
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
// 	};

// 	useEffect(() => {
// 		if (code.every((digit) => digit !== "")) {
// 			handleSubmit(new Event("submit"));
// 		}
// 	}, [code]);

// 	return (
// 		<div className='email-verification-container'>
// 			<div className='email-verification-content'>
// 				<h2 className='email-verification-title'>Verify Your Email</h2>
// 				<p className='email-verification-instructions'>Enter the 6-digit code sent to your email address.</p>

// 				<form onSubmit={handleSubmit} className='email-verification-form'>
// 					<div className='input-group'>
// 						{code.map((digit, index) => (
// 							<input
// 								key={index}
// 								ref={(el) => (inputRefs.current[index] = el)}
// 								type='text'
// 								maxLength='6'
// 								value={digit}
// 								onChange={(e) => handleChange(index, e.target.value)}
// 								onKeyDown={(e) => handleKeyDown(index, e)}
// 								className='input-box-otp'
// 							/>
// 						))}
// 					</div>
// 					{/* {error && <p className='error-text'>{error}</p>} */}
// 					<button
// 						type='submit'
// 						// disabled={Loading || code.some((digit) => !digit)}
// 						className='email-verification-button'
// 					>
// 						{Loading ? "Verifying..." : "Verify Email"}
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };
// export default EmailVerificationPage;


import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
import axios from 'axios';
import "../../css/emailVerification.css"
import { toast } from "react-toastify";

const EmailVerificationPage = () => {
	const location = useLocation();
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const [Loading, setLoading] = useState(false);
	const inputRefs = useRef([]);
	const navigate = useNavigate();

	const { username, email, password } = location.state || {};

	useEffect(() => {
		console.log('Location State:', location.state);
		if (!username || !email || !password) {
			toast.error("Missing user information from body");
			navigate('/register'); // Redirect if state is not valid
		}
	}, [location.state, navigate, username, email, password]);

	const handleChange = (index, value) => {
		const newCode = [...code];
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if (!username || !email || !password) {
		// 	toast.error("Missing user information from body");
        //     console.log("state errors come")
		// 	return;
		// }
		const otp = code.join("");
		console.log("otp -",otp);
		try {
			setLoading(true);
			const res = await axios.post('http://localhost:9000/ekheti/v1/user/signin', {
				username,
				email,
				password,
				otp
			}, {
				headers: {
					'Content-Type': 'application/json'
				},
				withCredentials: true,
			});
			if (res.data.success) {
				navigate("/login");
				toast.success(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
			// handleSubmit();
		}
	}, [code]);

	return (
		<div className='email-verification-container'>
			<div className='email-verification-content'>
				<h2 className='email-verification-title'>Verify Your Email</h2>
				<p className='email-verification-instructions'>Enter the 6-digit code sent to your email address.</p>

				<form onSubmit={handleSubmit} className='email-verification-form'>
					<div className='input-group'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='1' // changed to 1 to enforce single character
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='input-box-otp'
							/>
						))}
					</div>
					<button
						type='submit'
						className='email-verification-button'
						disabled={Loading || code.some((digit) => !digit)}
					>
						{Loading ? "Verifying..." : "Verify Email"}
					</button>
				</form>
			</div>
		</div>
	);
};
export default EmailVerificationPage;
