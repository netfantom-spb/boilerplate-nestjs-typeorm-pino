import { Test, TestingModule } from '@nestjs/testing';
import { MinutelyService } from './minutely.service';

describe('MinutelyService', () => {
  let service: MinutelyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinutelyService],
    }).compile();

    service = module.get<MinutelyService>(MinutelyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
