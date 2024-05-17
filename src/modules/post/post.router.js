import { Router } from "express";
import fileUpload, { fileValidation } from "../../utilities/multer.js";
import * as postController from "./post.controller.js"
import * as commentController from "./comment.controller.js"
import { auth } from "../../middleware/auth.midlleware.js";
import { asyncHandler } from "../../utilities/errorHandling.js";

const router = Router();
router.get('/', postController.getPosts)
router.post('/',auth,fileUpload(fileValidation.image).single('image'), asyncHandler(postController.createPost));
router.patch('/:id/like',auth,asyncHandler(postController.likePost))
router.patch('/:id/unLike',auth,asyncHandler(postController.unLikePost))
router.patch('/:id/comments',auth,fileUpload(fileValidation.image).single('image'),asyncHandler(commentController.createComment));
export default router;