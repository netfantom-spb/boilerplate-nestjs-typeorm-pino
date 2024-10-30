import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TestExceptionsService } from './test-exceptions.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('test-exceptions')
@Controller('test-exceptions')
export class TestExceptionsController {
  constructor(private readonly testExceptionsService: TestExceptionsService) {}

  @Get(':id/server')
  server(@Param('id', ParseIntPipe) id: number) {
    return this.testExceptionsService.server(id);
  }
}
