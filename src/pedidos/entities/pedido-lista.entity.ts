import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity()
export class PedidoLista {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: number;

    @Column()
    quantidade: number;

    @ManyToOne(() => Pedido, (pedido) => pedido.lista)
    pedido: Pedido;
}
