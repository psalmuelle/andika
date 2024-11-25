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
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorizedGaurd } from 'src/auth/guard';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('project')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private prismaService: PrismaService,
  ) {}

  @UseGuards(AuthorizedGaurd)
  @Post('create')
  async create(@Body() data: CreateProjectDto, @Req() req: any) {
    try {
      const userIsAdmin = await this.prismaService.user.findUnique({
        where: {
          id: req.user.id,
          isAdmin: true,
        },
      });
      if (!userIsAdmin) throw new UnauthorizedException();

      const project = await this.projectService.create(data, req.user.id);
      return project;
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthorizedGaurd)
  @Get('get/all')
  async getAll(@Req() req: any) {
    try {
      return this.projectService.getAll(req.user.id);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthorizedGaurd)
  @Get('get/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.projectService.getOne(id);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthorizedGaurd)
  @Put('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateProjectDto,
    @Req() req: any,
  ) {
    try {
      const userIsAdmin = await this.prismaService.user.findUnique({
        where: {
          id: req.user.id,
          isAdmin: true,
        },
      });
      if (!userIsAdmin) throw new UnauthorizedException();
      return this.projectService.update(data, id);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthorizedGaurd)
  @Post('task/create')
  async createTask(@Body() data: CreateTaskDto, @Req() req: any) {
    try {
      const userIsAdmin = await this.prismaService.user.findUnique({
        where: {
          id: req.user.id,
          isAdmin: true,
        },
      });
      if (!userIsAdmin) throw new UnauthorizedException();
      return this.projectService.createTask(data);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthorizedGaurd)
  @Get('task/get/:projectId')
  async getTasks(@Param('projectId', ParseIntPipe) projectId: number) {
    try {
      return this.projectService.getTasks(projectId);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(AuthorizedGaurd)
  @Put('task/update/:id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateTaskDto,
    @Req() req: any,
  ) {
    try {
      const userIsAdmin = await this.prismaService.user.findUnique({
        where: {
          id: req.user.id,
          isAdmin: true,
        },
      });
      if (!userIsAdmin) throw new UnauthorizedException();
      return this.projectService.updateTask(data, id);
    } catch (err) {
      throw err;
    }
  }
}
