import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Project, (project) => project.user)
  projects!: Project[];
}
