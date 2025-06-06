import { Injectable } from '@nestjs/common';
// import { CreatePedidoListaDto } from './dto/create-pedido-lista.dto';
import { UpdatePedidoListaDto } from './dto/update-pedido-lista.dto';

import { PedidoLista } from './entities/pedido-lista.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
  export class PedidoListaService {
    constructor(
      @InjectRepository(PedidoLista)
      private pedidoListaRepository: Repository<PedidoLista>,
    ) { }

    async create(data: {codigoProduto : number; quantidade : number}) {
      const PedidoLista = this.pedidoListaRepository.create(data);
      return this.pedidoListaRepository.save(PedidoLista);
    }

    findAll() {
      return this.pedidoListaRepository.find();
    }

    findOne(id: number) {
      return `This action returns a #${id} pedidoLista`;
    }

    update(id: number, updatePedidoListaDto: UpdatePedidoListaDto) {
      return `This action updates a #${id} pedidoLista`;
    }

    remove(id: number) {
      return `This action removes a #${id} pedidoLista`;
    }
  }
