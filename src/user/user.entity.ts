import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';
import { BaseEntity } from '../utils/database/base-entity';
import { MAX_LENGTH } from './constants/entity.constants';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Generated('increment')
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    type: 'varchar',
    length: MAX_LENGTH.login.max,
    unique: true,
    nullable: false,
  })
    login: string;

  @Column({
    type: 'varchar',
    length: MAX_LENGTH.password_hash.max,
    nullable: false,
  })
    password_hash: string;

  @Column({
    type: 'boolean',
    default: false,
  })
    online: boolean;
}
