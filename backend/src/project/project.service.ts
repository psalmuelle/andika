import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
import { CreateReviewDto } from './dto/create-review.dto';

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
        owner: {
          connect: {
            id: data.ownerId,
          },
        },
        status: data.status,
        fee: data.fee,
        assignedPM: {
          connect: {
            userId: adminId,
          },
        },
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
            files: true,
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
            files: true,
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
          files: true,
          feedback: true,
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
          files: true,
          feedback: true,
        },
      });
    }
    if (!project) {
      throw new HttpException('Project not found', 404);
    }

    return project;
  }

  async createTask(data: CreateTaskDto) {
    const task = await this.prismaService.projectTask.create({
      data: {
        task: data.task,
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
        task: data.task,
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
          projectId: parseInt(data.projectId),
          datePaid: data.datePaid,
          invoiceId: uploadInvoice.fileUrl,
          title: data.title,
        },
      });

      const project = await this.prismaService.project.findUnique({
        where: {
          id: parseInt(data.projectId),
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

  async addFinishedFileUrl({
    isAdmin,
    projectId,
    hostname,
    url,
  }: {
    isAdmin: boolean;
    projectId: number;
    hostname: string;
    url: string;
  }) {
    try {
      if (!isAdmin) {
        throw new UnauthorizedException();
      }
      const uploadedProject = await this.prismaService.projectFile.create({
        data: {
          projectId,
          url,
          hostname,
        },
      });

      if (!uploadedProject) {
        throw new HttpException('An error occurred while uploading file', 500);
      }
      return uploadedProject;
    } catch (err) {
      throw err;
    }
  }

  async createReview(data: CreateReviewDto) {
    try {
      const review = await this.prismaService.projectFeedback.create({
        data: {
          rating: data.rating,
          feedback: data.feedback,
          projectId: data.projectId,
        },
      });
      return review;
    } catch (err) {
      throw err;
    }
  }

  async getReviews(isAdmin: boolean) {
    try {
      if (!isAdmin) {
        throw new UnauthorizedException();
      }
      return this.prismaService.projectFeedback.findMany();
    } catch (err) {
      throw err;
    }
  }
}
