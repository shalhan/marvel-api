import { ApiProperty } from '@nestjs/swagger';
import * as constants from '../constants';

// App api response
export class ApiSuccessResponse<T> {
  @ApiProperty({ enum: [200, 202] })
  private status: number;
  @ApiProperty({ enum: [constants.DEFAULT_API_SUCCESS_MESSAGE] })
  private message: string;
  @ApiProperty()
  private data: T;
  constructor(status: number, message: string, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
