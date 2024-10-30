import { PartialType } from '@nestjs/swagger';
import { CreateTestExceptionDto } from './create-test-exception.dto';

export class UpdateTestExceptionDto extends PartialType(CreateTestExceptionDto) {}
