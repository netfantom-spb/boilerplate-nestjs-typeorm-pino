import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TestEntity } from './entities/test.entity';
import { Repository } from 'typeorm';
import { TestDto } from './dto/test.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly repository: Repository<TestEntity>,
  ) {}

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
    return this.repository.findOneByOrFail({ id });
  }

  async update(id: number, updateTestDto: UpdateTestDto) {
    const item = await this.findOne(id); // check if record exists
    const updatedItem = {
      ...item,
      ...updateTestDto,
    };
    return this.repository.save(updatedItem);
  }

  async remove(id: number) {
    const item = await this.findOne(id); // check if record exists
    return this.repository.delete({ id });
  }
}
