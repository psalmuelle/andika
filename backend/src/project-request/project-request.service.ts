import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateApiDocRequestDto,
  CreateArticleRequestDto,
  CreateEditingRequestDto,
  CreateRequestDto,
  CreateWhitepaperRequestDto,
} from './dto/create-request.dto';

@Injectable()
export class ProjectRequestService {
  constructor(private prismaService: PrismaService) {}

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

  async createEditingRequest(data: CreateEditingRequestDto, userId: number) {
    try {
      const projectReq = await this.createProjectRequest({
        userId,
        requestType: 'EDITING',
        status: 'NEW',
      });

      await this.prismaService.editingRequest.create({
        data: {
          projectRequestId: projectReq.id,
          drafts: data.drafts,
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

      return this.prismaService.projectRequest.findMany({
        include: {
          ApiDocRequest: true,
          EditingRequest: true,
          WhitepaperRequest: true,
          ArticleRequest: true,
        },
      });
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
