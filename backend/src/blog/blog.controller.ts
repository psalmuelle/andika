import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthorizedGaurd } from 'src/auth/guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthorizedGaurd)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Req() req: any) {
    if (!req.user || !req.user['isAdmin']) {
      throw new UnauthorizedException('Only admins can create blog posts');
    }
    return this.blogService.create(createBlogDto, req.user.id);
  }

  @Get()
  findAll(@Req() req: any) {
    const isAdmin = req.user?.isAdmin;
    return this.blogService.findAll(isAdmin);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.blogService.findOne(slug);
  }

  @UseGuards(AuthorizedGaurd)
  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @Req() req: any,
  ) {
    if (!req.user || !req.user['isAdmin']) {
      throw new UnauthorizedException('Only admins can update blog posts');
    }
    return this.blogService.update(slug, updateBlogDto);
  }

  @UseGuards(AuthorizedGaurd)
  @Delete(':slug')
  async remove(@Param('slug') slug: string, @Req() req: any) {
    if (!req.user || !req.user['isAdmin']) {
      throw new UnauthorizedException('Only admins can delete blog posts');
    }
    return this.blogService.remove(slug);
  }

  @Post(':slug/like')
  async likePost(
    @Param('slug') slug: string,
    @Headers('x-forwarded-for') forwardedFor: string,
    @Headers('x-real-ip') realIp: string,
    @Req() req: any,
  ) {
    const ipAddress = forwardedFor || realIp || req.ip;
    if (!ipAddress) {
      throw new UnauthorizedException('Could not determine IP address');
    }
    return this.blogService.likePost(slug, ipAddress);
  }

  @Delete(':slug/like')
  async unlikePost(
    @Param('slug') slug: string,
    @Headers('x-forwarded-for') forwardedFor: string,
    @Headers('x-real-ip') realIp: string,
    @Req() req: any,
  ) {
    const ipAddress = forwardedFor || realIp || req.ip;
    if (!ipAddress) {
      throw new UnauthorizedException('Could not determine IP address');
    }
    return this.blogService.unlikePost(slug, ipAddress);
  }

  @Get(':slug/has-liked')
  async hasLiked(
    @Param('slug') slug: string,
    @Headers('x-forwarded-for') forwardedFor: string,
    @Headers('x-real-ip') realIp: string,
    @Req() req: any,
  ) {
    const ipAddress = forwardedFor || realIp || req.ip;
    if (!ipAddress) {
      throw new UnauthorizedException('Could not determine IP address');
    }
    return { hasLiked: await this.blogService.hasUserLiked(slug, ipAddress) };
  }
}
