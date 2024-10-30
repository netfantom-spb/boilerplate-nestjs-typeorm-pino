import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestDto } from './dto/test.dto';
import { plainToInstance } from 'class-transformer';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { TestEntity } from './entities/test.entity';
import { NotFoundException, ServerException } from '@/exceptions/exception';
import { ErrorCodeEnum } from '@/exceptions/error-code.enum';

@Injectable()
export class TestService implements OnModuleInit {
  private readonly logger = new Logger(TestService.name);

  constructor(
    @InjectPinoLogger(TestService.name)
    private readonly pinoLogger: PinoLogger,
    @InjectRepository(TestEntity)
    private readonly repository: Repository<TestEntity>,
  ) {}

  onModuleInit() {
    this.logger.debug('Log DEBUG from standard logger');
    this.logger.log('Log INFO from standard logger');
    this.logger.warn('Log WARN from standard logger');
    this.logger.error('Log ERROR from standard logger');
  }

  async create(createTestDto: CreateTestDto): Promise<TestDto> {
    const newItem = this.repository.create({ ...createTestDto });
    await this.repository.save(newItem);
    const dto = plainToInstance(TestDto, newItem);
    return dto;
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneByOrFail({ id })
    .catch(error => {
      this.logger.error(error);
      throw new NotFoundException(`Record with ID ${id} not found`)
    })
  }

  async update(id: number, updateTestDto: UpdateTestDto) {
    const item = await this.findOne(id); // check if record exists
    if (!item) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
    const updatedItem = {
      ...item,
      ...updateTestDto,
    };
    return this.repository.save(updatedItem).catch(error => {
      this.logger.error(error);
      throw new ServerException('Failed to update');
    })
  }

  async remove(id: number) {
    const item = await this.findOne(id); // check if record exists
    if (!item) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
    return this.repository.delete({ id }).catch(error => {
      this.logger.error(error);
      throw new ServerException('Failed to delete');
    })
  }

}
