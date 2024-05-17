import { model, Schema, Types } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    like: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    unlike: [{
        type: Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },{ timestamps: true });

// Adding virtual for comments
postSchema.virtual('comments', {
    ref: 'Comment', // The model to use
    localField: '_id', // Find in `Comment` where `postId`
    foreignField: 'postId', // is equal to `_id` in `Post`
    justOne: false, // Retrieve multiple documents
});

const postModel = model('Post', postSchema);

export default postModel;