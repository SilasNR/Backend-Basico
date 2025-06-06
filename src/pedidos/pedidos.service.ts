import { Injectable } from '@nestjs/common';
//import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity'
import { PedidoLista } from '../pedido-lista/entities/pedido-lista.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,

    @InjectRepository(PedidoLista)
    private pedidoListaRepository: Repository<PedidoLista>,
  ) { }

  async create(data: { numero: number; cliente: string, produtos: any[] }) {
    const pedido = this.pedidoRepository.create({
      numero: data.numero,
      cliente: data.cliente,
    });
    const pedidoSalvo = await this.pedidoRepository.save(pedido);

    const lista = data.produtos.map((produto) =>
      this.pedidoListaRepository.create({
        pedido: pedidoSalvo, // Faz o relacionamento
        codigoProduto: produto.codigo,
        quantidade: produto.quantidade,
      })
    );

    await this.pedidoListaRepository.save(lista);

    // Retorna o pedido com a lista
    return {
      ...pedidoSalvo,
      lista,
    };
  }


  findAll() {
    return this.pedidoRepository.find({
      relations: ['lista'],
    });
  }

  findOne(id: number) {
    return this.pedidoRepository.findOne({
      where: { id },
      relations: ['lista'],
    });
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
