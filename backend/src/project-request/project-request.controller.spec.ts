import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRequestController } from './project-request.controller';

describe('ProjectRequestController', () => {
  let controller: ProjectRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectRequestController],
    }).compile();

    controller = module.get<ProjectRequestController>(ProjectRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
