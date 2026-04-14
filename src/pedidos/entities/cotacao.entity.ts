
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Transportadora } from '../../transportadoras/entities/transportadora.entity';

@Entity()
export class Cotacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    transportadora: string;

    @Column()
    numero: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
        transformer: {
            to: (value: number | null) => value,
            from: (value: string | null) => (value ? parseFloat(value) : null),
        },
    })
    valor: number | null;

    @Column({ type: 'varchar', length: 255 })
    prazo: string;

    @ManyToOne(() => Pedido, (pedido) => pedido.cotacao)
    pedido: Pedido;
}
