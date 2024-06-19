import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/user/user.model';
import { DataSource, Repository } from 'typeorm';
import { TenantModel } from './tenant.model';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TaskModel } from 'src/task/task.model';
export const TENANT_CONNECTION = 'TENANT_CONNECTION';
export let createdConnection;

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, TaskModel, TenantModel])],
  providers: [
    TenantService,
    {
      provide: TENANT_CONNECTION,
      scope: Scope.REQUEST,
      useFactory: async () => {
        return createdConnection;
      },
    },
  ],
  controllers: [TenantController],
  exports: [TENANT_CONNECTION],
})
export class TenantModule {
  constructor(
    @InjectRepository(TenantModel)
    @InjectRepository(UserModel)
    @InjectRepository(TaskModel)
    private readonly tenantRepository: Repository<TenantModel>,
  ) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req, res, next) => {
        const tenant: TenantModel = await this.tenantRepository.findOne({
          where: { host: req.headers.tenant },
        });

        if (!tenant) {
          throw new NotFoundException(
            'Unfortunately an error occurred.',
            'There is no Tenant with this Host name!',
          );
        }

        try {
          createdConnection(tenant.name);
          next();
        } catch {
          createdConnection = new DataSource({
            name: tenant.name,
            type: 'sqlite',
            database: `${process.env.DB_LOCATION}db${tenant.name}.sql`,
            entities: [UserModel, TaskModel],
            synchronize: true,
          });
          await createdConnection.connect();

          if (createdConnection) {
            next();
          } else {
            throw new BadRequestException(
              'Unfortunately an error occurred.',
              'A problem occurred while connecting to the database.!',
            );
          }
        }
      })
      .exclude('/tenant')
      .forRoutes('*');
  }
}
