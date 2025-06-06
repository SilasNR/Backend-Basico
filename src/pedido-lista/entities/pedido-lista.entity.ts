import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity()
export class PedidoLista {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoProduto: number;

    @Column()
    quantidade: number;

    @ManyToOne(() => Pedido, (pedido) => pedido.lista)
    pedido: Pedido;
}
