import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class TenantSchema {
  @IsString()
  @MaxLength(60)
  @ApiProperty({
    example: 'Tenant Test #1',
    description: 'The title of the Task.',
    required: true,
  })
  host: string;

  @IsString()
  @MaxLength(20)
  @ApiProperty({
    example: 'Tenant name example #1',
    description: 'The name of the Tenant.',
    required: true,
  })
  name: string;
}
