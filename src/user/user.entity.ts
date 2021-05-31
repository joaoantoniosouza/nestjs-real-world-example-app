import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HashTool } from '@security/hash';
import { UserData } from './user.interface';

@Entity('users')
export class UserEntity implements UserData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ name: 'password_hash' })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, default: '' })
  bio: string;

  @Column({ nullable: true })
  image?: string;

  @Column({
    name: 'create_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @BeforeUpdate()
  setUpdatedDate() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await HashTool.generate(this.password);
  }

  @BeforeUpdate()
  async updatePasswordHash() {
    if (this.password) {
      this.password = await HashTool.generate(this.password);
    }
  }
}
