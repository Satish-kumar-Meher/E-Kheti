import mongoose from "mongoose"
// const mailSender = require("../utils/mailSender");
// const emailTemplate = require("../mail/template/emailVerificationTemplate");
import emailTemplate from "../mail/emailVerificationTemplate.js"
import { mailSender } from "../mail/mailSender.js";
const OTPSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    otp:{
        type: String,
        trim: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 60*10,
    }
}, { timestamps: true });

//async function to send a otp via mail
async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			emailTemplate(otp),
			"Verification Email",
		);
		console.log("Full email response: ", mailResponse);
		console.log("Email sent successfully: ", mailResponse.response);
	} 
    catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});


// module.exports = mongoose.model("OTP ", OTPSchema);
export const OTP = mongoose.model("OTP",OTPSchema);