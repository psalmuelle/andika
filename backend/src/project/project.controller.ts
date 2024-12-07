import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import {
  CreateActivityDto,
  CreateProjectDto,
  CreateTaskDto,
  CreateTimelineDto,
  UpdateTaskDto,
  UpdateTimelineDto,
} from './dto';
import { AuthorizedGaurd } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthorizedGaurd)
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  async create(@Body() data: CreateProjectDto, @Req() req: any) {
    try {
      const userIsAdmin = req.user.isAdmin === true;
      if (!userIsAdmin) throw new UnauthorizedException();

      const project = await this.projectService.create(data, req.user.id);
      return project;
    } catch (err) {
      throw err;
    }
  }

  @Get('get/all')
  async getAll(@Req() req: any) {
    try {
      const userId = req.user.id;
      return this.projectService.getAll(userId);
    } catch (err) {
      throw err;
    }
  }

  @Get('get/:id')
  async getOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    try {
      const user = req.user;
      const project = await this.projectService.getOne(id, user.id);
      return project;
    } catch (err) {
      throw err;
    }
  }

  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateProjectDto,
    @Req() req: any,
  ) {
    try {
      const userIsAdmin = req.user.isAdmin === true;
      if (!userIsAdmin) throw new UnauthorizedException();
      return this.projectService.update(data, id);
    } catch (err) {
      throw err;
    }
  }

  @Post('task/create')
  async createTask(@Body() data: CreateTaskDto, @Req() req: any) {
    try {
      const userIsAdmin = req.user.isAdmin === true;
      if (!userIsAdmin) throw new UnauthorizedException();
      return this.projectService.createTask(data);
    } catch (err) {
      throw err;
    }
  }

  @Get('task/get/:projectId')
  async getTasks(@Param('projectId', ParseIntPipe) projectId: number) {
    try {
      return this.projectService.getTasks(projectId);
    } catch (err) {
      throw err;
    }
  }

  @Put('task/update/:id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateTaskDto,
    @Req() req: any,
  ) {
    try {
      const userIsAdmin = req.user.isAdmin === true;
      if (!userIsAdmin) throw new UnauthorizedException();
      return this.projectService.updateTask(data, id);
    } catch (err) {
      throw err;
    }
  }

  @Post('activity/create')
  async createActivity(@Body() createDto: CreateActivityDto, @Req() req: any) {
    try {
      const userIsAdmin = req.user.isAdmin === true;
      if (!userIsAdmin) throw new UnauthorizedException();
      return this.projectService.createActivity(createDto);
    } catch (err) {
      throw err;
    }
  }

  @Get('activity/:projectId')
  async getActivities(@Param('projectId', ParseIntPipe) projectId: number) {
    try {
      return this.projectService.getActivities(projectId);
    } catch (err) {
      throw err;
    }
  }

  @Put('activity/update/:id')
  async updateActivity(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { activity: string },
    @Req() req: any,
  ) {
    try {
      const userIsAdmin = req.user.isAdmin === true;
      if (!userIsAdmin) throw new UnauthorizedException();
      return this.projectService.updateActivity(data.activity, id);
    } catch (err) {
      throw err;
    }
  }

  @Post('payment/create')
  @UseInterceptors(FileInterceptor('invoice'))
  async createTimeline(
    @Req() req: any,
    @Body() createDto: CreateTimelineDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const userIsAdmin = req.user.isAdmin === true;
      if (!userIsAdmin) throw new UnauthorizedException();
      return this.projectService.createPayment(createDto, file);
    } catch (err) {
      throw err;
    }
  }

  @Get('payment/:projectId')
  async getPaymentTimelines(
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    try {
      return this.projectService.getPayments(projectId);
    } catch (err) {
      throw err;
    }
  }

  @Put('payment/update/:id')
  async updatePaymentTimeline(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTimelineDto,
    @Req() req: any,
  ) {
    try {
      const userIsAdmin = req.user.isAdmin === true;
      if (!userIsAdmin) throw new UnauthorizedException();
      return this.projectService.updatePaymentTimeline(updateDto, id);
    } catch (err) {
      throw err;
    }
  }
}
