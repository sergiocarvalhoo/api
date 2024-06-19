import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { TenantSchema } from './tenant.schema';
import { TenantModel } from './tenant.model';

@Controller('/tenant')
@ApiTags('Tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  // CREATE
  @Post()
  public async create(@Body() body: TenantSchema): Promise<TenantModel> {
    return this.tenantService.create(body);
  }

  // READ ALL
  @Get()
  public async readAll(): Promise<TenantModel[]> {
    return this.tenantService.listAll();
  }
}
