import nodemailer from "nodemailer"

export const contactmailSender = async(email, body, title) => {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, 
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_PASS, 
            }
        })
        console.log("trasporter tak thik hai");

        let info = await transporter.sendMail({
            from: `${email}`, // sender address 
            to: `${process.env.MAIL_USER}`,
            subject: `${title}`,
            html: `${body}`, 
        });
        console.log("INFO -> ", info);
        return info;
    }
    catch(error){
        console.log("Error aa gaya");
        console.error(error);
    }
}
