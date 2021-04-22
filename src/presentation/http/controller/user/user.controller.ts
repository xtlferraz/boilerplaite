import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CustomValidationPipe } from '../../../../pipe/custom-validation.pipe';
import { UserDto } from '../../dto/user/User.dto';
import { ICreateOperation } from 'src/aplication/operation/icreate-operation.interface';
import { IEntityController } from '../IEntityController.interface';
import { IGetAllOperation } from 'src/aplication/operation/igetAll-operation.interface';
import { IGetOperation } from 'src/aplication/operation/iget-operation.interface';
import { IDeleteOperation } from 'src/aplication/operation/idelete-operation.interface';
import { IUpdateOperation } from 'src/aplication/operation/iupdate-operation.interface';
import { User } from 'src/domain/entities/user/user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController implements IEntityController<UserDto, User> {
  constructor(
    @Inject('IGetAllOperation')
    private readonly igetAllOperation: IGetAllOperation<User>,
    @Inject('ICreateOperation')
    private readonly icreateOperation: ICreateOperation<UserDto, User>,
    @Inject('IUpdateOperation')
    private readonly iupdateOperation: IUpdateOperation<UserDto, User>,
    @Inject('IDeleteOperation')
    private readonly ideleteOperation: IDeleteOperation,
    @Inject('IGetOperation')
    private readonly igetOperation: IGetOperation<User>,
  ) {}

  @Get()
  public async getAll(): Promise<User[]> {
    return await this.igetAllOperation.getAllData();
  }

  @Get(':id')
  public getById(@Param('id') id: number): Promise<User> {
    const user = this.igetOperation.getData(id);
    return user;
  }

  @Post()
  @ApiBody({ type: UserDto })
  @UsePipes(new CustomValidationPipe())
  public create(@Body() data: UserDto): Promise<User> {
    return this.icreateOperation.createData(data);
  }

  @Patch('/:id')
  public async update(
    @Body() userDto: UserDto,
    @Param('id') id: number,
  ): Promise<User> {
    return await this.iupdateOperation.updateData(userDto, id);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: number): Promise<void> {
    return await this.ideleteOperation.delete(id);
  }
}
