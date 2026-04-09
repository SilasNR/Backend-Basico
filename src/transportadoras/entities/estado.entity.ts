import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Transportadora } from './transportadora.entity';
import { Regiao } from './regiao.entity';

@Entity()
export class Estado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true})
    Nome: String | null;

    @Column({ type: 'varchar', length: 2, nullable: true })
    Sigla: String | null;

    @ManyToOne(() => Transportadora, (estado) => estado.lista)
    estado: Transportadora;

    // @OneToMany(() => Regiao, (lista) => lista.regiao, { cascade: true, nullable: true})
    // lista: Regiao[];
}
