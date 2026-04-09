import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Estado } from './estado.entity';

@Entity()
export class Regiao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    Nome: String;

    @Column({ type: 'varchar', length: 9, nullable: true })
    cep: string | null;

    // @ManyToOne(() => Estado, (regiao) => regiao.lista)
    // regiao: Estado;
}
