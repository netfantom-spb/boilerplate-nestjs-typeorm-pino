import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'test', name: 'test' })
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
