import commentModel from "../../../db/model/Comment.model.js";
import postModel from "../../../db/model/Post.model.js";
import cloudinary from "../../utilities/cloudinary.js";

export const getPosts = async (req, res, next) => {
    const posts = await postModel.find({})
        .populate([
            {
                path: 'userId',
                select: '-password'
            },
            {
                path: 'like',
                select: 'userName',
            },
            {
                path: 'unlike',
                select: 'userName',
            },
            {
                path: 'comments', // Populate the virtual field
            }
        ]);
    return res.json({ message: "all posts have been retrieved", posts: posts });
}
export const createPost = async (req, res, next) => {

    const { title, body } = req.body;
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: 'Post' })

    const post = await postModel.create({ title, body, image: { secure_url, public_id }, userId: req.user._id });
    if (!post) {
        
        return next(new Error("post not created"));
    }
    return res.status(201).json({ message: "created post successfully", post });

}
export const likePost = async (req, res, next) => {

    const userId = req.user._id;
    const { id } = req.params;

    const post = await postModel.findByIdAndUpdate(id, {
        $addToSet: { // this reject duplicate like request from the same user but If I want to accept the same user like I can use post
            like: userId
        },
        $pull: {
            unlike: userId
        }
    }, { new: true }
    )


    if (!post) {
        return next(new Error("post not found"));

    }
    return res.status(200).json({ message: "success", post });
}


/*
const post = await postModel.findOneAndUpdate({_id:id , like:{$nin:userId}}, {
        $push: { 
            like: userId
        }
    },{new:true}
    )

*/


export const unLikePost = async (req, res, next) => {

    const userId = req.user._id;
    const { id } = req.params;

    const post = await postModel.findByIdAndUpdate(id, {
        $addToSet: { // this reject duplicate like request from the same user but If I want to accept the same user like I can use post
            unlike: userId
        },
        $pull: {// if the user is already like the post the $pull command will remove it from the set of likes
            like: userId
        }
    }, { new: true }
    )


    if (!post) {
        return next(new Error("post not found"));

    }
    return res.status(200).json({ message: "success", post });
}