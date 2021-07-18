import { ApiProperty } from '@nestjs/swagger';
import * as constants from '../constants';

// App api response
export class ApiSuccessResponse<T> {
  @ApiProperty({ enum: [200, 202] })
  private statusCode: number;
  @ApiProperty({ enum: [constants.DEFAULT_API_SUCCESS_MESSAGE] })
  private message: string;
  @ApiProperty()
  private data: T;
  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
