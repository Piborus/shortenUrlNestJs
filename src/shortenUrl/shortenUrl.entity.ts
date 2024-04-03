import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'url' })
export class ShortenUrlEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'short_url', length: 255, unique: true, nullable: false })
  shortUrl: string;

  @Column({ name: 'long_url', length: 255, unique: true, nullable: false })
  longUrl: string;

  @Column({ name: 'access_number', nullable: false, default: 0 })
  acessNumber: number;

  @CreateDateColumn({ name: 'create_at' })
  createAt: string;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: string;

  @DeleteDateColumn({ name: 'delete_at' })
  deleteAt: string;
}
