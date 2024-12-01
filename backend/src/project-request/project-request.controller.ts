import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectRequestService } from './project-request.service';
import {
  CreateApiDocRequestDto,
  CreateArticleRequestDto,
  CreateEditingRequestDto,
  CreateWhitepaperRequestDto,
} from './dto/create-request.dto';
import { AuthorizedGaurd } from 'src/auth/guard';

@UseGuards(AuthorizedGaurd)
@Controller('project-request')
export class ProjectRequestController {
  constructor(private requestService: ProjectRequestService) {}

  @Post('article')
  async createArticleRequest(
    @Body() data: CreateArticleRequestDto,
    @Req() req: any,
  ) {
    try {
      const userId = req.user.id;
      return this.requestService.createArticleRequest(data, userId);
    } catch (err) {
      throw err;
    }
  }

  @Post('whitepaper')
  async createWhitepaperRequest(
    @Body() data: CreateWhitepaperRequestDto,
    @Req() req: any,
  ) {
    try {
      const userId = req.user.id;
      return this.requestService.createWhitepaperRequest(data, userId);
    } catch (err) {
      throw err;
    }
  }

  @Post('api-doc')
  async createApiDocRequest(
    @Body() data: CreateApiDocRequestDto,
    @Req() req: any,
  ) {
    try {
      const userId = req.user.id;
      return this.requestService.createApiDocRequest(data, userId);
    } catch (err) {
      throw err;
    }
  }

  @Post('editing')
  async createEditingRequest(
    @Body() data: CreateEditingRequestDto,
    @Req() req: any,
  ) {
    try {
      const userId = req.user.id;
      return this.requestService.createEditingRequest(data, userId);
    } catch (err) {
      throw err;
    }
  }

  @Get('all')
  async getAllRequests(@Req() req: any) {
    try {
      const userId = req.user.id;
      const isAdmin = req.user.isAdmin;
      return this.requestService.getAllRequests(userId, isAdmin);
    } catch (err) {
      throw err;
    }
  }
  @Put('update/:id')
  async updateRequest(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    try {
      const adminId = req.user.id;
      return this.requestService.updateRequest(id, adminId);
    } catch (err) {
      throw err;
    }
  }
}
