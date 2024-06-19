import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { UserModel } from 'src/user/user.model';
import { UserSchema } from './user.schema';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';

@Controller('/user')
@ApiTags('User')
@ApiHeader({ name: 'tenant', required: true })
export class UserController {
  constructor(private readonly userService: UserService) {}

  // CREATE
  @Post()
  public async create(@Body() user: UserSchema): Promise<UserModel> {
    return this.userService.create(user);
  }

  // READ ONE
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async readOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserModel> {
    return this.userService.findOne(id);
  }

  // READ ALL
  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async readAll(): Promise<UserModel[]> {
    return this.userService.findAll();
  }

  // UPDATE
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserSchema,
  ): Promise<UserModel> {
    return this.userService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.userService.delete(id);
  }
}
