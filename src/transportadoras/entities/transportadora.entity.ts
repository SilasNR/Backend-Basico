import { Entity, PrimaryGeneratedColumn,  OneToMany, Column } from 'typeorm';
import { Estado } from './estado.entity';

@Entity()
export class Transportadora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nome: string;

  @Column({ type: 'varchar', length: 18, nullable: true })
  cnpj: string | null;

  @Column({ type: 'varchar', length: 70, nullable: true})
  endereco: string | null;

  @OneToMany(() => Estado, (lista) => lista.estado, { cascade: true})
  lista: Estado[];
}
