import { Test, TestingModule } from '@nestjs/testing';
import { HelloProducerService } from './hello-producer.service';

describe('HelloProducerService', () => {
  let service: HelloProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloProducerService],
    }).compile();

    service = module.get<HelloProducerService>(HelloProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
