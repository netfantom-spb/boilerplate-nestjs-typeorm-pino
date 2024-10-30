import { Test, TestingModule } from '@nestjs/testing';
import { TestExceptionsService } from './test-exceptions.service';

describe('TestExceptionsService', () => {
  let service: TestExceptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestExceptionsService],
    }).compile();

    service = module.get<TestExceptionsService>(TestExceptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
