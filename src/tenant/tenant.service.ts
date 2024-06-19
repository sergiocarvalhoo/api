import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantModel } from './tenant.model';
import { Repository } from 'typeorm';
import { TenantSchema } from './tenant.schema';

@Injectable()
export class TenantService {
  
  constructor(
    @InjectRepository(TenantModel)
    private readonly tenantRepository: Repository<TenantModel>,
  ) {}

  // CREATE
  async create(tenant: TenantSchema): Promise<TenantModel> {
    return await this.tenantRepository.save(tenant);
  }

  // READ ALL
  async listAll(): Promise<TenantModel[]> {
    return await this.tenantRepository.find();
  }
}
