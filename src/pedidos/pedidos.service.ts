import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidoLista } from './entities/pedido-lista.entity';
import { Produto } from '../produto/entities/produto.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    @InjectRepository(PedidoLista)
    private pedidoListaRepository: Repository<PedidoLista>,
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private dataSource: DataSource,
  ) {}

  async create(data: CreatePedidoDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Criar o Pedido via Manager
      const pedido = queryRunner.manager.create(Pedido, {
        ...data, // Atalho se os nomes forem iguais
        numero: data.numero.toString(),
      });

      const pedidoSalvo = await queryRunner.manager.save(pedido);

      const itensLista: PedidoLista[] = [];

      for (const item of data.produtos) {
        // BUSCA COM LOCK: Impede que outro processo altere este produto
        // enquanto esta transação não terminar.
        const produtoAtual = await queryRunner.manager.findOne(Produto, {
          where: { codigo: item.codigo },
          lock: { mode: 'pessimistic_write' },
        });

        if (!produtoAtual) {
          throw new NotFoundException(`Produto ${item.codigo} não encontrado`);
        }

        if (produtoAtual.quantidade < item.quantidade) {
          throw new BadRequestException(`Estoque insuficiente: ${item.codigo}`);
        }

        // 2. Criar item da lista via Manager
        const novoItemLista = queryRunner.manager.create(PedidoLista, {
          pedido: pedidoSalvo,
          codigo: Number(item.codigo),
          quantidade: item.quantidade,
        });
        itensLista.push(novoItemLista);

        // 3. Atualizar estoque
        produtoAtual.quantidade -= item.quantidade;
        await queryRunner.manager.save(produtoAtual);
      }

      await queryRunner.manager.save(itensLista);
      await queryRunner.commitTransaction();

      return { ...pedidoSalvo, lista: itensLista };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err; // O NestJS tratará o BadRequest/NotFound automaticamente
    } finally {
      await queryRunner.release();
    }
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

  async remove(id: number) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: ['lista'],
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    // SoftRemove marca o deletedAt e também faz cascade para a lista se configurado
    await this.pedidoRepository.softRemove(pedido);

    return { message: `Pedido #${id} enviado para a lixeira` };
  }
}
