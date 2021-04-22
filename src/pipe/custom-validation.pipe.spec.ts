import { ArgumentMetadata } from '@nestjs/common';
import { UserDto } from '../presentation/http/dto/user/User.dto';
import { CustomValidationPipe } from './custom-validation.pipe';

describe('CustomValidationPipe', () => {
  it('validate DTO', async () => {
    const target: CustomValidationPipe = new CustomValidationPipe();
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: UserDto,
      data: '',
    };
    try {
      await target.transform(<UserDto>{}, metadata);
    } catch (error) {
      expect(error.response).toEqual('Validation failed:No payload provided');
      expect(error.status).toEqual(400);
    }
  });
  it('validate DTO with firts name numeric', async () => {
    const target: CustomValidationPipe = new CustomValidationPipe();
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: UserDto,
      data: JSON.stringify({
        id: '1',
        firstName: 12,
        lastName: 'teste 2',
        password: '12345',
      }),
    };
    try {
      await target.transform(
        {
          id: '1',
          firstName: 12,
          lastName: 'teste 2',
          password: '12345',
        },
        metadata,
      );
    } catch (error) {
      expect(error.response).toEqual(
        'Validation failed:firstName is type string required',
      );
      expect(error.status).toEqual(400);
    }
  });
});
