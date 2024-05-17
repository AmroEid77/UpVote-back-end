import commentModel from "../../../db/model/Comment.model.js"
import cloudinary from "../../utilities/cloudinary.js"



export const createComment = async (req, res, next) => {
    const { id } = req.params
    req.body.userId = req.user._id;
    req.body.postId = id;
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `comments/${id}` })
        req.body.image = { secure_url, public_id }
    }

    const comment = await commentModel.create(req.body)
    return res.json(comment)


}