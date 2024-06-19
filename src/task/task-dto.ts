import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/task/task.enum';

export class TaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
