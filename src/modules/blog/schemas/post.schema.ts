import * as mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: String,
    author: String, 
    content: String,
    tags: {
        type: [String], // Define o tipo como um array de strings
        required: false, // Torna o campo tags opcional
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }],
    published: Boolean
});

PostSchema.pre('save', function (next) {
    if (this.isNew) {
      this.published = true;
    }
    next();
  });
  
export { PostSchema };