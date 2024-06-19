import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskFilterDto } from 'src/task/task-dto';
import { TaskStatus } from 'src/task/task.enum';
import { TaskModel } from 'src/task/task.model';
import { TaskSchema } from 'src/task/task.schema';
import { TaskService } from './task.service';

@Controller('/task')
@ApiTags('Task')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiHeader({ name: 'tenant', required: true })
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // CREATE
  @Post()
  public async create(@Body() body: TaskSchema): Promise<TaskModel> {
    return await this.taskService.create(body);
  }

  // READ ONE
  @Get(':id')
  public async readOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskModel> {
    return this.taskService.listOne(id);
  }

  // READ ALL
  @Get()
  @ApiQuery({
    name: 'status',
    enum: TaskStatus,
    enumName: 'TaskStatusFilter',
    required: false,
    description: 'The status of the Task',
  })
  public async readAll(
    @Query() filterDto: TaskFilterDto,
  ): Promise<TaskModel[]> {
    return this.taskService.listAll(filterDto);
  }

  // UPDATE
  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: TaskSchema,
  ): Promise<TaskModel> {
    return this.taskService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.taskService.delete(id);
  }
}
