import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateProjectDto, adminId: number) {
    const project = await this.prismaService.project.create({
      data: {
        title: data.title,
        description: data.description,
        projectType: data.projectType,
        startDate: data.startDate,
        dueDate: data.dueDate,
        ownerId: data.ownerId,
        status: data.status,
        fee: data.fee,
        assignedPMId: adminId,
      },
    });

    return project;
  }

  async update(data: CreateProjectDto, id: number) {
    return this.prismaService.project.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        description: data.description,
        projectType: data.projectType,
        startDate: data.startDate,
        dueDate: data.dueDate,
        ownerId: data.ownerId,
        status: data.status,
        fee: data.fee,
      },
    });
  }

  async getAll(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user?.isAdmin) {
      return this.prismaService.project.findMany({
        include: {
          activities: true,
          tasks: true,
          payments: true,
          assignedPM: true,
          owner: true,
        },
      });
    } else {
      return this.prismaService.project.findMany({
        where: {
          ownerId: userId,
        },
        include: {
          activities: true,
          tasks: true,
          payments: true,
          assignedPM: true,
        },
      });
    }
  }

  async getOne(id: number) {
    return this.prismaService.project.findUnique({
      where: {
        id,
      },
      include: {
        activities: true,
        tasks: true,
        payments: true,
        assignedPM: true,
        owner: true,
      },
    });
  }

  async createTask(data: CreateTaskDto) {
    const task = await this.prismaService.projectTask.create({
      data: {
        title: data.title,
        description: data.description,
        projectId: data.projectId,
        dueDate: data.dueDate,
      },
    });
    return task;
  }

  async getTasks(projectId: number) {
    return this.prismaService.projectTask.findMany({
      where: {
        projectId,
      },
    });
  }

  async updateTask(data: CreateTaskDto, id: number) {
    const task = await this.prismaService.projectTask.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        dueDate: data.dueDate,
      },
    });

    return task;
  }
}
