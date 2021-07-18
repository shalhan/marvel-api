import { ApiProperty } from "@nestjs/swagger";

export class Character {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
