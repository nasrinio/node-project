import jwt from 'jsonwebtoken'
import { userModel } from '../DB/models/user.model.js';

export const auth = async (req, res, next) => {
    const { token } = req.headers;
    const decode = jwt.verify(token, process.env.TOKEN_SECRET)
    if (decode) {
        const user = await userModel.findById(decode._id)
        if (user) {
            if (!user.isOnline) {
                return res.json({ message: "pleaze login first" })
            }
            if (user.isDeleted) {
                return res.json({ message: "This email is deleted please login again" })
            }

            req.user = user
            return next()
        }
        else {
            return res.json({ message: "invalid account" })
        }
    }
    return res.json({ message: "invalid token" })
}