import { Injectable } from '@nestjs/common';
import { CreateTestExceptionDto } from './dto/create-test-exception.dto';
import { UpdateTestExceptionDto } from './dto/update-test-exception.dto';
import { ServerException } from '@/boilerplate/exceptions/exception';
import { TestServerException } from './exceptions/test-server-exception';

@Injectable()
export class TestExceptionsService {
  server(id: number) {
    throw new TestServerException(id);
  }
}
