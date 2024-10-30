import { Module } from '@nestjs/common';
import { TestExceptionsService } from './test-exceptions.service';
import { TestExceptionsController } from './test-exceptions.controller';

@Module({
  controllers: [TestExceptionsController],
  providers: [TestExceptionsService],
})
export class TestExceptionsModule {}
