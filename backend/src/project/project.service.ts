import { HttpException, Injectable, UploadedFile } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateProjectDto,
  CreateActivityDto,
  CreateTaskDto,
  CreateTimelineDto,
  UpdateProjectDto,
  UpdateTaskDto,
  UpdateTimelineDto,
} from './dto';
import { UploadService } from 'src/upload/upload.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class ProjectService {
  constructor(
    private prismaService: PrismaService,
    private uploadService: UploadService,
    private notificationService: NotificationsService,
  ) {}

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

    await this.notificationService.createNotification(
      project.ownerId,
      `A new project '${project.title}' has been created`,
    );

    return project;
  }

  async update(data: UpdateProjectDto, id: number) {
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
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          profile: true,
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
            ownerId: user?.profile?.id,
          },
          include: {
            activities: true,
            tasks: true,
            payments: true,
            assignedPM: true,
          },
        });
      }
    } catch (err) {
      throw err;
    }
  }

  async getOne(id: number, ownerId: number) {
    let project;

    const user = await this.prismaService.user.findUnique({
      where: {
        id: ownerId,
      },
    });
    if (user && user.isAdmin) {
      project = await this.prismaService.project.findUnique({
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
    } else if (user && !user?.isAdmin) {
      project = await this.prismaService.project.findUnique({
        where: {
          id,
          owner: {
            userId: ownerId,
          },
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
    if (!project) {
      throw new HttpException('Project not found', 404);
    }
    project.payments.forEach(async (payment) => {
      const invoice = await this.uploadService.getFileUrl(payment.invoiceId);
      payment.invoice = invoice.fileUrl;
    });

    return project;
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

  async updateTask(data: UpdateTaskDto, id: number) {
    //update task
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

    if (task.status == 'COMPLETED') {
      //update progress

      const allProjectTasks = await this.prismaService.projectTask.findMany({
        where: {
          projectId: task.projectId,
        },
      });

      const totalTasks = allProjectTasks.length;

      const finishedTasks = allProjectTasks.filter(
        (task) => task.status === 'COMPLETED',
      ).length;

      if (totalTasks && finishedTasks) {
        const progress = (finishedTasks / totalTasks) * 100;

        await this.prismaService.project.update({
          where: {
            id: task.projectId,
          },
          data: {
            overallProgress: progress,
          },
        });
      }
    }

    return task;
  }

  async createActivity(data: CreateActivityDto) {
    const activity = await this.prismaService.projectActivity.create({
      data: {
        activity: data.activity,
        projectId: data.projectId,
      },
    });

    const project = await this.prismaService.project.findUnique({
      where: {
        id: activity.projectId,
      },
    });

    await this.notificationService.createNotification(
      project?.ownerId as number,
      `A new activity '${activity.activity}' has been added to project '${project?.title}'`,
    );

    return activity;
  }

  async getActivities(projectId: number) {
    const activities = await this.prismaService.projectActivity.findMany({
      where: {
        projectId,
      },
    });
    return activities;
  }

  async updateActivity(activity: string, id: number) {
    const updatedActivity = await this.prismaService.projectActivity.update({
      where: {
        id: id,
      },
      data: {
        activity: activity,
      },
    });
    return updatedActivity;
  }

  async createPayment(data: CreateTimelineDto, file: Express.Multer.File) {
    try {
      if (!file) {
        throw new HttpException('Invoice is required', 400);
      }
      const uploadInvoice = await this.uploadService.upload(file);
      const payment = await this.prismaService.payment.create({
        data: {
          amount: data.amount,
          dueDate: data.dueDate,
          status: data.status,
          projectId: data.projectId,
          datePaid: data.datePaid,
          invoiceId: uploadInvoice.fileName,
          title: data.title,
        },
      });

      const project = await this.prismaService.project.findUnique({
        where: {
          id: data.projectId,
        },
      });

      await this.notificationService.createNotification(
        project?.ownerId as number,
        `A payment invoice of ${payment.amount} has been added to project '${project?.title}'`,
      );
      return payment;
    } catch (err) {
      throw err;
    }
  }

  async getPayments(projectId: number) {
    try {
      const payments = await this.prismaService.payment.findMany({
        where: {
          projectId,
        },
      });
      payments.forEach(async (payment) => {
        const invoice = await this.uploadService.getFileUrl(payment.invoiceId);
        payment.invoice = invoice.fileUrl;
      });
      return payments;
    } catch (err) {
      throw err;
    }
  }

  async updatePaymentTimeline(data: UpdateTimelineDto, id: number) {
    const updatedTimeline = await this.prismaService.payment.update({
      where: {
        id,
      },
      data: {
        status: data.status,
        datePaid: data.datePaid,
        dueDate: data.dueDate,
      },
    });
    return updatedTimeline;
  }
}
