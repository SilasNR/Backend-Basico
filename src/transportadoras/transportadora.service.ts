import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransportadoraDto } from './dto/create-transportadora.dto';
import { UpdateTransportadoraDto } from './dto/update-transportadora.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transportadora } from './entities/transportadora.entity';
import { Repository, DataSource } from 'typeorm';
import { Estado } from './entities/estado.entity';
import { Regiao } from './entities/regiao.entity';

@Injectable()
export class TransportadoraService {
  constructor(
    @InjectRepository(Transportadora)
    private tranportadoraRepoditory: Repository<Transportadora>,
    @InjectRepository(Estado)
    private estadoRepoditory: Repository<Estado>,
    @InjectRepository(Regiao)
    private regiaoRepoditory: Repository<Regiao>,
    private dataSource: DataSource,

  ) { }


  async create(data: CreateTransportadoraDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const itensLista: Estado[] = [];

      for (const item of data.estado) {
        const produtoAtual = await queryRunner.manager.findOne(Estado, {
          where: { Nome: item.nome },
          lock: { mode: 'pessimistic_write' }, // Bloqueia o produto para evitar venda dupla
        });

        if (!produtoAtual) {
          throw new NotFoundException(`Estado ${item.nome} não encontrado`);
        }

        // Preparar item para a Lista (Relacionamento)
        const novoItemLista = queryRunner.manager.create(Estado, {
          Nome: item.nome,
          Sigla: item.sigla,
        });
        itensLista.push(novoItemLista);
      }

      const transportadora = queryRunner.manager.create(Transportadora, {
        ...data,
        nome:  String(data.nome),
        cnpj: data.cnpj ? String(data.cnpj) : null,
        endereco: data.endereco ? String(data.endereco) : null,
        lista: itensLista,
      });

      const transportadoraSalva = await queryRunner.manager.save(transportadora);

      await queryRunner.commitTransaction();
      return transportadoraSalva;
    } catch(err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }finally {
      // Libera o banco de dados
      await queryRunner.release();
    }
  }

  findAll() {
    return this.tranportadoraRepoditory.find({
      relations: ['lista'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} transportadora`;
  }

  update(id: number, updateTransportadoraDto: UpdateTransportadoraDto) {
    return `This action updates a #${id} transportadora`;
  }

  remove(id: number) {
    return `This action removes a #${id} transportadora`;
  }
}
