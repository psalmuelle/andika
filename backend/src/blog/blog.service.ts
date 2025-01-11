import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto, userId: number) {
    const adminProfile = await this.prisma.adminProfile.findUnique({
      where: { userId: userId },
    });

    if (!adminProfile) {
      throw new NotFoundException('Admin profile not found');
    }
    
    const slug = slugify(createBlogDto.title, { lower: true });

    return this.prisma.blogPost.create({
      data: {
        ...createBlogDto,
        slug,
        authorId: adminProfile.id,
      },
      include: {
        author: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
  }

  async findAll(includeUnpublished: boolean = false) {
    return this.prisma.blogPost.findMany({
      where: includeUnpublished ? {} : { published: true },
      include: {
        author: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return post;
  }

  async update(slug: string, updateBlogDto: UpdateBlogDto) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    const updatedSlug = updateBlogDto.title
      ? slugify(updateBlogDto.title, { lower: true })
      : slug;

    return this.prisma.blogPost.update({
      where: { slug },
      data: {
        ...updateBlogDto,
        slug: updatedSlug,
      },
      include: {
        author: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
  }

  async remove(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return this.prisma.blogPost.delete({
      where: { slug },
    });
  }

  async likePost(slug: string, ipAddress: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    // Create like entry - the unique constraint will prevent duplicate likes
    await this.prisma.blogLike.create({
      data: {
        postId: post.id,
        ipAddress,
      },
    });

    return this.findOne(slug);
  }

  async unlikePost(slug: string, ipAddress: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    await this.prisma.blogLike.deleteMany({
      where: {
        postId: post.id,
        ipAddress,
      },
    });

    return this.findOne(slug);
  }

  async hasUserLiked(slug: string, ipAddress: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    const like = await this.prisma.blogLike.findFirst({
      where: {
        postId: post.id,
        ipAddress,
      },
    });

    return !!like;
  }
}
