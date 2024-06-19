import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TenantModel } from './tenant/tenant.model';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: `${process.env.DB_LOCATION}dbTenants.sql`,
      entities: [TenantModel],
      synchronize: true,
    }),
    TenantModule,
  ],
})
export class AppModule {}
