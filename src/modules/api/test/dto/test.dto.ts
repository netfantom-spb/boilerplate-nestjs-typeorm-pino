import { ApiProperty } from "@nestjs/swagger";

export class TestDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;
}
