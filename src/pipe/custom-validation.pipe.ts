import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (this.isEmpty(value)) {
      throw new HttpException(
        `Validation failed:No payload provided`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(
        `Validation failed:${this.formatErrors(errors)}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
  private isEmpty(value: any) {
    if (Object.keys(value).length < 1) {
      return true;
    }
    return false;
  }

  private formatErrors(errors: any[]) {
    return errors
      .map((error) => {
        for (const key in error.constraints) {
          return error.constraints[key];
        }
      })
      .join(', ');
  }
}
