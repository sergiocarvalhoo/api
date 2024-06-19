import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { TaskStatus } from 'src/task/task.enum';

export class TaskSchema {
  @IsString()
  @MaxLength(20)
  @ApiProperty({
    example: 'Task Test #1',
    description: 'The title of the Task.',
    required: true,
  })
  title: string;

  @IsString()
  @MaxLength(200)
  @ApiProperty({
    example: 'Task description example #1',
    description: 'The description of the Task.',
    required: true,
  })
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  @ApiProperty({
    example: 'DONE',
    description: 'The status of the Task ("DONE" or "IN_PROGRESS".)',
    required: false,
  })
  status: TaskStatus;
}
