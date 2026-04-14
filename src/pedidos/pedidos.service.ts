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
import { Cotacao } from './entities/cotacao.entity';

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
      let somaCubagemBruta = 0; // Acumulador da cubagem de todos os produtos
      let volumeTotalCalculado = 0; // Soma das quantidades
      const itensLista: PedidoLista[] = [];
      const cotacaoLista: Cotacao[] = [];

      // 1. Processamento dos Itens
      for (const item of data.produtos) {
        const produtoAtual = await queryRunner.manager.findOne(Produto, {
          where: { codigo: item.codigo },
          lock: { mode: 'pessimistic_write' }, // Bloqueia o produto para evitar venda dupla
        });

        if (!produtoAtual) {
          throw new NotFoundException(`Produto ${item.codigo} não encontrado`);
        }

        if (produtoAtual.quantidade < item.quantidade) {
          throw new BadRequestException(`Estoque insuficiente: ${item.codigo}`);
        }

        // CÁLCULO DA CUBAGEM DO ITEM:
        // Multiplicamos a cubagem unitária do cadastro pela quantidade pedida
        const cubagemDoItem =
          Number(produtoAtual.cubagem || 0) * item.quantidade;
        somaCubagemBruta += cubagemDoItem;

        // VOLUME:
        // Soma das quantidades (ex: 10 unidades de A + 5 unidades de B = 15 volumes)
        volumeTotalCalculado += item.quantidade;

        // Preparar item para a tabela PedidoLista (Relacionamento)
        const novoItemLista = queryRunner.manager.create(PedidoLista, {
          codigo: Number(item.codigo),
          quantidade: item.quantidade,
        });
        itensLista.push(novoItemLista);

        // Atualizar estoque
        produtoAtual.quantidade -= item.quantidade;
        await queryRunner.manager.save(produtoAtual);
      }

      for(const item of data.cotacao){
        const cotacaoAtual = await queryRunner.manager.findOne(Cotacao, {
          where: { numero: item.numero },
          lock: { mode: 'pessimistic_write' }, // Bloqueia o produto para evitar venda dupla
        });

        if (!cotacaoAtual) {
          throw new NotFoundException(`Produto ${item.numero} não encontrado`);
        }

        const novaCotacaoLista = queryRunner.manager.create(Cotacao, {
          numero: Number(item.numero),
          transportadora: item.tranportadora,
          prazo: item.prazo,
          valor: item.valor
        });
        cotacaoLista.push(novaCotacaoLista);
      }

      // 2. APLICAÇÃO DA REGRA DOS 1000:
      // A cubagem total do pedido é a soma de todos os produtos dividida por 1000
      const cubagemFinalPedido = somaCubagemBruta / 1000;

      // 3. Persistência do Pedido
      const pedido = queryRunner.manager.create(Pedido, {
        ...data, // Pega numero, cliente, cnpj, cep, valor (digitado) e peso (digitado)
        numero: data.numero.toString(),
        municipio: data.municipio+"-"+data.uf,
        valor: data.valor ? Number(data.valor) : null,
        peso: data.peso ? Number(data.peso) : null,
        cubagem: cubagemFinalPedido, // Valor calculado com a regra / 1000
        status: data.status,
        volume: volumeTotalCalculado,
        lista: itensLista, // Grava os itens automaticamente via cascade
        cotacao: cotacaoLista,
      });

      const pedidoSalvo = await queryRunner.manager.save(pedido);

      await queryRunner.commitTransaction();
      return pedidoSalvo;
    } catch (err) {
      // Se algo der errado (estoque insuficiente ou erro de DB), desfaz tudo
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // Libera o banco de dados
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
