import userModel from "../../../db/model/User.model.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from "../../utilities/sendEmail.js";



export const signUp = async (req, res,next) => {

    const { userName, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
        return next(new Error(`User ${userName} already exists`));
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALTROUND));

    const newUser = await userModel.create({ userName, email, password: hashedPassword });
    if (!newUser) {
        return next(new Error(`User ${newUser} not created`));
    }
    const token = await jwt.sign({ email }, process.env.EMAIL_TOKEN, { expiresIn: 60 * 1 })

    const refreshToken = await jwt.sign({ email }, process.env.EMAIL_TOKEN, { expiresIn: 60 * 60 * 24 })

    const html = `<h1> Hello ${userName}</h1>
    <div>
    <a href=" ${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">click here to confirm</a>
    <a href=" ${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}">resend confirm email</a>
    </div>
    `

    await sendEmail(email, "confirm plzzz", html);
    return res.status(201).json({ message: "successfully created", newUser });


}


export const signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return next (new Error ("email not exist"));
    }
    
    if (!user.confirmEmail) {
        return res.status(400).json({ message: "please confirm your email" })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ message: "successfully signed in", token });

}


export const signInConfirmEmail = async (req, res) => {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.EMAIL_TOKEN);

    const user = await userModel.updateOne({ email: decoded.email }, { confirmEmail: true }); // or update one
    if (user.modifiedCount > 0) {
        return res.redirect(process.env.FEURL)
    }
    return res.json({ message: "not successfully signed in", user });

}