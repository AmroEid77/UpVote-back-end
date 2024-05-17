import jwt from "jsonwebtoken";
import userModel from "../../db/model/User.model.js";

export const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization.startsWith(process.env.BERAR_TOKEN)) {
        return res.json({ error: "invalid authorization " });
    }
    const token = authorization.split(process.env.BERAR_TOKEN)[1];

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const authUser = await userModel.findById(decoded.id)

    req.user = authUser;

    next();
}