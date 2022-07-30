import { errMessage } from './../types/err-message.type';
import { HttpException, HttpStatus } from '@nestjs/common';
export const errException = (
  { status, error }: errMessage,
  statusCode: HttpStatus,
) => {
  return new HttpException(
    {
      status,
      error,
    },
    statusCode,
  );
};
