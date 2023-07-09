import { Connection } from 'mongoose';
import { PostSchema } from '../schemas/post.schema';
import { CommentSchema } from '../schemas/comment.schema';

export const postProviders = [
  {
    provide: 'POST_MODEL',
    useFactory: (connection: Connection) => connection.model('posts', PostSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export const commentProviders = [
  {
    provide: 'COMMENT_MODEL',
    useFactory: (connection: Connection) => connection.model('comments', CommentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];