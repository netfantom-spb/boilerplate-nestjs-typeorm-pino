import { Test, TestingModule } from '@nestjs/testing';
import { TestService } from './test.service';
import { getLoggerToken, LoggerModule, PinoLogger } from 'nestjs-pino';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from './entities/test.entity';

describe('TestService', () => {
  let service: TestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestService,
        {
          provide: getLoggerToken('TestService'),
          useValue: {
            info: jest.fn(),
            debug: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(TestEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TestService>(TestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
