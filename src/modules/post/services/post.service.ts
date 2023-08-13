import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { GetAllPostsQueryDto } from '../dto/get-all-posts-query.dto';
import { PrismaService } from '../../../modules/prisma/services/prisma.service';
import { Post } from '@prisma/client';
import { validObjectId } from '../../../utils/common';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async post(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = await this.prismaService.post.create({
      data: createPostDto,
    });

    return createdPost;
  }

  async updateLikes(postId: string) {
    validObjectId(postId);
    const postData = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!postData)
      throw new NotFoundException(
        'Não foi possível encontrar uma publicação com esse Id',
      );

    await this.prismaService.post.update({
      where: { id: postId },
      data: { likes: postData.likes + 1 },
    });
    return;
  }

  async getAllPosts(getOneDto: GetAllPostsQueryDto) {
    const { current, limit } = getOneDto;
    const skip = (current - 1) * limit;

    const posts = await this.prismaService.post.findMany({
      skip: skip,
      take: limit,
      where: {
        active: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            comments: {
              where: {
                active: true
              }
            },
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            profile_pic_url: true,
            email: true,
          }
        },
      },
    });

    const countPosts = await this.prismaService.post.count();

    if (!(posts.length > 0)) {
      throw new NotFoundException('Não foi possivel encontrar nenhum post');
    }

    let data = {
      totalItems: countPosts,
      totalPages: Math.ceil(countPosts / limit),
      current: current,
      limit: limit,
      data: posts,
    };

    return data;
  }

  async getAllPostPerAuthor(author_id: string) {
    const post = await this.prismaService.post.findMany({
      where: { author_id },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            comments: {
              where: {
                active: true
              }
            },
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            profile_pic_url: true,
            email: true,
          }
        },
      },
    });

    if (!(post.length > 0)) {
      throw new NotFoundException('Não foi possivel encontrar nenhum post');
    }

    const data = {
      data: post,
    };

    return data;
  }

  async getOnePost(id: string) {
    validObjectId(id);
    
    const post = await this.prismaService.post.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            comments: {
              where: {
                active: true
              }
            },
          },
        },
        comments: {
          select: {
            content: true,
            author: {
              select: {
                id: true,
                username: true,
                profile_pic_url: true,
              }
            }
          },
          where: {
            active: true
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            profile_pic_url: true,
            email: true,
          }
        },
      },
    });

    return post;
  }
}
