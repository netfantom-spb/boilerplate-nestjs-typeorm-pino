import { Test, TestingModule } from '@nestjs/testing';
import { HelloConsumerService } from './hello-consumer.service';

describe('HelloConsumerService', () => {
  let service: HelloConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloConsumerService],
    }).compile();

    service = module.get<HelloConsumerService>(HelloConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
