import { HttpStatus } from '@nestjs/common';
export type errMessage = {
  status: HttpStatus;
  error: string;
};
