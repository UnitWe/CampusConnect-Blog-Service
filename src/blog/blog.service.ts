import { Model, Types } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { Comment } from './interfaces/comment.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { getOneDto } from './dto/get-one-post.dto';
import { User } from 'src/user/interface/create-user.interface';

//Service é responsável por conter a lógica 
@Injectable()
export class BlogService {
    constructor(
        @Inject('POST_MODEL') private postModel: Model<Post>,
        @Inject('COMMENT_MODEL') private commentModel: Model<Comment>,
        @Inject('USER_MODEL') private userModel: Model<User>
    ) { }

    async post(createPostDto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();

    }

    async postComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const {user, postId} = createCommentDto
        const author = await this.userModel.findOne({name: user}).exec()
        
        if (!author) {
            return null
        }

        const createCommentModel = {
            ...createCommentDto,
            user: author._id,
        }

        const createdComment = new this.commentModel(createCommentModel)

        let post = await this.postModel.findById(postId);
        let newComments = post["comments"]
        newComments.push(createdComment._id)
        post["comments"] = newComments
        await post.save()


        return createdComment.save();
    }

    async getAllPosts(getOneDto: getOneDto) {
        const { currentPage, perPage } = getOneDto
        const skip = (currentPage - 1) * perPage;
        const posts = await this.postModel.find().skip(skip).limit(perPage).select('title content authorId').populate('authorId', 'name').exec()
        const data = {
            data: posts
        }
        return data
    }

    async getAllPostPerAuthor(authorName: String): Promise<{}> {
        const author = await this.userModel.findOne({ name: authorName }).exec();

        if (!author) {
            // Lida com o caso em que o autor não existe
            return [];
        }

        const post = await this.postModel
            .find({ authorId: author._id })
            .select('-comments -content') // não to mandando o array de comentários e o conteudo do post
            .exec();
        const data = {
            data: post
        }
        return data
    }

    async getOnePostAuthor(authorName: String, id: String): Promise<{}> {
        const author = await this.userModel.findOne({ name: authorName }).exec();

        if (!author) {
            // Lida com o caso em que o autor não existe
            return [];
        }

        const post = await this.postModel.findById(id).populate({
            path: 'comments',
            populate: {
                path: 'user',
                model: 'users',
                select: 'name', // Seleciona apenas o campo 'name' do usuário
            },
        })
        .populate('authorId', 'name')
        .exec()
        const data = {
            data: post
        }
        return data
    }

}
