import nodemailer from "nodemailer";

async function sendEmail(to, subject, html) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const info = await transporter.sendMail({
        from: `"Co Play brooo 👻" <${process.env.EMAIL_SENDER}>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
    });

}
export default sendEmail;