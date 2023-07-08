import * as mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    content: String,
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'posts' }, // Referência ao ID do post
});

export { CommentSchema };