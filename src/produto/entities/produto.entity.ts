import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  observacao: string;

  @Column()
  quantidade: number;

  @Column()
  pacote: number;

  @Column()
  caixa: number;
}
