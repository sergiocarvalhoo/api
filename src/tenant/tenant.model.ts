import { Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class TenantModel {
  @PrimaryColumn()
  host: string;

  @PrimaryColumn()
  name: string;
}
