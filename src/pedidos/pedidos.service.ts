import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity'
import { PedidoLista } from './entities/pedido-lista.entity';
import { Produto } from '../produto/entities/produto.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,

    @InjectRepository(PedidoLista)
    private pedidoListaRepository: Repository<PedidoLista>,

    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) { }

  async create(data: CreatePedidoDto) {
    const pedido = this.pedidoRepository.create({
      numero: data.numero,
      cliente: data.cliente,
    });
    console.log('Produtos recebidos no pedido:', data.produtos);

    const pedidoSalvo = await this.pedidoRepository.save(pedido);

    const lista = data.produtos.map((produto) =>
      this.pedidoListaRepository.create({
        pedido: pedidoSalvo, // Faz o relacionamento
        codigo: Number(produto.codigo),
        quantidade: produto.quantidade,
      })
    );
    console.log('Lista criada:', lista);

    await this.pedidoListaRepository.save(lista);

    ///////Altera a quantidade de pecas no produto
    for(const produto of data.produtos){
      const produtoAtual = await this.produtoRepository.findOneBy({codigo: produto.codigo});

      if(!produtoAtual){
        throw new NotFoundException(`Produto com código ${produto.codigo} não encontrado`);
      }

      if(produtoAtual.quantidade < produto.quantidade) {
        throw new BadRequestException(`Estoque induficiente para o produto ${produto.codigo}`);
      }

      produtoAtual.quantidade -= produto.quantidade;
      await this.produtoRepository.save(produtoAtual);
    }

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
