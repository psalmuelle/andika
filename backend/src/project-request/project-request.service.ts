import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateApiDocRequestDto,
  CreateArticleRequestDto,
  CreateEditingRequestDto,
  CreateRequestDto,
  CreateWhitepaperRequestDto,
} from './dto/create-request.dto';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class ProjectRequestService {
  constructor(
    private prismaService: PrismaService,
    private uploadService: UploadService,
  ) {}

  async createProjectRequest(data: CreateRequestDto) {
    try {
      const projectRequest = await this.prismaService.projectRequest.create({
        data: {
          userId: data.userId,
          requestType: data.requestType,
          status: data.status,
        },
      });
      return projectRequest;
    } catch (err) {
      throw err;
    }
  }

  async createArticleRequest(data: CreateArticleRequestDto, userId: number) {
    try {
      const projectReq = await this.createProjectRequest({
        userId,
        requestType: 'TECHNICAL_ARTICLE',
        status: 'NEW',
      });

      await this.prismaService.technicalArticleRequest.create({
        data: {
          projectRequestId: projectReq.id,
          numberOfArticles: data.numberOfArticles,
          audience: data.audience,
          primaryGoal: data.primaryGoal,
          contentStructure: data.contentStructure,
          idealLength: data.idealLength,
          usefulLinks: data.usefulLinks,
          proposedTopics: data.proposedTopics,
        },
      });

      return projectReq;
    } catch (err) {
      throw err;
    }
  }

  async createWhitepaperRequest(
    data: CreateWhitepaperRequestDto,
    userId: number,
  ) {
    try {
      const projectReq = await this.createProjectRequest({
        userId,
        requestType: 'WHITEPAPER',
        status: 'NEW',
      });

      await this.prismaService.whitepaperRequest.create({
        data: {
          projectRequestId: projectReq.id,
          productName: data.productName,
          niche: data.niche,
        },
      });

      return projectReq;
    } catch (err) {
      throw err;
    }
  }

  async createApiDocRequest(data: CreateApiDocRequestDto, userId: number) {
    try {
      const projectReq = await this.createProjectRequest({
        userId,
        requestType: 'API_DOC',
        status: 'NEW',
      });

      await this.prismaService.apiDocRequest.create({
        data: {
          projectRequestId: projectReq.id,
          startupName: data.startupName,
          industry: data.industry,
          docType: data.docType,
          usefulLinks: data.usefulLinks,
        },
      });

      return projectReq;
    } catch (err) {
      throw err;
    }
  }

  async createEditingRequest(
    data: CreateEditingRequestDto,
    userId: number,
    files: Array<Express.Multer.File>,
  ) {
    try {
      const projectReq = await this.createProjectRequest({
        userId,
        requestType: 'EDITING',
        status: 'NEW',
      });

      const fileUrls = await Promise.all(
        files.map(async (file) => {
          const { fileUrl } = await this.uploadService.upload(file);
          return fileUrl;
        }),
      );

      await this.prismaService.editingRequest.create({
        data: {
          projectRequestId: projectReq.id,
          drafts: fileUrls,
          info: data.info,
          usefulLinks: data.usefulLinks,
        },
      });

      return projectReq;
    } catch (err) {
      throw err;
    }
  }

  async getAllRequests(userId: number, userIsAdmin: boolean) {
    try {
      if (!userIsAdmin) {
        return this.prismaService.projectRequest.findMany({
          where: {
            userId,
          },
          include: {
            ApiDocRequest: true,
            EditingRequest: true,
            WhitepaperRequest: true,
            ArticleRequest: true,
          },
        });
      }

      const requests = await this.prismaService.projectRequest.findMany({
        include: {
          ApiDocRequest: true,
          EditingRequest: true,
          WhitepaperRequest: true,
          ArticleRequest: true,
          user: true,
        },
      });
      return requests;
    } catch (err) {
      throw err;
    }
  }

  async getRequestById({
    id,
    userIsAdmin,
  }: {
    id: number;
    userIsAdmin: boolean;
  }) {
    try {
      if (!userIsAdmin)
        throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);

      const res = await this.prismaService.projectRequest.findUnique({
        where: {
          id,
        },
        include: {
          ApiDocRequest: true,
          EditingRequest: true,
          WhitepaperRequest: true,
          ArticleRequest: true,
          user: true,
        },
      });
      if (res) return res;
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    } catch (err) {
      throw err;
    }
  }

  async updateRequest(id: number, userId: number) {
    try {
      const userIsAdmin = await this.prismaService.user.findUnique({
        where: {
          id: userId,
          isAdmin: true,
        },
      });
      if (!userIsAdmin) throw new UnauthorizedException();
      return this.prismaService.projectRequest.update({
        where: {
          id,
        },
        data: {
          status: 'STARTED',
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
