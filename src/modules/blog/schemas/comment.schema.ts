import * as mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    username: String,
    content: String,
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
},{
    timestamps: true
});

export { CommentSchema };