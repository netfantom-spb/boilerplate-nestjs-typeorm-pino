import { ApiProperty } from '@nestjs/swagger';

export class CreateTestDto {
  @ApiProperty({
    example: 'This is example string',
  })
  title: string;
}
