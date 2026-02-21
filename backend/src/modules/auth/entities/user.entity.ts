import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;
}
