import { Module } from '@nestjs/common';
import { PedidoListaService } from './pedido-lista.service';
import { PedidoListaController } from './pedido-lista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoLista } from './entities/pedido-lista.entity'

@Module({
  imports: [
      TypeOrmModule.forFeature([PedidoLista]), // <-- Importa o repositório aqui!
    ],
  controllers: [PedidoListaController],
  providers: [PedidoListaService],
})
export class PedidoListaModule {}
