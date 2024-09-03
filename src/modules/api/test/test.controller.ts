import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TestDto } from './dto/test.dto';
import { EntityNotFoundError, TypeORMError } from 'typeorm';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: TestDto,
  })
  @Post()
  async create(@Body() createTestDto: CreateTestDto): Promise<TestDto> {
    return this.testService.create(createTestDto);
  }

  @ApiOkResponse({
    description: 'Get all records',
    type: [TestDto],
  })
  @Get()
  async findAll() {
    return this.testService.findAll();
  }

  @ApiOkResponse({
    description: 'Get record by id',
    type: TestDto,
  })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testService.findOne(id).catch((error) => {
      if (error instanceof TypeORMError) {
        if (error instanceof EntityNotFoundError) {
          throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    });
  }

  @ApiOkResponse({
    description: 'Update record by id',
    type: [TestDto],
  })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTestDto: UpdateTestDto,
  ) {
    return this.testService.update(id, updateTestDto).catch((error) => {
      if (error instanceof TypeORMError) {
        if (error instanceof EntityNotFoundError) {
          throw new HttpException('Record not found', HttpStatus.NOT_FOUND);
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    });
  }

  @ApiOkResponse({
    description: 'Delete records by id',
  })
  @ApiNotFoundResponse({ description: 'Record not found' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.testService.remove(id);
  }
}
