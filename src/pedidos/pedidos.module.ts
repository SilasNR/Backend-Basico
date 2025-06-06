import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoLista } from '../pedido-lista/entities/pedido-lista.entity';
import { PedidoListaModule } from '../pedido-lista/pedido-lista.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, PedidoLista]), // <-- Importa o repositório aqui!
    PedidoListaModule,
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule { }
