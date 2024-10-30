import { Test, TestingModule } from '@nestjs/testing';
import { TestExceptionsController } from './test-exceptions.controller';
import { TestExceptionsService } from './test-exceptions.service';

describe('TestExceptionsController', () => {
  let controller: TestExceptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestExceptionsController],
      providers: [TestExceptionsService],
    }).compile();

    controller = module.get<TestExceptionsController>(TestExceptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
