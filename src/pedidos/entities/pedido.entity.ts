import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PedidoLista } from './pedido-lista.entity';

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numero: number;

    @Column()
    cliente: string;

    @OneToMany(() => PedidoLista, (lista) => lista.pedido, { cascade: true })
    lista: PedidoLista[];
}
