import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data: Date;

  @Column()
  hora: string;

  @Column()
  cliente: string;

  @Column()
  servico: string;

  @Column()
  status: string;
}
