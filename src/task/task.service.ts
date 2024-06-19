import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { TaskModel } from './task.model';
import { TaskSchema } from './task.schema';
import { TaskFilterDto } from './task-dto';
import { TENANT_CONNECTION } from 'src/tenant/tenant.module';

@Injectable({ scope: Scope.REQUEST })
export class TaskService {
  constructor(@Inject(TENANT_CONNECTION) private connection) {}
  taskRepository = this.connection.getRepository(TaskModel);

  // CREATE
  async create(task: TaskSchema): Promise<TaskModel> {
    return await this.taskRepository.save(task);
  }

  // READ ONE
  async listOne(id: number): Promise<TaskModel> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  // READ ALL
  async listAll(filterDto: TaskFilterDto): Promise<TaskModel[]> {
    return await this.taskRepository.findBy(filterDto);
  }

  // UPDATE
  async update(id: number, task: TaskSchema): Promise<TaskModel> {
    const taskFound = await this.listOne(id);

    if (!taskFound) {
      throw new NotFoundException();
    }

    await this.taskRepository.update({ id }, task);

    return await this.listOne(id);
  }

  // DELETE
  async delete(id: number): Promise<string> {
    const taskFound = await this.listOne(id);

    if (!taskFound) {
      throw new NotFoundException();
    }

    await this.taskRepository.delete({ id });

    return 'Task deleted successfully';
  }
}
