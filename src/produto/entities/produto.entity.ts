import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigo: string;

  @Column({ nullable: true })
  observacao: string;

  @Column({ type: 'int', default: 0 })
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  valor?: number;

  // Medidas do Pacote Padrão
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  altura: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  largura: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  comprimento: number;

  // Cubagem unitária calculada (A * L * C)
  @Column({ type: 'decimal', precision: 10, scale: 4, default: 0 })
  cubagem: number;

  @Column({ type: 'int', default: 1 })
  pacote: number;

  @Column({ type: 'int', default: 1 })
  caixa: number;
}
